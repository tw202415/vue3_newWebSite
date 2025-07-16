import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';
import { sha512 } from 'js-sha512';
import CryptoJS from 'crypto-js';

const currentUser = ref<User | null>(null);
const isLoading = ref(false);

function desEncrypt(text: string, skey: string): string {
  // 產生 MD5 (hex string)
  const md5Bytes = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(skey))
  const md5Hex = md5Bytes.toString(CryptoJS.enc.Hex).toUpperCase()

  // 取前 8 個字元（注意：這是字串，不是 hex byte）
  const keyStr = md5Hex.substring(0, 8)

  // 用 ASCII（Latin1）解碼成 bytes → 與 C# Encoding.ASCII.GetBytes 相同
  const keyBytes = CryptoJS.enc.Latin1.parse(keyStr)

  // 用 DES-CBC 加密 + PKCS7 padding
  const encrypted = CryptoJS.DES.encrypt(text, keyBytes, {
    iv: keyBytes,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  // 輸出為 HEX（與 C# ToHexString 相同）
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase()
}

// 登入成功後自動跳轉到 work.elf.com.tw
function jumpToWorkElf(email: string, password: string) {
  const skey = "9B3DCD0BA36C67A9B8CA7D0D1C669D42";
  // DES 加密
  const encrypted = desEncrypt(password, skey);
  // SHA-512 加密
  const hash = CryptoJS.SHA512(CryptoJS.enc.Utf8.parse('AIR'+encrypted+'ELF'));
  const v2 = CryptoJS.enc.Base64.stringify(hash);
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://work.elf.com.tw/index.aspx';

  const inputV1 = document.createElement('input');
  inputV1.type = 'hidden';
  inputV1.name = 'v1';
  inputV1.value = email;
  form.appendChild(inputV1);

  const inputV2 = document.createElement('input');
  inputV2.type = 'hidden';
  inputV2.name = 'v2';
  inputV2.value = v2;
  form.appendChild(inputV2);

  document.body.appendChild(form);
  form.submit();
}

export function useAuth() {
  const login = async (credentials: LoginCredentials) => {
  jumpToWorkElf(credentials.username, credentials.password);
  return { success: true };
};

  const register = async (userData: any) => {
    try {
      console.log('發送註冊請求，資料：', userData);
      const skey = "9B3DCD0BA36C67A9B8CA7D0D1C669D42";
      userData.password = desEncrypt(userData.password, skey);
      // 這裡替換成實際的 API 端點
      const response = await fetch('https://new-web.elf.tw/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (data.code === '001') {
        alert('信箱已註冊過!!')
        return { success: false };
      } else if (data.code === '002') {
        alert('身分證字號或手機號碼已註冊過!!')
        return { success: false };
      } else if (data.code === '999') {
        alert('註冊失敗!!')
        return { success: false };
      }
      alert('註冊成功!!')
      return { success: true };
    } catch (error) {
      console.error('註冊錯誤:', error);
      throw error;
    }
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const initAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      currentUser.value = JSON.parse(savedUser);
    }
  };

  const upgradeToVip = async () => {
    if (currentUser.value) {
      currentUser.value.isVip = true;
      localStorage.setItem('user', JSON.stringify(currentUser.value));
    }
  };

  const getToken = () => {
    return localStorage.getItem('token') || '';
  };

  return {
    currentUser: computed(() => currentUser.value),
    isAuthenticated: computed(() => !!currentUser.value),
    isLoading: computed(() => isLoading.value),
    login,
    register,
    logout,
    initAuth,
    upgradeToVip,
    getToken
  };
}
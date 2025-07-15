import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterCredentials } from '@/types';
import { sha512 } from 'js-sha512';
import CryptoJS from 'crypto-js';

const currentUser = ref<User | null>(null);
const isLoading = ref(false);

// 與C#相同的 DES+MD5 加密函式
function md5Encrypt(txt: string, skey: string): string {
  // 1. 先用 MD5 算出 key
  const md5Key = CryptoJS.MD5(skey).toString().substring(0, 8);
  const key = CryptoJS.enc.Utf8.parse(md5Key);
  const iv = CryptoJS.enc.Utf8.parse(md5Key);

   // DES 加密
   const encrypted = CryptoJS.DES.encrypt(txt, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // 3. 轉成大寫十六進制字串
  return encrypted.ciphertext.toString(CryptoJS.enc.Hex).toUpperCase();
}


function desEncrypt(text: string, skey: string): string {
  // ➤ Step 1：產生 MD5 (hex string)，如 C#：Encoding.UTF8.GetBytes(skey)
  const md5Bytes = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(skey))
  const md5Hex = md5Bytes.toString(CryptoJS.enc.Hex).toUpperCase()

  // ➤ Step 2：取前 8 個字元（注意：這是字串，不是 hex byte）
  const keyStr = md5Hex.substring(0, 8)

  // ➤ Step 3：用 ASCII（Latin1）解碼成 bytes → 與 C# Encoding.ASCII.GetBytes 相同
  const keyBytes = CryptoJS.enc.Latin1.parse(keyStr)

  // ➤ Step 4：用 DES-CBC 加密 + PKCS7 padding
  const encrypted = CryptoJS.DES.encrypt(text, keyBytes, {
    iv: keyBytes,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  // ➤ Step 5：輸出為 HEX（與 C# ToHexString 相同）
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
  // 這裡可以加前端格式驗證（如 email/password 不為空）
  alert(credentials.username)
  alert(credentials.password)
  jumpToWorkElf(credentials.username, credentials.password);
  return { success: true };
};

  const register = async (userData: any) => {
    try {
      console.log('發送註冊請求，資料：', userData);
      // 這裡替換成實際的 API 端點
      const response = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '註冊失敗');
      }
      
      const data = await response.json();
      return { success: true, data };
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
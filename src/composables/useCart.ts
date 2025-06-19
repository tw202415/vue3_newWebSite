import { ref, computed } from 'vue';
import type { Product, CartItem } from '@/types';

const items = ref<CartItem[]>([]);

export function useCart() {
  const addItem = (product: Product) => {
    const existingItem = items.value.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({
        ...product,
        quantity: 1
      });
    }
  };

  const removeItem = (id: string) => {
    const index = items.value.findIndex(item => item.id === id);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    const item = items.value.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
    }
  };

  const clearCart = () => {
    items.value = [];
  };

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };
}
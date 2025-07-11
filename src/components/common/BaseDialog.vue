<template>
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" @click.self="close">
    <div class="bg-gray-200/90 rounded-lg shadow-lg p-6 min-w-[240px] max-w-[90vw]">
      <div class="dialog-header">
        <slot name="header">
          <h3>提示訊息</h3>
        </slot>
      </div>
      <div class="dialog-body">
        <slot>
          {{ message }}
        </slot>
      </div>
      <div class="dialog-footer">
        <button class="btn-close" @click="close">確定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: '發生錯誤，請稍後再試'
  }
})

const emit = defineEmits(['close'])
const close = () => emit('close')
</script>

<style scoped>
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.dialog-box {
  background: var(--color-white);
  border-radius: 8px;
  width: 300px;
  max-width: 90vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.dialog-header {
  background: var(--color-bg-light);
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
  font-weight: bold;
  text-align: center;
}

.dialog-body {
  padding: 20px;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
}

.dialog-footer {
  padding: 16px;
  text-align: center;
  border-top: 1px solid var(--color-border-light);
}

.btn-close {
  padding: 6px 20px;
  background: var(--color-orange);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}

.btn-close:hover {
  background: var(--color-orange);
}
</style>

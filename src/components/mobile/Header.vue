<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200" >
    <div class="px-4 sm:px-6" >
      <div class="flex items-center justify-between h-14" >
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2" >
          <img src="https://work.elf.com.tw/images/logo.png" alt="Logo" class="align-middle object-contain" style="width:30%;height:auto;" />
        </router-link>

        <!-- Right Actions -->
        <div class="flex items-center space-x-2" >
          
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Truck, Search, Bell } from 'lucide-vue-next'
</script>
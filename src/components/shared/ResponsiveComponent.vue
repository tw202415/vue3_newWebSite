<template>
  <component :is="currentComponent" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDevice } from '@/composables/useDevice';

interface Props {
  desktopComponent: any;
  mobileComponent: any;
}

const props = defineProps<Props>();
const { device } = useDevice();

const currentComponent = computed(() => {
  return device.isDesktop ? props.desktopComponent : props.mobileComponent;
});
</script>
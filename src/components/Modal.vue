<template>
  <div>
    <Dialog :open="open">
      <DialogPanel>
        <slot> </slot>
      </DialogPanel>
    </Dialog>
  </div>
</template>

<script setup>
import { Dialog, DialogPanel } from '@headlessui/vue'
const props = defineProps(['open'])
</script>

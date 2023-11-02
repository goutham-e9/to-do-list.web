<template>
  <div
    class="flex h-12 bg-[rgb(201,87,76)] py-4 space-x-2 items-center justify-between px-2 md:px-6"
  >
    <div class="flex items-center space-x-4 md:space-x-6">
      <img
        :src="Menu"
        class="w-4 h-4 hidden md:block"
        @click="toggleSideBarValue('toggleSidebar')"
      />
      <img
        :src="Menu"
        class="w-4 h-4 md:hidden"
        @click="toggleSideBarValue('toggleSmallSidebar')"
      />
      <Search @addTask="changeDialogVisibility(true)" />
    </div>
    <div class="flex items-center space-x-3 md:space-x-6">
      <AddIcon fillColor="#FFFFFF" class="w-5 h-5" @click="changeDialogVisibility(true)" />
      <p
        class="flex w-8 h-8 text-sm font-semibold rounded-full bg-indigo-500 text-white text-center items-center justify-center"
      >
        GS
      </p>
    </div>
  </div>
  <AddTaskModal v-if="dialogVisibility" @dialogClosed="changeDialogVisibility(false)" />
</template>
<script setup>
import Menu from '@/assets/svgs/Menu.svg'
import Search from './Search.vue'
import AddTaskModal from '../../Tasks/components/AddTaskModal.vue'
import AddIcon from '../../../components/icons/AddIcon.vue'
import { ref } from 'vue'
const emits = defineEmits(['toggleSidebar', 'toggleSmallSidebar'])
const dialogVisibility = ref(false)
const changeDialogVisibility = (value) => {
  dialogVisibility.value = value
}
const toggleSideBarValue = (value) => {
  console.log('toggle')
  emits(value)
}
</script>

<template>
  <Modal :open="dialogOpened">
    <div class="flex justify-center absolute top-32 w-full">
      <CreateTask
        class="w-[300px] md:w-[540px]"
        @onCancelClicked="updateDialogVisibility"
        @onTaskCreated="updateDialogVisibility"
        @onTaskUpdated="updateDialogVisibility"
        :editTaskDetails="task"
        v-on-click-outside="updateDialogVisibility"
        :edit="edit"
        :isDialog="true"
        :date="task.date"
      />
    </div>
  </Modal>
</template>
<script setup>
import CreateTask from './CreateTask.vue'
import Modal from '../../../components/Modal.vue'
import { ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
const props = defineProps({
  edit: {
    default: false
  },
  task: {
    default: {}
  }
})
const emits = defineEmits(['dialogClosed'])
const dialogOpened = ref(true)
const updateDialogVisibility = () => {
  dialogOpened.value = false
  emits('dialogClosed')
}
</script>

<template>
  <div v-if="editState">
    <CreateTask
      :editTaskDetails="task"
      :edit="true"
      :formattedDate="formattedDate"
      :actualDate="date"
      @onCancelClicked="updateEditState(false)"
    ></CreateTask>
  </div>
  <div v-else class="flex w-full space-x-2 relative group p-2">
    <div class="w-5 h-5 rounded-full border-2 mx-2 mb-2 mt-1">
      <img
        :src="TickIcon"
        class="w-full h-full opacity-0 hover:opacity-100"
        @click="onTaskCompleted(task.id)"
      />
    </div>
    <img
      :src="Edit"
      class="w-6 h-6 absolute invisible right-0 group-hover:visible top-1 p-1"
      @click="updateEditState(true)"
    />
    <div class="flex flex-col gap-1.5 pb-2">
      <p class="text-lg text-[#383838]">{{ name }}</p>
      <p v-if="isDialog && !description">
        <p></p>
      </p>
      <p v-if="description" class="text-sm text-[#717171]">{{ description }}</p>
      <p v-if="formattedDate" class="text-sm" :class="styleClass">{{ formattedDate }}</p>
    </div>
  </div>  
  <hr />
</template>
<script setup>
import Edit from '@/assets/svgs/Edit.svg'
import TickIcon from '@/assets/svgs/TickIcon.svg'
import { useTasksStore } from '@/stores/tasksStore'
import { ref } from 'vue'
import CreateTask from './CreateTask.vue'
const { removeTask, getFormattedDate } = useTasksStore()
const props = defineProps(['task', 'isDialog'])
const emits = defineEmits(['taskCompleted'])
const { name, description, date } = props.task
const { formattedDate, styleClass } = getFormattedDate(date)
const onTaskCompleted = (id) => {
  removeTask(id)
}
const editState = ref(false)
const updateEditState = (value) => {
  editState.value = value
}
</script>

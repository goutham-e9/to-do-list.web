<template>
  <div class="h-full mt-10 w-full md:w-1/2 mx-auto px-6">
    <div class="flex flex-col w-full">
      <div class="flex w-full justify-center px-2 py-2 pb-4">
        <h1 class="font-semibold text-2xl">Today</h1>
      </div>
      <div v-if="todayTaskList.length > 0">
        <TaskList :date="currentDate" :taskList="todayTaskList" />
      </div>
      <div v-else>
        <EmptyState :date="currentDate" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useTasksStore } from '../../../stores/tasksStore'
import { storeToRefs } from 'pinia'
import TaskList from '../../Tasks/components/TaskList.vue'
import dayjs from 'dayjs'
import EmptyState from './EmptyState.vue'
const currentDate = dayjs().format('MM-DD-YYYY')
const taskStore = useTasksStore()
const { todayTaskList } = storeToRefs(taskStore)
const addTaskClicked = ref(false)
const onAddTaskClicked = (value) => {
  addTaskClicked.value = value
}
</script>

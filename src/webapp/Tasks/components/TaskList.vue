<template>
  <div class="w-full">
    <div v-if="taskList" v-for="task in taskList" :key="task.id">
      <Task v-if="!task.completed" :task="task"></Task>
    </div>
    <div v-if="addTaskClicked">
      <CreateTask
        @onCancelClicked="onAddTaskClicked(false)"
        @onTaskCreated="onAddTaskClicked(false)"
        :actualDate="dayjs(date)"
      />
    </div>
    <AddTask @addTask="onAddTaskClicked(true)" />
  </div>
</template>
<script setup>
import Task from '../../Tasks/components/Task.vue'
import AddIcon from '../../../components/icons/AddIcon.vue'
import { useTasksStore } from '../../../stores/tasksStore'
import { ref } from 'vue'
import CreateTask from './CreateTask.vue'
import dayjs from 'dayjs'
import AddTask from './AddTask.vue'
const props = defineProps(['date', 'taskList'])
const addTaskClicked = ref(false)
const onAddTaskClicked = (value) => {
  addTaskClicked.value = value
}
</script>

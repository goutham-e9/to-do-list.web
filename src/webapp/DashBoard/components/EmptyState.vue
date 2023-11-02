<template>
  <div class="flex flex-col items-center group space-x-3 hover:cursor-pointer pt-2">
    <img
      class="w-[400px] h-[400px]"
      src="https://static.vecteezy.com/system/resources/previews/005/073/059/original/empty-box-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-vector.jpg"
    />

    <p class="text-base font-medium">No Tasks For Today</p>
    <p class="text-base text-zinc-400 mb-4 text-center px-4">
      Uh oh looks like you have no tasks added for today. To add a new task click on 'Add Task'.
    </p>
  </div>
  <div class="flex items-center gap-2 w-full justify-center group" @click="updateAddTaskValue">
    <div class="flex items-center w-7 h-7 rounded-full bg-white">
      <svg
        class="svg"
        width="20px"
        height="20px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        fill="#333333"
      >
        <path d="M14 7v1H8v6H7V8H1V7h6V1h1v6h6z" />
      </svg>
    </div>
    <p class="text-[#333333] group-hover:text-[#C9574C]">Add Task</p>
  </div>
  <AddTaskModal v-if="addTaskClicked" @dialogClosed="updateAddTaskValue(false)" />
</template>

<script setup>
import { ref } from 'vue'
import AddTaskModal from '../../Tasks/components/AddTaskModal.vue'
import dayjs from 'dayjs'
const addTaskClicked = ref(false)
const updateAddTaskValue = (value) => {
  addTaskClicked.value = value
}
</script>

<template>
  <div class="flex items-center gap-2 w-full group" @click="onAddTaskClicked">
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
</template>
<script setup>
const emits = defineEmits(['addTask'])
const onAddTaskClicked = () => {
  emits('addTask')
}
</script>

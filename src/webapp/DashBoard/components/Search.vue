<template>
  <div
    class="flex rounded-md bg-white w-[220px] md:w-[500px] p-1 justify-between items-center m-2 space-x-2 relative"
    v-on-click-outside="onClickAway"
  >
    <div class="flex items-center w-full space-x-2">
      <img :src="SearchIcon" class="w-5 h-5" @click="changeFocus(true)" />
      <input
        type="text"
        placeholder="Search"
        class="w-full outline-none"
        v-model="searchText"
        @click="onSearchFocusChange(true)"
      />
    </div>
    <img :src="Close" class="w-4 h-4" @click="searchText = ''" />
    <div
      v-if="searchActive"
      class="absolute bg-white w-full -left-2 top-[36px] rounded-md shadow-md border-zinc-200 flex flex-col border-[1px] z-10"
    >
      <div v-if="searchState.filteredTasks.length > 0" class="flex flex-col py-3 gap-2">
        <p class="text-base font-medium text-gray-800 px-4 flex items-center justify-between">
          Tasks
          <span class="ml-auto text-sm text-zinc-500">{{ searchState.filteredTasks.length }}</span>
        </p>
        <div v-for="task in searchState.filteredTasks">
          <div
            class="flex flex-row px-6 py-2 space-x-2 hover:bg-[#EEEEEE] group"
            @click="onTasksClicked(task)"
          >
            <p class="rounded-full p-2 border-[1px] w-1 h-1 mt-1 group-hover:border-black"></p>
            <div class="flex flex-col justify-start">
              <p class="text-[#1b1b1b] font-medium text-sm">{{ task.name }}</p>
              <p class="text-gray-500 text-sm mt-0.5">{{ task.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="searchState.addTask"
        class="flex flex-col space-2 gap-2 py-2"
        @click="onAddTaskClicked"
      >
        <hr />
        <p class="text-base font-medium text-gray-800 px-4">Create Tasks</p>
        <div class="flex items-center space-x-2 hover:cursor-pointer hover:bg-[#EEEEEE] py-1 px-6">
          <img :src="Add" class="w-4 h-4" />
          <p class="text-gray-500">Add Task</p>
          <hr />
        </div>
      </div>
      <div
        v-if="searchState.noResults"
        class="w-full h-[200px] flex flex-col items-center justify-center"
      >
        <h1>No Results Found!</h1>
        <p class="text-center p-3">Please try a different search query</p>
      </div>
    </div>
  </div>
  <AddTaskModal v-if="taskDetails.visibility" :task="taskDetails.task" :edit="true" />
</template>
<script setup>
import SearchIcon from '@/assets/svgs/SearchIcon.svg'
import Close from '@/assets/svgs/Close.svg'
import Info from '@/assets/svgs/Info.svg'
import Add from '@/assets/svgs/Add.svg'
import { useTasksStore } from '../../../stores/tasksStore'
import { ref, watch } from 'vue'
import AddTaskModal from '../../Tasks/components/AddTaskModal.vue'
import { vOnClickOutside } from '@vueuse/components'

const emits = defineEmits(['addTask'])
const searchText = ref('')
const searchActive = ref(false)
const taskDetails = ref({
  visibility: false,
  task: {}
})
const searchState = ref({
  recentSearches: [],
  recentSearchesVisibility: true,
  filteredTasks: [],
  addTask: true,
  tabs: false,
  noResults: false
})
const taskStore = useTasksStore()
const { tasks } = taskStore

watch(searchText, (searchValue) => {
  searchState.value.filteredTasks = tasks.filter(
    (task) =>
      searchValue &&
      ((task.name && task.name.includes(searchValue)) ||
        (task.description && task.description.includes(searchValue)))
  )
  searchState.value.addTask = 'add task'.includes(searchValue) ? true : false
  searchState.value.recentSearchesVisibility = searchValue.length == 0 ? true : false
  searchState.value.noResults =
    searchState.value.filteredTasks.length == 0 &&
    !searchState.value.addTask &&
    !searchState.value.recentSearchesVisibility
})
const onSearchFocusChange = () => {
  searchActive.value = true
}
const onClickAway = (event) => {
  resetState()
}

const onAddTaskClicked = () => {
  searchActive.value = false
  resetState()
  emits('addTask')
}
const onTasksClicked = (task) => {
  taskDetails.value.task = task
  updateTaskDetails(true)
  searchActive.value = false
  resetState()
}

const updateTaskDetails = (value) => {
  taskDetails.value.visibility = value
}
const resetState = () => {
  searchActive.value = false
  searchText.value = ''
  searchState.value.filteredTasks = []
  searchState.value.addTask = true
  searchState.value.noResults = false
  searchState.value.recentSearchesVisibility = false
}
</script>

<style scss scoped>
.cclass {
  @apply flex items-center;
}
</style>

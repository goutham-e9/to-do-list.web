<script setup>
import { BaseTransitionPropsValidators, onMounted, ref, watch, watchEffect } from 'vue'
import { useTasksStore } from '../../../stores/tasksStore'
import { storeToRefs } from 'pinia'
import Pagination from './Pagination.vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import EmptyState from './EmptyState.vue'
import TaskList from '../../Tasks/components/TaskList.vue'

const props = defineProps(['page'])
const pageRef = ref(props.page)
const route = useRoute()
const router = useRouter()
const taskStore = useTasksStore()
const { updatePage } = taskStore
updatePage(pageRef.value)

const { tasksDetails } = storeToRefs(taskStore)
const addTaskClicked = ref(false)
const onAddTaskClicked = (value) => {
  addTaskClicked.value = value
}

watch(
  () => props.page,
  (newPage, oldPage) => {
    updatePage(newPage)
  }
)

const onPageChanged = (selectedPage) => {
  router.push({ name: 'inbox', query: { page: selectedPage }, replace: true })
}
</script>
<template>
  <div class="h-full mt-10 w-full md:w-1/2 mx-auto relative m-4 px-6">
    <div class="flex flex-col w-full">
      <div class="flex w-full justify-center px-2 py-2 pb-4">
        <h1 class="font-semibold text-2xl">Inbox</h1>
      </div>
      <div v-if="tasksDetails.tasks.length">
        <TaskList :task-list="tasksDetails.tasks"></TaskList>
      </div>
      <div v-if="tasksDetails.tasks.length == 0 && !addTaskClicked">
        <EmptyState />
      </div>
      <Pagination
        :totalPages="tasksDetails.totalPages"
        :currentPage="props.page"
        @pageSelected="onPageChanged"
        :key="tasksDetails.totalPages"
      />
    </div>
  </div>
</template>

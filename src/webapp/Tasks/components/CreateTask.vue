<template>
  <div>
    <form
      @submit.prevent="onSubmitValues"
      class="w-full p-4 bg-white space-y-2 border border-zinc-200 rounded-md flex flex-col mt-4"
    >
      <input
        type="text"
        placeholder="Task Name"
        class="outline-none text-lg placeholder:text-[rgb(153,153,153)]"
        v-model="task.name"
      />
      <textarea
        type="text"
        placeholder="Description"
        class="outline-none text-sm text-[#333333] resize-none"
        v-model="task.description"
        rows="3"
      >
      </textarea>
      <div class="pt-1 w-fit relative">
        <div
          class="flex rounded-md border border-zinc-200 space-x-2 px-3 py-2 items-center hover:bg-[#f9f9f9]"
        >
          <div @click="onUpdateSelectDate(true)">
            <p v-if="dueDate && dueDate.formattedName" class="text-green-600">
              {{ dueDate.formattedName }}
            </p>
            <p v-else-if="dueDate && dueDate.date" class="text-green-600">
              {{ getFormmatedDate(dueDate.date) }}
            </p>
            <div v-else class="flex items-center space-x-2 p-[2px]">
              <img :src="DueDate" class="w-4 h-4" />
              <p class="text-[#1b1b1b] text-sm">Due Date</p>
            </div>
          </div>
          <img
            v-if="dueDate && (dueDate.date || dueDate.formattedName)"
            :src="Close"
            class="w-3 h-3"
            @click="updateDate({})"
          />
        </div>
        <DatePicker
          v-if="selectDate"
          @updateSelectedDate="updateDate"
          @dismissDateSelecter="onUpdateSelectDate(false)"
        ></DatePicker>
      </div>
      <hr />
      <div class="flex w-full justify-end space-x-2">
        <button
          class="p-2 h-9 text-sm flex items-center justify-center rounded-md text-bg-[#444444] border border-[#eee] bg-[#F5F5F5] hover:bg-[#E5E5E5]"
          @click="emitValues('onCancelClicked')"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="p-2 flex items-center justify-center rounded-md h-9 text-white"
          :class="{
            'bg-[#E2A8A0]': isSubmitDisabled,
            'bg-[#CC5646] hover:bg-[#B54335]': !isSubmitDisabled
          }"
          :disabled="isSubmitDisabled"
        >
          <p v-if="edit" class="text-sm">Save Task</p>
          <p v-else class="text-sm">Add Task</p>
        </button>
      </div>
    </form>
    <div
      v-if="showSnackBar"
      class="flex bg-black space-x-2 p-2 w-auto absolute items-center rounded-md bottom-4 left-4 align-bottom py-3"
    >
      <p class="text-white text-sm">Task was created</p>
      <RouterLink :to="{ name: 'inbox' }" class="text-[#C9574C]">Open</RouterLink>
      <img :src="Info" class="w-4 h-4" />
    </div>
  </div>
</template>
<script setup>
import Close from '@/assets/svgs/Close.svg'
import DueDate from '@/assets/svgs/DueDate.svg'
import { useTasksStore } from '@/stores/tasksStore'
import { computed, ref, watch } from 'vue'
import Info from '@/assets/svgs/Info.svg'
import { RouterLink } from 'vue-router'
import DatePicker from './DatePicker.vue'
import { storeToRefs } from 'pinia'
const { tasks } = storeToRefs(useTasksStore())
const emits = defineEmits(['onCancelClicked', 'onTaskCreated', 'onTaskUpdated'])
const props = defineProps({
  editTaskDetails: {
    default: null
  },
  edit: {
    default: false
  },
  formattedDate: {
    default: ''
  },
  actualDate: {
    default: ''
  }
})

const initialValue = {
  id: (tasks.value.length + 1).toString(),
  name: '',
  description: '',
  date: '',
  completed: false
}
const initialState = props.editTaskDetails ? props.editTaskDetails : initialValue
const task = ref(initialState)
const dueDate = ref(
  props.edit || props.actualDate
    ? { formattedName: props.formattedDate, date: props.actualDate }
    : {}
)

const selectDate = ref(false)
const showSnackBar = ref(false)
const { addTask, editTask } = useTasksStore()
const isSubmitDisabled = ref(props.edit ? false : true)
watch(task.value, (taskValues) => {
  isSubmitDisabled.value = taskValues.name ? false : true
})

const onSubmitValues = () => {
  if (props.edit) {
    task.value.id = parseInt(tasks.value[tasks.value.length - 1].id) + 1
    task.value.date = dueDate.value.date ? dueDate.value.date.format('MM-DD-YYYY') : ''
    editTask(task.value)
    emitValues('onTaskUpdated')
  } else {
    if (dueDate.value.date) {
      task.value.date = dueDate.value.date.format('MM-DD-YYYY')
    }
    const taskAdded = addTask(task.value)
    if (taskAdded) {
      showSnackBar.value = true
      emitValues('onTaskCreated')
      resetSnackBarValue()
    }
  }
}

const resetSnackBarValue = () => {
  setTimeout(() => {
    showSnackBar.value = false
  }, 3000)
}

const updateDate = (selectedDate) => {
  dueDate.value = selectedDate
  selectDate.value = false
}

const getFormmatedDate = (date) => {
  return date.format('DD MMM')
}

const onUpdateSelectDate = (value) => {
  selectDate.value = !selectDate.value
}

const emitValues = (name, data) => {
  emits(name, data)
}
</script>

<script setup>
import VueDatePicker from '@vuepic/vue-datepicker'
import ArrowDown from '@/assets/svgs/ArrowDown.svg'
import GreaterThanIcon from '@/assets/svgs/GreaterThanIcon.svg'
import LessIcon from '@/assets/svgs/LessIcon.svg'
import dayjs from 'dayjs'
import { ref } from 'vue'
import TaskList from '../../Tasks/components/TaskList.vue'
import { useTasksStore } from '../../../stores/tasksStore'

const props = defineProps(['date'])
const taskStore = useTasksStore()
const { tasksList } = taskStore

const currentDate = dayjs()
const currentDay = currentDate.day()
const startOfWeek = currentDate.startOf('week')
const weeksList = Array.from({ length: 365 }, (_, index) => {
  const dayValue = startOfWeek.add(index + 1, 'day')
  const day = {
    formattedDay: dayValue.format('ddd'),
    date: dayValue.date(),
    day: dayValue.format('dddd'),
    month: dayValue.format('MMM'),
    formattedDate: dayValue.format('MM-DD-YYYY'),
    actualDate: dayValue,
    isBeforeCurrentDay: dayValue.isBefore(currentDate, 'day')
  }
  return day
})
const selectedWeek = ref(weeksList.slice(0, 7))
</script>
<template>
  <div class="flex flex-col w-full md:w-1/2 mx-auto mt-4 px-6 py-3">
    <p class="pb-2 w-full flex justify-center">Upcoming</p>
    <div class="overflow-auto">
      <div v-for="dateValue in weeksList" class="flex flex-col space-y-2">
        <div v-if="!dateValue.isBeforeCurrentDay" class="pb-8">
          <p class="text-[#808080]">
            {{ dateValue.date }} {{ dateValue.month }} {{ dateValue.day }}
          </p>
          <hr />
          <TaskList
            :date="dateValue.formattedDate"
            :task-list="tasksList(dateValue.formattedDate)"
          ></TaskList>
        </div>
      </div>
    </div>
  </div>
</template>

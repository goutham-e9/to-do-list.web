<script setup>
import moment from 'moment'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'
import dayjs from 'dayjs'
const emits = defineEmits(['updateSelectedDate', 'dismissDateSelecter'])
const date = dayjs()
const day = date.day()
const tomorrow = dayjs().add(1, 'day')
const weekend = dayjs().add(7 - day, 'day')
const nextweek = dayjs().add(1, 'week')
const selectedDate = ref('')
const dateOptions = {
  Today: {
    value: date,
    formattedValue: date.format('ddd'),
    renderText: 'Today'
  },
  Tomorrow: {
    value: tomorrow,
    formattedValue: tomorrow.format('ddd'),
    renderText: 'Tomorrow'
  },
  'This Weekend': {
    value: weekend,
    formattedValue: weekend.format('ddd'),
    renderText: weekend.format('dddd')
  },
  'Next Week': {
    value: nextweek,
    formattedValue: nextweek.format('ddd DD MMM'),
    renderText: nextweek.format('dddd')
  }
}
const dateClicked = (selected) => {
  emitSelectedDate('', dayjs(selected))
}

const emitSelectedDate = (name, value) => {
  emits('updateSelectedDate', { formattedName: name, date: value })
}
</script>

<template>
  <div
    class="w-[280px] rounded-md flex flex-col border border-zinc-200 py-2 absolute left-[8%] md:max-2xl:[left-103%] -top-[40px] bg-white z-100"
  >
    <div
      v-for="(date, name) in dateOptions"
      class="flex justify-between px-2 py-1 hover:bg-[#F3F3F3]"
      @click="emitSelectedDate(date.renderText, date.value)"
    >
      <p class="text-[#383838]">{{ name }}</p>
      <p class="text-[#717171]">{{ date.formattedValue }}</p>
    </div>
    <hr />
    <div>
      <VueDatePicker
        :enable-time-picker="false"
        :inline="true"
        :auto-apply="true"
        calendar-cell-class-name="dp-custom-cell"
        calendar-class-name="dp-custom-calendar"
        menu-class-name="dp-custom-menu"
        class="justify-center"
        v-model="selectedDate"
        @date-update="dateClicked"
      ></VueDatePicker>
    </div>
  </div>
</template>

<style lang="scss">
.dp-custom-cell {
  border-radius: 50%;
  background-color: red --var(--dp-primary-color);
}
.dp-custom-menu {
  border: 0px;
}
</style>

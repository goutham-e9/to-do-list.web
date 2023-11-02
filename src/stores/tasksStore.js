import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import dayjs from 'dayjs'

const TOTAL_TASK_PER_PAGE = 4

export const useTasksStore = defineStore('tasks', () => {
  const task = {
    id: '1',
    name: 'Implement Website',
    description: '',
    date: '',
    completed: false
  }
  const tasks = ref([])

  const taskPage = ref()

  const todayTaskList = computed(() =>
    tasks.value.filter((task) => dayjs(task.date).isSame(dayjs(), 'day'))
  )

  const tasksDetails = computed(() => {
    return {
      tasks: tasks.value.slice(
        (taskPage.value - 1) * TOTAL_TASK_PER_PAGE,
        taskPage.value * TOTAL_TASK_PER_PAGE
      ),
      totalPages: Math.ceil(tasks.value.length / 4)
    }
  })

  const tasksList = computed(() => (date) => {
    return tasks.value.filter((task) => task.date == date)
  })

  const addTask = (task) => {
    tasks.value.push(task)
    return true
  }

  const removeTask = (id) => {
    const selectedTask = tasks.value.find((task) => task.id === id)
    if (selectedTask) {
      selectedTask.completed = true
    }
  }
  const editTask = (modifiedTask) => {
    tasks.value.map((element, index) => (element.id === modifiedTask.id ? modifiedTask : element))
  }

  const getFormattedDate = (date) => {
    if (!date) {
      return ''
    }
    const parsedDate = dayjs(date)
    const currentDate = dayjs()
    const tomorrow = dayjs().add(1, 'day')
    switch (true) {
      case parsedDate.isSame(currentDate, 'day'):
        return {
          formattedDate: 'Today',
          styleClass: 'text-[#5B9751]'
        }
      case parsedDate.isSame(tomorrow, 'day'):
        return {
          formattedDate: 'Tomorrow',
          styleClass: 'text-[#6D46C0]'
        }
      case parsedDate.isBefore(currentDate.endOf('week'), 'day'):
        return {
          formattedDate: parsedDate.format('dddd'),
          styleClass: 'text-[#AD763B]'
        }
      default:
        return {
          formattedDate: parsedDate.format('ddd DD MMM'),
          styleClass: 'text-[#A2A2A2]'
        }
    }
  }
  const updatePage = (page) => {
    taskPage.value = page
  }

  return {
    tasks,
    taskPage,
    todayTaskList,
    tasksDetails,
    tasksList,
    addTask,
    removeTask,
    editTask,
    getFormattedDate,
    updatePage
  }
})

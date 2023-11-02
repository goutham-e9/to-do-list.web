import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref({
    tabList: [
      {
        tabName: 'Inbox',
        count: 0
      },
      {
        tabName: 'Today',
        count: 0
      },
      {
        tabName: 'Upcoming',
        count: 0
      }
    ],
    selectedTab: 'Inbox'
  })

  const updateSelectedTab = (tabName) => {
    tabs.value.selectedTab = tabName
  }

  return {
    tabs,
    updateSelectedTab
  }
})

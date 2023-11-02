<script setup>
import { RouterLink, onBeforeRouteUpdate, useRoute } from 'vue-router'
import Today from '@/assets/svgs/Today.svg'
import Upcoming from '@/assets/svgs/Upcoming.svg'
import Inbox from '@/assets/svgs/Inbox.svg'
const props = defineProps(['tab', 'isSelected'])
const emits = defineEmits(['updateSelected', 'toggleSmallSidebar'])
const route = useRoute()
const onTabSelected = (tab) => {
  emits('updateSelected', tab.tabName)
  emits('toggleSmallSidebar', tab.tabName)
}
</script>
<template>
  <RouterLink :to="{ name: tab.tabName.toLowerCase() }">
    <div
      class="flex w-full justify-between px-4 py-2 rounded-md"
      :class="{ 'bg-[#FAE7E4]': isSelected, 'hover:bg-[#F5EFEE]': !isSelected }"
      @click="onTabSelected(tab)"
    >
      <div class="flex space-x-2 items-center">
        <img v-if="tab.tabName == 'Inbox'" :src="Inbox" class="w-4 h-4" />
        <img v-else-if="tab.tabName == 'Upcoming'" :src="Upcoming" class="w-4 h-4" />
        <img v-else-if="tab.tabName == 'Today'" :src="Today" class="w-4 h-4" />
        <p>{{ tab.tabName }}</p>
      </div>
      <p>{{ tab.count }}</p>
    </div>
  </RouterLink>
</template>

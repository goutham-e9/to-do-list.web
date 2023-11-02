<template>
  <TransitionRoot
    as="template"
    :show="openSidebarValue"
    enter="transition ease-in-out duration-300 transform"
    enter-from="-translate-x-full"
    enter-to="translate-x-0"
    leave="transition ease-in-out duration-300 transform"
    leave-from="translate-x-0"
    leave-to="-translate-x-full"
  >
    <div class="hidden md:flex flex-col w-[300px] bg-[#FBF9F9] p-5 space-y-2 h-full static">
      <Tab
        v-for="tab in tabs.tabList"
        :tab="tab"
        @update-selected="updateSelectedTab"
        :is-selected="tabs.selectedTab === tab.tabName"
      >
      </Tab>
    </div>
  </TransitionRoot>
  <TransitionRoot
    as="template"
    :show="openSidebarSmall"
    enter="transition ease-in-out duration-300 transform"
    enter-from="-translate-x-full"
    enter-to="translate-x-0"
    leave="transition ease-in-out duration-300 transform"
    leave-from="translate-x-0"
    leave-to="-translate-x-full"
  >
    <div class="flex flex-col w-[300px] bg-[#FBF9F9] p-5 space-y-2 h-full md:hidden absolute z-50">
      <Tab
        v-for="tab in tabs.tabList"
        :tab="tab"
        @update-selected="updateSelectedTab"
        :is-selected="tabs.selectedTab === tab.tabName"
        @toggleSmallSidebar="$emit('toggleSmallSidebar')"
      >
      </Tab>
    </div>
  </TransitionRoot>
</template>

<script setup>
import Tab from './Tab.vue'
import { storeToRefs } from 'pinia'
import { useTabsStore } from '../../../stores/tabsStore'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { vOnClickOutside } from '@vueuse/components'
import { TransitionRoot } from '@headlessui/vue'
const props = defineProps(['openSidebarValue', 'openSidebarSmall'])
const emits = defineEmits(['toggleSmallSidebar'])
const route = useRoute()
const { tabs } = storeToRefs(useTabsStore())
const { updateSelectedTab } = useTabsStore()

const updateToggle = () => {
  if (props.openSidebarSmall) {
    emits('toggleSmallSidebar')
  }
}
</script>

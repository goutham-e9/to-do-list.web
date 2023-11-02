<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopBar from './webapp/DashBoard/components/TopBar.vue'
import SideBar from './webapp/DashBoard/components/SideBar.vue'
import { ref } from 'vue'
const openSidebar = ref(true)
const openSidebarsmall = ref(false)

const toggleSidebar = () => {
  openSidebar.value = !openSidebar.value
}
const toggleSmallSidebar = () => {
  openSidebarsmall.value = !openSidebarsmall.value
}
</script>
<template>
  <div class="h-screen w-screen overflow-hidden">
    <div class="flex flex-col w-full h-full">
      <TopBar @toggleSidebar="toggleSidebar" @toggleSmallSidebar="toggleSmallSidebar"></TopBar>
      <div class="flex h-full w-full">
        <SideBar
          :openSidebarValue="openSidebar"
          :openSidebarSmall="openSidebarsmall"
          @toggleSmallSidebar="toggleSmallSidebar"
        ></SideBar>
        <RouterView> </RouterView>
      </div>
    </div>
  </div>
</template>

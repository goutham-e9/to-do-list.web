<template>
  <div
    v-if="totalPages > 1"
    class="flex w-full space-x-2 absolute bottom-16 items-center justify-center"
  >
    <img
      v-if="currentPage > 1"
      :src="LessIcon"
      class="w-6 h-6"
      @click="onPageSelected(currentPage - 1)"
    />
    <div v-for="page in range">
      <p
        class="flex rounded-full w-6 h-6 justify-center items-center hover:bg-[#EEEEEE]"
        :class="{ 'bg-[#C9574C]': currentPage == page }"
        @click="onPageSelected(page)"
      >
        {{ page }}
      </p>
    </div>
    <img
      v-if="currentPage <= totalPages"
      :src="GreaterThanIcon"
      class="w-6 h-6"
      @click="onPageSelected(currentPage + 1)"
    />
    <div></div>
  </div>
</template>
<script setup>
import LessIcon from '@/assets/svgs/LessIcon.svg'
import GreaterThanIcon from '@/assets/svgs/GreaterThanIcon.svg'
import { ref } from 'vue'
const props = defineProps(['totalPages', 'currentPage'])
const emits = defineEmits(['pageSelected'])
const range = ref(Array.from({ length: props.totalPages }, (_, index) => 1 + index))
const onPageSelected = (page) => {
  emits('pageSelected', page)
}
</script>

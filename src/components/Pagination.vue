<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const halfVisible = Math.floor(maxVisible / 2)

  let start = Math.max(1, props.currentPage - halfVisible)
  let end = Math.min(props.totalPages, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const handlePageChange = (page) => {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center space-x-2 py-8">
    <button
      @click="handlePageChange(currentPage - 1)"
      :disabled="currentPage === 1 || loading"
      class="cursor-pointer px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      v-if="visiblePages[0] > 1"
      @click="handlePageChange(1)"
      :disabled="loading"
      class="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      1
    </button>

    <span v-if="visiblePages[0] > 2" class="px-3 py-2 text-sm text-gray-500"> ... </span>

    <button
      v-for="page in visiblePages"
      :key="page"
      @click="handlePageChange(page)"
      :disabled="loading"
      :class="[
        'cursor-pointer px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200',
        page === currentPage
          ? 'bg-blue-600 text-white border border-blue-600'
          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700',
      ]"
    >
      {{ page }}
    </button>

    <span
      v-if="visiblePages[visiblePages.length - 1] < totalPages - 1"
      class="cursor-pointerpx-3 py-1.5 text-sm text-gray-500"
    >
      ...
    </span>

    <button
      v-if="visiblePages[visiblePages.length - 1] < totalPages"
      @click="handlePageChange(totalPages)"
      :disabled="loading"
      class="cursor-pointer px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      {{ totalPages }}
    </button>

    <button
      @click="handlePageChange(currentPage + 1)"
      :disabled="currentPage === totalPages || loading"
      class="cursor-pointer px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

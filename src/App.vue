<script setup>
import { onMounted } from 'vue'
import { useUnsplash } from './composables/useUnsplash'
import SearchBar from './components/SearchBar.vue'
import ImageCard from './components/ImageCard.vue'
import Pagination from './components/Pagination.vue'

const {
  images,
  loading,
  error,
  currentPage,
  totalPages,
  searchQuery,
  totalResults,
  goToPage,
  handleSearch,
  loadPopularImages,
} = useUnsplash()

const handlePageChange = (page) => {
  goToPage(page)
}

onMounted(() => {
  loadPopularImages()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Unsplash Images</h1>
        </div>

        <div class="mt-8">
          <SearchBar :loading="loading" @search="handleSearch" />
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="!loading && images.length > 0" class="mb-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600">
              Найдено {{ totalResults }} изображений
              <span v-if="searchQuery" class="font-medium"> для "{{ searchQuery }}" </span>
            </p>
            <p class="text-sm text-gray-500">Страница {{ currentPage }} из {{ totalPages }}</p>
          </div>

          <button
            v-if="searchQuery"
            @click="loadPopularImages"
            class="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Показать популярные
          </button>
        </div>
      </div>

      <div v-if="error" class="mb-6">
        <div class="bg-red-50 border border-red-200 rounded-md p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Ошибка загрузки</h3>
              <div class="mt-2 text-sm text-red-700">
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="loading"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div v-for="i in 12" :key="i" class="bg-white rounded-lg overflow-hidden shadow-sm">
          <div class="aspect-square bg-gray-200 animate-pulse"></div>
          <div class="p-4">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div class="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="images.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <ImageCard v-for="image in images" :key="image.id" :image="image" />
      </div>

      <div v-else-if="!loading && !error" class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          {{ searchQuery ? 'Изображения не найдены' : 'Нет изображений' }}
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          {{
            searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Попробуйте обновить страницу'
          }}
        </p>
      </div>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :loading="loading"
        @page-change="handlePageChange"
      />
    </main>
  </div>
</template>

<style scoped></style>

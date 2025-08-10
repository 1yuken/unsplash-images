<script setup>
import { ref } from 'vue'

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
})

const imageLoaded = ref(false)
const imageError = ref(false)

const handleImageLoad = () => {
  imageLoaded.value = true
}

const handleImageError = () => {
  imageError.value = true
}

const openImageInNewTab = () => {
  window.open(props.image.links.html, '_blank')
}
</script>

<template>
  <div
    class="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div class="aspect-square relative overflow-hidden">
      <div
        v-if="!imageLoaded && !imageError"
        class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
      >
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      <img
        v-if="!imageError"
        :src="image.urls.regular"
        :alt="image.alt_description || 'Unsplash image'"
        @load="handleImageLoad"
        @error="handleImageError"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        :class="{ 'opacity-0': !imageLoaded }"
      />

      <div v-if="imageError" class="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div class="text-center text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p class="text-sm">Ошибка загрузки</p>
        </div>
      </div>

      <div
        class="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center"
      >
        <button
          @click="openImageInNewTab"
          class="cursor-pointer opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform scale-95 group-hover:scale-100"
        >
          Открыть
        </button>
      </div>
    </div>

    <div class="p-4">
      <div class="flex items-center space-x-3">
        <img
          :src="image.user.profile_image.small"
          :alt="image.user.name"
          class="w-8 h-8 rounded-full"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ image.user.name }}
          </p>
          <p class="text-xs text-gray-500">@{{ image.user.username }}</p>
        </div>
      </div>

      <div class="mt-3 flex items-center text-sm text-gray-500">
        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
        {{ image.likes }}
      </div>
    </div>
  </div>
</template>

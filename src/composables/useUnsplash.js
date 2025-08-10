import { ref, computed } from 'vue'
import axios from 'axios'

const UNSPLASH_API_URL = 'https://api.unsplash.com'
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export const useUnsplash = () => {
  const images = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const totalPages = ref(0)
  const searchQuery = ref('')
  const totalResults = ref(0)
  const perPage = 12

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  const searchImages = async (query = '', page = 1) => {
    loading.value = true
    error.value = null

    try {
      const endpoint = query ? '/search/photos' : '/photos'

      const params = {
        page,
        per_page: perPage,
        ...(query && { query }),
      }

      const response = await axios.get(`${UNSPLASH_API_URL}${endpoint}`, {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        params,
      })

      if (query) {
        images.value = response.data.results
        totalResults.value = response.data.total
        totalPages.value = Math.ceil(response.data.total / perPage)
      } else {
        images.value = response.data
        totalResults.value = response.data.length
        totalPages.value = Math.ceil(response.data.length / perPage)
      }

      currentPage.value = page
    } catch (err) {
      error.value = err.response?.data?.errors?.[0] || 'Ошибка при загрузке изображений'
      console.error('Unsplash API Error:', err)
    } finally {
      loading.value = false
    }
  }

  const nextPage = async () => {
    if (hasNextPage.value) {
      await searchImages(searchQuery.value, currentPage.value + 1)
    }
  }

  const prevPage = async () => {
    if (hasPrevPage.value) {
      await searchImages(searchQuery.value, currentPage.value - 1)
    }
  }

  const goToPage = async (page) => {
    if (page >= 1 && page <= totalPages.value) {
      await searchImages(searchQuery.value, page)
    }
  }

  const handleSearch = async (query) => {
    searchQuery.value = query
    await searchImages(query, 1)
  }

  const loadPopularImages = async () => {
    searchQuery.value = ''
    await searchImages('', 1)
  }

  return {
    images,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    totalResults,
    perPage,
    hasNextPage,
    hasPrevPage,
    searchImages,
    nextPage,
    prevPage,
    goToPage,
    handleSearch,
    loadPopularImages,
  }
}

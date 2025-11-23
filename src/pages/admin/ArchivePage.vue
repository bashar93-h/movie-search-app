<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  PhArchive,
  PhArrowCounterClockwise,
  PhTrash,
  PhMagnifyingGlass,
  PhFunnel,
} from '@phosphor-icons/vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

interface ArchivedItem {
  id: string
  title: string
  type: 'movie' | 'user' | 'rating'
  archivedBy: string
  archivedAt: string
  reason?: string
  metadata?: any
}

// Mock archived items
const archivedItems = ref<ArchivedItem[]>([
  {
    id: '1',
    title: 'The Matrix',
    type: 'movie',
    archivedBy: 'Bashar Admin',
    archivedAt: '2024-03-15T10:30:00',
    reason: 'Duplicate entry',
    metadata: { year: '1999', imdbID: 'tt0133093' },
  },
  {
    id: '2',
    title: 'John Doe Account',
    type: 'user',
    archivedBy: 'Bashar Admin',
    archivedAt: '2024-03-10T14:20:00',
    reason: 'Policy violation',
    metadata: { email: 'john@example.com' },
  },
  {
    id: '3',
    title: 'Inception',
    type: 'movie',
    archivedBy: 'Bashar Admin',
    archivedAt: '2024-03-01T09:15:00',
    reason: 'Requested by user',
    metadata: { year: '2010', imdbID: 'tt1375666' },
  },
  {
    id: '4',
    title: 'Rating for Interstellar',
    type: 'rating',
    archivedBy: 'Bashar Admin',
    archivedAt: '2024-02-28T16:45:00',
    reason: 'Spam rating',
    metadata: { rating: 1, movieId: 'tt0816692' },
  },
])

const searchQuery = ref('')
const filterType = ref<'all' | 'movie' | 'user' | 'rating'>('all')

// Filtered items
const filteredItems = computed(() => {
  let items = archivedItems.value

  // Filter by type
  if (filterType.value !== 'all') {
    items = items.filter((item) => item.type === filterType.value)
  }

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.reason?.toLowerCase().includes(query) ||
        item.archivedBy.toLowerCase().includes(query),
    )
  }

  return items
})

// Stats
const stats = computed(() => ({
  total: archivedItems.value.length,
  movies: archivedItems.value.filter((i) => i.type === 'movie').length,
  users: archivedItems.value.filter((i) => i.type === 'user').length,
  ratings: archivedItems.value.filter((i) => i.type === 'rating').length,
}))

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'movie':
      return 'bg-purple-500/20 text-purple-400'
    case 'user':
      return 'bg-blue-500/20 text-blue-400'
    case 'rating':
      return 'bg-green-500/20 text-green-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

const restoreItem = (item: ArchivedItem) => {
  if (confirm(`Are you sure you want to restore "${item.title}"?`)) {
    archivedItems.value = archivedItems.value.filter((i) => i.id !== item.id)
    toast.success(`${item.title} restored successfully`)
  }
}

const permanentlyDelete = (item: ArchivedItem) => {
  if (
    confirm(
      `⚠️ Are you sure you want to PERMANENTLY delete "${item.title}"? This cannot be undone!`,
    )
  ) {
    archivedItems.value = archivedItems.value.filter((i) => i.id !== item.id)
    toast.success(`${item.title} permanently deleted`)
  }
}

const clearAllArchived = () => {
  if (
    confirm(
      '⚠️ Are you sure you want to permanently delete ALL archived items? This cannot be undone!',
    )
  ) {
    archivedItems.value = []
    toast.success('All archived items deleted')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 font-poppins text-text-light dark:text-text-dark">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-goldman font-bold mb-2">Archive Management</h1>
      <p class="text-text-muted">Restore or permanently delete archived items</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div
        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-700"
      >
        <p class="text-text-muted text-sm mb-1">Total Archived</p>
        <p class="text-3xl font-bold text-accent-light dark:text-accent-dark">{{ stats.total }}</p>
      </div>
      <div
        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-700"
      >
        <p class="text-text-muted text-sm mb-1">Movies</p>
        <p class="text-3xl font-bold text-purple-400">{{ stats.movies }}</p>
      </div>
      <div
        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-700"
      >
        <p class="text-text-muted text-sm mb-1">Users</p>
        <p class="text-3xl font-bold text-blue-400">{{ stats.users }}</p>
      </div>
      <div
        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-700"
      >
        <p class="text-text-muted text-sm mb-1">Ratings</p>
        <p class="text-3xl font-bold text-green-400">{{ stats.ratings }}</p>
      </div>
    </div>

    <!-- Filters & Actions -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1 relative">
        <PhMagnifyingGlass
          class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          size="20"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search archived items..."
          class="w-full pl-10 pr-4 py-3 bg-background-light dark:bg-background-dark border border-gray-600 rounded-lg placeholder-text-muted focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light"
        />
      </div>

      <div class="flex gap-3">
        <div class="relative">
          <PhFunnel class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size="20" />
          <select
            v-model="filterType"
            class="pl-10 pr-8 py-3 bg-background-light dark:bg-background-dark border border-gray-600 rounded-lg focus:outline-none focus:border-accent-light"
          >
            <option value="all">All Types</option>
            <option value="movie">Movies</option>
            <option value="user">Users</option>
            <option value="rating">Ratings</option>
          </select>
        </div>

        <button
          @click="clearAllArchived"
          :disabled="archivedItems.length === 0"
          class="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg font-semibold hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Archived Items List -->
    <div class="space-y-4">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="bg-background-light dark:bg-background-dark rounded-xl border border-gray-700 p-6 hover:border-accent-light/50 transition-colors"
      >
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <PhArchive size="24" class="text-text-muted" />
              <h3 class="text-lg font-semibold">
                {{ item.title }}
              </h3>
              <span
                :class="getTypeColor(item.type)"
                class="px-3 py-1 rounded-full text-xs font-semibold"
              >
                {{ item.type }}
              </span>
            </div>

            <div class="ml-9 space-y-1 text-sm text-text-muted">
              <p v-if="item.reason"><span class="font-medium">Reason:</span> {{ item.reason }}</p>
              <p><span class="font-medium">Archived by:</span> {{ item.archivedBy }}</p>
              <p><span class="font-medium">Date:</span> {{ formatDate(item.archivedAt) }}</p>
            </div>
          </div>

          <div class="flex gap-2 ml-9 md:ml-0">
            <button
              @click="restoreItem(item)"
              class="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-colors"
            >
              <PhArrowCounterClockwise size="18" />
              <span>Restore</span>
            </button>
            <button
              @click="permanentlyDelete(item)"
              class="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <PhTrash size="18" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredItems.length === 0"
        class="text-center py-16 bg-background-light dark:bg-background-dark rounded-xl border border-gray-700"
      >
        <PhArchive size="64" class="mx-auto mb-4 opacity-50" />
        <p class="text-lg font-semibold mb-1">No archived items</p>
        <p class="text-sm">{{ searchQuery ? 'Try adjusting your search' : 'Archive is empty' }}</p>
      </div>
    </div>
  </div>
</template>

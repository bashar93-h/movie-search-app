<script setup lang="ts">
import { ref, computed } from 'vue'
import { PhTrash, PhPencil, PhUserPlus, PhMagnifyingGlass, PhX } from '@phosphor-icons/vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member'
  createdAt: string
}

// Mock users data
const users = ref<User[]>([
  {
    id: '1',
    name: 'Bashar abdulaziz',
    email: 'admin@movie.com',
    role: 'admin',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Bashar abdulaziz',
    email: 'member@movie.com',
    role: 'member',
    createdAt: '2024-02-20',
  },
  { id: '3', name: 'John Doe', email: 'john@example.com', role: 'member', createdAt: '2024-03-10' },
  {
    id: '4',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'member',
    createdAt: '2024-03-15',
  },
])

const searchQuery = ref('')
const showAddModal = ref(false)
const editingUser = ref<User | null>(null)

// Form data
const formData = ref({
  name: '',
  email: '',
  role: 'member' as 'admin' | 'member',
})

// Filtered users
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value

  const query = searchQuery.value.toLowerCase()
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query),
  )
})

// Stats
const stats = computed(() => ({
  total: users.value.length,
  admins: users.value.filter((u) => u.role === 'admin').length,
  members: users.value.filter((u) => u.role === 'member').length,
}))

const openAddModal = () => {
  formData.value = { name: '', email: '', role: 'member' }
  editingUser.value = null
  showAddModal.value = true
}

const openEditModal = (user: User) => {
  formData.value = { ...user }
  editingUser.value = user
  showAddModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  editingUser.value = null
  formData.value = { name: '', email: '', role: 'member' }
}

const saveUser = () => {
  if (!formData.value.name || !formData.value.email) {
    toast.error('Please fill all fields')
    return
  }

  if (editingUser.value) {
    // Update existing user
    const index = users.value.findIndex((u) => u.id === editingUser.value!.id)
    if (index !== -1) {
      users.value[index] = { ...editingUser.value, ...formData.value }
      toast.success('User updated successfully')
    }
  } else {
    // Add new user
    const newUser: User = {
      id: Date.now().toString(),
      ...formData.value,
      createdAt: new Date().toISOString().split('T')[0],
    }
    users.value.push(newUser)
    toast.success('User added successfully')
  }

  closeModal()
}

const deleteUser = (user: User) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    users.value = users.value.filter((u) => u.id !== user.id)
    toast.success('User deleted successfully')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 font-poppins text-text-light dark:text-text-dark">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-goldman font-bold mb-2">User Management</h1>
      <p class="text-text-muted">Manage system users and their roles</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div
        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-700"
      >
        <p class="text-text-muted text-sm mb-1">Total Users</p>
        <p class="text-3xl font-bold text-accent-light dark:text-accent-dark">{{ stats.total }}</p>
      </div>
      <div
        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-700"
      >
        <p class="text-text-muted text-sm mb-1">Admins</p>
        <p class="text-3xl font-bold text-accent-light dark:text-accent-dark">{{ stats.admins }}</p>
      </div>
      <div
        class="bg-background-light dark:bg-background-dark p-6 rounded-xl border border-gray-700"
      >
        <p class="text-text-muted text-sm mb-1">Members</p>
        <p class="text-3xl font-bold text-accent-light dark:text-accent-dark">
          {{ stats.members }}
        </p>
      </div>
    </div>

    <!-- Search & Add -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <div class="flex-1 relative">
        <PhMagnifyingGlass
          class="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          size="20"
        />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users by name, email, or role..."
          class="w-full pl-10 pr-4 py-3 bg-background-light dark:bg-background-dark border border-gray-600 rounded-lg placeholder-text-muted focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light"
        />
      </div>
      <button
        @click="openAddModal"
        class="flex items-center gap-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-background-dark dark:text-background-light rounded-lg font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        <PhUserPlus size="20" />
        Add User
      </button>
    </div>

    <!-- Users Table -->
    <div
      class="bg-background-light dark:bg-background-dark rounded-xl border border-gray-700 overflow-hidden"
    >
      <table class="w-full">
        <thead class="bg-background-dark dark:bg-background-light border-b border-gray-700">
          <tr class="text-text-dark dark:text-text-light">
            <th class="px-6 py-4 text-left text-sm font-semibold">Name</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Email</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Role</th>
            <th class="px-6 py-4 text-left text-sm font-semibold">Joined</th>
            <th class="px-6 py-4 text-right text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b border-gray-700 hover:bg-background-dark/50 dark:hover:bg-background-light/50 transition-colors"
          >
            <td class="px-6 py-4">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4">
              <span
                :class="{
                  'bg-accent-light/20 text-accent-light': user.role === 'admin',
                  'bg-blue-500/20 text-blue-400': user.role === 'member',
                }"
                class="px-3 py-1 rounded-full text-xs font-semibold"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 text-text-muted">{{ user.createdAt }}</td>
            <td class="px-6 py-4">
              <div class="flex justify-end gap-2">
                <button
                  @click="openEditModal(user)"
                  class="p-2 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
                  title="Edit user"
                >
                  <PhPencil size="18" />
                </button>
                <button
                  @click="deleteUser(user)"
                  class="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                  title="Delete user"
                >
                  <PhTrash size="18" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="filteredUsers.length === 0" class="text-center py-12">No users found</div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 text-text-light dark:text-text-dark"
      @click.self="closeModal"
    >
      <div class="bg-background-light dark:bg-background-dark rounded-xl p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold">
            {{ editingUser ? 'Edit User' : 'Add New User' }}
          </h2>
          <button @click="closeModal" class="hover:text-text-dark dark:hover:text-text-light">
            <PhX size="24" />
          </button>
        </div>

        <form @submit.prevent="saveUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2"> Name </label>
            <input
              v-model="formData.name"
              type="text"
              required
              aria-required="true"
              class="w-full px-4 py-3 bg-background-dark dark:bg-background-light border border-gray-600 rounded-lg text-text-dark dark:text-text-light focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2"> Email </label>
            <input
              v-model="formData.email"
              type="email"
              required
              aria-required="true"
              class="w-full px-4 py-3 bg-background-dark dark:bg-background-light border border-gray-600 rounded-lg text-text-dark dark:text-text-light focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2"> Role </label>
            <select
              v-model="formData.role"
              class="w-full px-4 py-3 bg-background-dark dark:bg-background-light border border-gray-600 rounded-lg text-text-dark dark:text-text-light focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="closeModal"
              class="flex-1 px-4 py-3 bg-background-dark dark:bg-background-light border border-gray-600 rounded-lg text-text-dark dark:text-text-light hover:bg-background/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 px-4 py-3 bg-accent-light dark:bg-accent-dark text-background-dark dark:text-background-light rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {{ editingUser ? 'Update' : 'Add' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

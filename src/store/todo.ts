import { Writable, writable } from 'svelte/store'
import { getItem, TODO_KEY } from '@/utils/local-storage'

export const statuses: FilterStatus[] = ['All', 'Active', 'Completed']

function createTodo() {
  interface ITodoStore {
    items: TodoItem[]
    currentStatus: FilterStatus
  }

  const { subscribe, update }: Writable<ITodoStore> = writable({
    items: getItem(TODO_KEY) || [],
    currentStatus: 'All'
  })

  const addNewTodo = (title: string) => {
    if (!title || !title.trim()) {
      return
    }
    const todo: TodoItem = {
      id: `${new Date().getTime()}`,
      title,
      isCompleted: false
    }
    update((prev) => {
      prev.items = [todo, ...prev.items]
      return prev
    })
  }

  const toggleCompleted = (id?: string) => {
    if (id) {
      update((prev) => {
        prev.items = prev.items.map((todo) => {
          if (todo.id === id) {
            todo.isCompleted = !todo.isCompleted
          }
          return todo
        })
        return prev
      })
    } else {
      update((prev) => {
        const isAllCompleted = prev.items.every((todo) => todo.isCompleted)
        prev.items = prev.items.map((todo) => {
          todo.isCompleted = !isAllCompleted
          return todo
        })
        return prev
      })
    }
  }

  const clearCompleted = () => {
    update((prev) => {
      prev.items = prev.items.filter((todo) => !todo.isCompleted)
      return prev
    })
  }

  const onRemove = (todo: TodoItem) => {
    update((prev) => {
      prev.items = prev.items.filter((t) => t.id !== todo.id)
      return prev
    })
  }

  const updateStatus = (status: FilterStatus) => {
    update((prev) => {
      prev.currentStatus = status
      return prev
    })
  }

  const editTitle = (id: string, title: string) => {
    if (!id) {
      return
    }
    update((prev) => {
      if (!title) {
        prev.items = prev.items.filter((todo) => todo.id !== id)
      } else {
        const editedId = prev.items.findIndex((todo) => todo.id === id)
        if (editedId) {
          prev.items[editedId].title = title
        }
      }
      return prev
    })
  }

  return {
    subscribe,
    onRemove,
    clearCompleted,
    toggleCompleted,
    addNewTodo,
    updateStatus,
    editTitle
  }
}

export const todoStore = createTodo()

interface TodoItem {
  id: string
  title: string
  isCompleted: boolean
}

type FilterStatus = 'All' | 'Active' | 'Completed'

interface WindowEventMap
  extends GlobalEventHandlersEventMap,
    WindowEventHandlersEventMap {}
declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onclickOutside?: () => void
  }
}

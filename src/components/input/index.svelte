<script lang="ts">
  import { todoStore } from '@/store/todo'

  import { clsx, dispatchForCode } from '@/utils/helpers'

  export let className

  const onKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement

    if (!target.value.trim()) {
      return
    }

    dispatchForCode(event, (key) => {
      if (key === 13 || key === 'Enter') {
        todoStore.addNewTodo(target.value)
        target.value = ''
      }
    })
  }
</script>

<div class="wrap-input">
  <input
    on:keyup={onKeyUp}
    class={clsx('input', className)}
    type="text"
    {...$$restProps}
  />
</div>

<style lang="scss">
  @import './style.scss';
</style>

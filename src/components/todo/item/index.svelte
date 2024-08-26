<script lang="ts">
  import { afterUpdate } from 'svelte'
  import { todoStore } from '@/store/todo'
  import { clsx, ClickOutside, dispatchForCode } from '@/utils/helpers'

  const CheckImg = 'images/svgs/circle.svg'
  const CheckCompleteImg = 'images/svgs/check-complete.svg'
  const CancelImg = 'images/svgs/cancel.svg'

  export let todo: TodoItem
  let showInput: boolean = false
  let inputRef: HTMLElement

  afterUpdate(() => {
    if (showInput === true) {
      inputRef.focus()
    }
  })

  const handleRemove = () => {
    todoStore.onRemove(todo)
  }
  const onItemClicked = () => {
    todoStore.toggleCompleted(todo.id)
  }

  const onDbClick = () => {
    showInput = true
  }

  const onClickOutside = () => {
    showInput = false
  }

  const onChangeInput = (event: Event) => {
    const target = event.target as HTMLInputElement

    todoStore.editTitle(todo.id, target.value)
  }

  const onKeyUp = (event: KeyboardEvent) => {
    dispatchForCode(event, (key) => {
      if ([13, 'Enter', 'Escape'].includes(key)) {
        showInput = false
      }
    })
  }
</script>

<div class={clsx('todo-item', { completed: todo.isCompleted })}>
  <img
    class={clsx('check-img', {
      opacity: todo.isCompleted,
      hidden: showInput
    })}
    on:click={onItemClicked}
    alt=""
    src={todo.isCompleted ? CheckCompleteImg : CheckImg}
    width={32}
    height={32}
  />
  <div
    class="todo-value"
    on:dblclick={onDbClick}
    on:clickOutside={onClickOutside}
    use:ClickOutside
  >
    {#if showInput}
      <!-- svelte-ignore a11y-autofocus -->
      <input
        class={clsx('edit', { open: showInput })}
        on:keyup={onKeyUp}
        on:change={onChangeInput}
        bind:value={todo.title}
        bind:this={inputRef}
        autofocus={showInput}
      />
    {:else}
      <p id={todo.id} class="title">
        {todo.title}
      </p>
    {/if}
  </div>
  <img
    class={clsx('cancel-img', { hidden: showInput })}
    on:click={handleRemove}
    alt=""
    src={CancelImg}
    width={15}
    height={15}
  />
</div>

<style lang="scss">
  @import './style.scss';
</style>

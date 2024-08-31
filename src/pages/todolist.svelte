<script lang="ts">
  import { onDestroy } from 'svelte'
  import { statuses, todoStore } from '@/store/todo'

  import Input from '@/components/input/index.svelte'
  import TodoList from '@/components/todo/index.svelte'
  import { clsx } from '../utils/helpers'
  import { removeItem, setItem, TODO_KEY } from '../utils/local-storage'

  const TickImg = 'images/svgs/tick.svg'

  $: allTodo = $todoStore.items
  $: activeStatus = $todoStore.currentStatus
  $: todoFiltered =
    activeStatus === 'All'
      ? allTodo
      : activeStatus === 'Active'
      ? allTodo.filter((todo) => !todo.isCompleted)
      : allTodo.filter((todo) => todo.isCompleted)
  $: count = allTodo.length
  $: countNotCompleted = allTodo.filter((todo) => !todo.isCompleted).length
  $: isAllCompleted = allTodo.every((todo) => todo.isCompleted)
  $: isSomeCompleted = allTodo.some((todo) => todo.isCompleted)

  const unsubscribeTodo = todoStore.subscribe(({ items }) => {
    if (items?.length) {
      setItem(TODO_KEY, items)
    } else {
      removeItem(TODO_KEY)
    }
  })

  const onClearCompleted = () => {
    todoStore.clearCompleted()
  }
  const onClickStatus = (status: FilterStatus) => {
    todoStore.updateStatus(status)
  }
  const onToggleAll = () => {
    todoStore.toggleCompleted()
  }

  onDestroy(unsubscribeTodo)
</script>

<div class="todo">
  <h1>Todo List</h1>
  <div class="wrap-todo">
    <div class="header">
      <div class="toggle-all">
        {#if count}
          <img
            class={isAllCompleted ? 'completed' : ''}
            on:click={onToggleAll}
            src={TickImg}
            alt=""
            width="20"
            height="20"
          />
        {/if}
      </div>
      <Input className="input-todo" placeholder="What needs to be done ?" />
    </div>
    <TodoList todoList={todoFiltered} />
    {#if count}
      <footer id="footer">
        <div class="number">
          {countNotCompleted} item{countNotCompleted > 1 ? 's' : ''} left
        </div>
        <div class="status">
          {#each statuses as status}
            <p
              class={clsx({ active: activeStatus === status })}
              on:click={() => onClickStatus(status)}
            >
              {status}
            </p>
          {/each}
        </div>
        {#if isSomeCompleted}
          <div on:click={onClearCompleted} class="clear">Clear Completed</div>
        {/if}
      </footer>
    {/if}
  </div>
  <div class="sources">
    <div class="source">Design by thaind97git</div>
    <div class="source">
      Source code
      <a target="__blank" href="https://github.com/creative2115/Svelte-todo-route"
        >here</a
      >
    </div>
  </div>
</div>

<style lang="scss">
  @import '../App.scss';
</style>
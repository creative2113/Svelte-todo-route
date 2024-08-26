<script lang="ts">
  import Item from './item/index.svelte'

  export let todoList: Array<TodoItem> = []
</script>

<div class="todo-list">
  {#each todoList as todo (todo.id)}
    <Item {todo} />
  {/each}
</div>

<style>
</style>

<template>
  <div class="todo-app__main">
    <ul class="todo-list">
      <TodoListItem
        v-for="todo in todos"
        :key="todo.id"
        v-bind="todo"
        @remove="() => $emit('remove-todo', todo.id)"
        @complete.once="$emit('complete', todo.id)"
      />
    </ul>
    <div class="todo-list__empty" v-if="!todos.length">
      <p>Список задач пуст</p>
    </div>
  </div>
</template>

<script setup>
import TodoListItem from './TodoListItem.vue'

defineProps(
  {
    todos: {
      type: Array,
      required: true,
    },
  }
)
</script>

<style>
.todo-app__main {
  background-color: #fff;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px 0 rgba(0, 0, 0, 0.08);
  border-top: 4px solid #6574cd;
  border-radius: 0.25rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
}

.todo-list {
  padding: 0;
  margin: 0;
}

.todo-list__empty {
  text-align: center;
  color: #999;
}
</style>

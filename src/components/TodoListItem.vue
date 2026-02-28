<template>
  <li class="todo-list__item" :class="{ 'todo-list__item--completed': completed }">
    <span class="todo-list__item-text">{{ text }}</span>
    <button
      class="btn btn--check"
      @click="$emit('complete')"
      :disabled="completed"
      aria-label="Завершить задачу"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15" height="22">
        <path
          d="M438.6 109.4c-12.5-12.5-32.8-12.5-45.3 0L160 320.7l-92.3-92.3c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0l288-288c12.6-12.5 12.6-32.8 .1-45.3z"
        />
      </svg>
    </button>
    <button class="btn btn--delete" @click="$emit('remove')" aria-label="Удалить задачу">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15" height="22">
        <path
          d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
        />
      </svg>
    </button>
  </li>
</template>

<script setup>
defineProps(
  {
    id: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  }
)
</script>

<style>
.todo-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.todo-list__item:last-child {
  border-bottom: none;
}

.todo-list__item-text {
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
}

.todo-list__item--completed .todo-list__item-text {
  text-decoration: line-through;
}

.todo-list__item--completed .btn--check path {
  fill: #38c172;
}
</style>

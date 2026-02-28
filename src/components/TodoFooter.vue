<template>
  <div class="todo-app__footer">
    <p class="todo-app__footer-text">Осталось {{ remaining }} задания(й)</p>
    <button class="btn btn--clear" @click="$emit('clear-completed')">Удалить завершенные</button>
    <button class="btn btn--clear" @click="$emit('clear-all')">Очистить список</button>
  </div>
</template>

<script setup>
defineProps(
  {
    remaining: {
      type: Number,
      required: true,
    },
  }
)
</script>

<style>
.todo-app__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  gap: 10px;
}

.todo-app__footer-text {
  flex-grow: 1;
}
</style>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <div class="form__group form__group--todo">
      <input class="form-control" type="text" placeholder="Новая задача" v-model.trim="newTodo"/>
      <button class="btn btn--add-todo" type="submit">Добавить</button>
    </div>
  </form>
</template>

<script setup>
  import { ref } from 'vue'
  const newTodo = ref('')
  const $emit = defineEmits(['add-todo'])

  const handleSubmit = () => {
    if (newTodo.value) {
      $emit('add-todo', newTodo.value)
      newTodo.value = ''
    }
  }
</script>

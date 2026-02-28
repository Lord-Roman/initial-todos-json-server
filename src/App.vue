<template>
  <div class="container todo-app">
    <h1 class="title">Todo List</h1>
    <TodoForm @add-todo="addTodo" />

    <TodoList
      :todos="todos"
      @remove-todo="removeTodo"
      @complete="completeTodo"
    />

    <TodoFooter
      v-if="todos.length"
      :remaining="remainingTodos"
      @clear-completed="clearCompleted"
      @clear-all="clearAll"
    />
    <div v-show="isLoading">Загрузка...</div>
    <div v-show="error.length">
      Произошла ошибка: {{ error }}
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from "vue";

import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";
import { useFetchTodos } from "./composables/useFetchToDos";

const { isLoading, error, fetchData } = useFetchTodos();
const todos = reactive([]);

const fetchTodos = async () => {
  const data = await fetchData(
    "http://localhost:3000/todos",
  );
  todos.splice(0, todos.length, ...data);
};

const addTodo = (newTodo) => {
  const todo = {
    id: Date.now().toString(),
    text: newTodo,
    completed: false,
  };
  fetchData("http://localhost:3000/todos/", {
    method: "POST",
    body: todo,
    headers: { "Content-Type": "application/json" },
  }).then(() => {
    fetchTodos();
  });
};

const removeTodo = async (id) => {
  fetchData(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(() => {
    fetchTodos();
  });
};

const completeTodo = (todo) => {
  console.log(todo.id)

  fetchData(`http://localhost:3000/todos/${todo.id}`, {
    method: "PATCH",
    body: { completed: !todo.completed},
  }).then(() => {
    fetchTodos();
  });
};

const clearCompleted = () => {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      fetchData(`http://localhost:3000/todos/${todos[i].id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then(() => {
        fetchTodos();
      });
    }
  }
};

const clearAll = async () => {
  await Promise.all(
    todos.map(todo =>
      fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
    )
  );
  fetchTodos();
};

const remainingTodos = computed(
  () => todos.filter((todo) => !todo.completed).length,
);

onMounted(() => {
  fetchTodos();
});
</script>

<style src="./App.css"></style>

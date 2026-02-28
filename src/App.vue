<template>
  <div class="container todo-app">
    <h1 class="title">Todo List</h1>
    <TodoForm @add-todo="addTodo" />

    <TodoList :todos="todos" @remove-todo="removeTodo" />

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
import { useFetchToDos } from "./composables/useFetchToDos";
import TodoForm from "./components/TodoForm.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/TodoFooter.vue";

const { isLoading, error, fetchData } = useFetchToDos();
const todos = reactive([]);

const addTodo = (newTodo) => {
  const todo ={
    id: Date.now().toString(),
    text: newTodo,
    completed: false,
  };
  fetchData("http://localhost:3000/todos/", {
        method: "POST",
        body: todo,
        headers:{'Content-Type':'application/json'}
  }).then(()=>{
    fetchToDos();
  });
};

const removeTodo = async (id) => {
  fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  }).then(()=>{
    fetchToDos();
  });
};

const remainingTodos = computed(
  () => todos.filter((todo) => !todo.completed).length,
);

const clearCompleted = () => {
  for (let i = todos.length - 1; i >= 0; i--) {
    if (todos[i].completed) {
      todos.splice(i, 1);
    }
  }
};

const clearAll = () => {
  todos.splice(0, todos.length);
};

const fetchToDos = async () => {
  const data = await fetchData(
    "http://localhost:3000/todos",
  );
  todos.splice(0, todos.length, ...data);
};
onMounted(() => {
  fetchToDos();
});
</script>

<style src="./App.css"></style>

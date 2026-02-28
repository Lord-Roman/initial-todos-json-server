import { ref } from "vue";

export function useFetchToDos() {
  const isLoading = ref(false);
  const error = ref("");

  const fetchData = async (url, options = {}) => {
    error.value = "";
    isLoading.value = true;
    try {
      const response = await fetch(url, {
        ...options,
        body: options.body
          ? JSON.stringify(options.body)
          : null,
      });
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      return await response.json();
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, error, fetchData };
}

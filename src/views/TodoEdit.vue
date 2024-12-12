<script setup>
import { useTodoStore } from "@/stores/todo";
import { onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import Loading from "../components/Loading.vue";

const router = useRoute();

const todoStore = useTodoStore();

const todoId = ref(-1);
const isLoading = ref(false);
const isSuccess = ref(false);

onMounted(async () => {
  isLoading.value = true;
  await todoStore.loadTodo(router.params.id);
  todoId.value = parseInt(router.params.id);
  isLoading.value = false;
});

const editTodo = async (todoData) => {
  try {
    isLoading.value = true;
    const body = {
      name: todoData.name,
      status: todoData.status,
    };
    await todoStore.editTodo(todoId.value, body);
    await todoStore.loadTodo(router.params.id);
    isLoading.value = false;
    isSuccess.value = true;

    setTimeout(() => {
      isSuccess.value = false;
    }, 2000);
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="w-1/2 mx-auto">
    <div class="toast toast-top toast-start">
      <div v-if="isSuccess" class="alert alert-success">
        <span>Edit to do successfully.</span>
      </div>
    </div>
    <h1 v-if="isLoading"><Loading /></h1>
    <div>
      <div class="flex items-center">
        <RouterLink :to="`/`">
          <button class="btn btn-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              height="1em"
              fill="white"
            >
              <path
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
          </button>
        </RouterLink>
        <div>
          Edit id
          <div class="badge badge-accent">{{ todoId }}</div>
        </div>
      </div>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">What to do...</span>
        </div>
        <input
          type="text"
          placeholder="Insert here"
          v-model="todoStore.selectedTodo.name"
          class="input input-bordered w-full"
        />
      </label>

      <label class="form-control w-full mt-2">
        <div class="label">
          <span class="label-text">Status</span>
        </div>
        <select
          v-model="todoStore.selectedTodo.status"
          class="select select-bordered w-full"
        >
          <option
            v-for="status in todoStore.status"
            :key="status"
            :value="status"
          >
            {{ status }}
          </option>
        </select>
      </label>

      <button
        class="mt-4 btn btn-primary w-full"
        @click="editTodo(todoStore.selectedTodo)"
      >
        Edit
      </button>
    </div>
  </div>
</template>

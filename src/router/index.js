import { createRouter, createWebHistory } from "vue-router";

import TodoView from "@/views/TodoView.vue";
import TodoEdit from "@/views/TodoEdit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "todo-view",
      component: TodoView,
    },
    {
      path: "/:id/edit",
      name: "todo-edit",
      component: TodoEdit,
    },
  ],
});

export default router;

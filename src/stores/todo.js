import { defineStore } from "pinia";
import axios from "axios";

const BASE_URL = "https://675039f869dc1669ec1a2fdd.mockapi.io";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [],
    status: ["Pending", "Doing", "Done"],
    selectedTodo: {},
  }),

  actions: {
    async loadTodos() {
      try {
        const res = await axios.get(`${BASE_URL}/todos`);

        this.list = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async loadTodo(id) {
      try {
        const res = await axios.get(`${BASE_URL}/todos/${id}`);

        this.selectedTodo = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    async createTodo(todoText) {
      try {
        const payload = {
          name: todoText,
          status: "Pending",
        };
        await axios.post(`${BASE_URL}/todos`, payload);
      } catch (error) {
        console.log(error);
      }
    },

    async editTodo(id, todoData) {
      try {
        await axios.put(`${BASE_URL}/todos/${id}`, todoData);
      } catch (error) {
        console.log(error);
      }
    },

    async removeTodo(id) {
      try {
        await axios.delete(`${BASE_URL}/todos/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

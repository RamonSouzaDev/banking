import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menuVisible: false,
  }),
  actions: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }
});

// state.svelte.js
class SidebarState {
  isOpen = $state(true);

  constructor() {
      this.isOpen = true;
  }

  toggle() {
      this.isOpen = !this.isOpen;
  }
}

export const sidebar = new SidebarState();
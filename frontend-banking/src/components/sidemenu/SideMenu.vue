<template>
  <div class="wrapper">
    <aside class="sidebar" :class="{ 'is-open': menuVisible }">
      <div class="sidebar-inner">
        <div class="sidebar-logo">
          <h2 class="sidebar-title">BNB Bank</h2>
          <div class="sidebar-toggle" @click="toggleMenu">
            <i class="ri-menu-line"></i>
          </div>
        </div>
        <ul class="nav-sidebar">
          <li class="nav-item" v-for="item in menu" :key="item.title">
            <a v-if="item.title === 'Logout'" href="#" class="nav-link" @click="handleItemClick(item)">
              <i :class="item.icon"></i> {{ item.title }}
            </a>
            <a v-else :href="item.route" class="nav-link">
              <i :class="item.icon"></i> {{ item.title }}
            </a>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>


<script>
import { defineComponent, computed, ref } from 'vue';
import { useMenuStore } from '@/store/menuStore';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { toast } from 'vue3-toastify'
import { onMounted } from 'vue';

export default defineComponent({
  setup() {
    const menuStore = useMenuStore();
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.get('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
          console.log('teste')
          if (response.data.email == "admin@banking.com") {
            menu.value.push({ title: 'Admin', icon: 'ri-settings-3-line', route: '/admin' });
          }
          menu.value.push({ title: 'Logout', icon: 'ri-logout-box-r-line', action: logout },);
          
        }).catch(error => {
          console.error('Error loading user data:', error);
        });
      }
    });

    const menu = ref([
      { title: 'Balance', icon: 'ri-bank-line', route: '/' },
      { title: 'Incomes', icon: 'ri-arrow-up-line', route: '/incomes' },
      { title: 'Expenses', icon: 'ri-arrow-down-line', route: '/expenses' },
      { title: 'Checks', icon: 'ri-file-list-3-line', route: '/checks' },
      
    ]);

    

    function toggleMenu() {
      menuStore.toggleMenu();
    }

    function logout() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.post('/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            toast.success('Deslogado com sucesso!');
            router.push('/auth');
          })
          .catch(error => {
            console.error('Error during logout:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            toast.error('Logout failed!');
            router.push('/auth');
          });
      }
    }

    function handleItemClick(item) {
      if (item.action) {
        item.action();
      } else {
        router.push(item.route);
      }
    }


    // Computed property to reactively update the sidebar visibility based on store state
    const menuVisible = computed(() => menuStore.menuVisible);

    return {
      menu,
      toggleMenu,
      menuVisible,
      handleItemClick
    };
  }
});
</script>


<style>
.sidebar {
  width: 250px;
  position: fixed;
  top: 0;
  left: -250px;
  /* Hidden by default */
  height: 100%;
  background: #1A76D2;
  transition: all 0.3s ease;
  overflow-y: auto;
  z-index: 1000;
}

.sidebar.is-open {
  left: 0;
  /* Slide in */
}

.sidebar-inner {
  padding: 15px;
}

.sidebar-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}

.sidebar-title {
  color: #fff;
  margin: 0;
}

.sidebar-toggle {
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

.nav-sidebar {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-sidebar .nav-item {
  margin-bottom: 10px;
}

.nav-sidebar .nav-link {
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-sidebar .nav-link i {
  font-size: 18px;
  margin-right: 10px;
}

/* Add responsiveness if needed */
</style>

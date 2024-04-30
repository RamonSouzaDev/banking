import { createApp } from 'vue';
import App from '@/App.vue';
import MainLayout from '@/layouts/Main/MainLayout.vue';
import AuthLayout from '@/layouts/Auth/AuthLayout.vue';
import Dashboard from '@/views/Dashboard.vue';
import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);

const routes = [
  // Dashboard
  {
    path: '/',
    name: 'home',
    component: MainLayout,
    children: [{ name: 'default', path: '/', component: Dashboard }],
  },
  // Auth
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
    children: [{ name: 'login', path: '', component: LoginView }],
  },
  {
    path: '/register',
    name: 'register',
    component: AuthLayout,
    children: [{ name: 'register', path: '', component: RegisterView }],
  },
];

async function setupRoutes() {
  const dynamicRoutes = ['expenses', 'users', 'checks', 'incomes'];
  const token = localStorage.getItem('token');
  const url = `https://ramon-developer-banking.com.ramon-developer.com/api/user`;

  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.email === "admin@banking.com") {
      console.log('User is admin');
      dynamicRoutes.push('admin');
      console.log(dynamicRoutes);
    }
  } catch (error) {
    console.error('Error loading user data:', error);
  }

  dynamicRoutes.forEach((routeName) => {
    routes.push({
      path: '/' + routeName,
      name: routeName,
      component: MainLayout,
      children: [
        {
          name: routeName + '-index',
          path: '/' + routeName,
          component: () => import('@/views/' + routeName.replace('-', '_') + '/IndexView.vue'),
        },
        {
          name: routeName + '-create',
          path: '/' + routeName + '/create',
          component: () => import('@/views/' + routeName.replace('-', '_') + '/CreateView.vue'),
        },
        {
          name: routeName + '-user-details',
          path: '/' + routeName + '/user-details/:userId/check/:checkControlId',
          component: () => import('@/views/' + routeName.replace('-', '_') + '/ApproveView.vue'),
        },
      ],
    });
  });

}

let router;

if (process.env.NODE_ENV !== 'test') {
  router = createRouter({
    history: createWebHistory(),
    routes,
  });

  app.use(router);
  app.mount('#app');
}

export default router;


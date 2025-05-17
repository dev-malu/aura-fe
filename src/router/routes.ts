import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            name: 'login',
            component: () => import('pages/LoginPage.vue'),
          },
          { path: 'signup', name: 'signup', component: () => import('pages/SignupPage.vue') },
        ],
        meta: {
          unauthorized: true,
        },
      },
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/DashPage.vue') },
      { path: 'product', name: 'product', component: () => import('pages/ProductPage.vue') },
      { path: 'category', name: 'category', component: () => import('pages/CategoryPage.vue') },
      {
        path: 'subcategory',
        name: 'subcategory',
        component: () => import('pages/SubCategoryPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

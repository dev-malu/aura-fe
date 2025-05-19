<template>
  <q-select v-model="$model" :options="categories" label="Category" option-label="name" option-value="_id"
    map-options />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import type { Category } from 'src/types';
import { onMounted, ref } from 'vue';

const $q = useQuasar()

const $model = defineModel<Category>()

const categories = ref<Category[]>([])

const fetchCategories = async () => {
  try {
    const response = await api.get('/api/category');
    categories.value = response.data;
  } catch (e) {
    console.log(e);
    $q.notify({ type: 'negative', message: 'Failed to fetch category' });
  }
};

onMounted(fetchCategories)
</script>

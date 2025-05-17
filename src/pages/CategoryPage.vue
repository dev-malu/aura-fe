<template>
  <q-page class="flex justify-center items-center">
    <q-card style="min-width: 30rem; max-width: 90dvw">
      <q-card-section>
        <div class="text-h6">Create Category</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="createCategory">
          <q-input v-model="name" label="Name">
          </q-input>
          <q-btn label="Create" color="primary" type="submit" outline no-caps />
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Existing Categories</div>
        <q-list bordered separator>
          <q-item v-for="category in categories" :key="category._id">
            <q-item-section>
              {{ category.name }}
            </q-item-section>
            <q-item-section side>
              <q-btn flat dense round color="negative" @click="deleteCategory(category._id)"><q-icon
                  name="cancel"></q-icon></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import type { AxiosError } from 'axios';
import { api } from 'src/boot/axios';

const name = ref('');
const $q = useQuasar();
const categories = ref<{ _id: string, name: string }[]>([]);

const fetchCategories = async () => {
  try {
    const response = await api.get('/api/category');
    categories.value = response.data;
  } catch {
    $q.notify({ type: 'positive', message: 'Unable to fetch categories' });
  }
}

const createCategory = async () => {
  try {
    await api.post('/api/category', { name: name.value.trim().toLowerCase() });
    $q.notify({ type: 'positive', message: 'Category created successfully' });
    name.value = '';
    await fetchCategories();
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: (error as AxiosError<{ message: string }>).response?.data?.message || 'Unable to create category'
    });
  }
}

const deleteCategory = async (categoryId: string) => {
  try {
    await api.delete(`/api/category/${categoryId}`);
    $q.notify({ type: 'positive', message: 'Category deleted successfully' });
    await fetchCategories();
  } catch {
    $q.notify({ type: 'negative', message: 'Unable to delete category' });
  }

}

onMounted(fetchCategories)
</script>

<template>
  <q-page class="flex flex-center">
    <q-card bordered style="min-width: 350px;" class="my-card">
      <q-card-section>
        <div class="text-h6">Create SubCategory</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="createSubCategory">
          <q-input label="Name" v-model="name" />
          <q-select label="Sizes" v-model="sizes" use-chips multiple hide-dropdown-icon use-input fill-input
            new-value-mode="add-unique" @new-value="handleNewValue">
            <template v-slot: append>
              <q-btn label="Cancel" color="negative" flat @click.stop.prevent="removeAll" v-if="sizes.length > 0" />
            </template>
          </q-select>
          <q-select label="Categories" v-model="selectedCategory" :options="categories" option-label="name"
            option-value="_id" emit-value map-options filled />
          <div class="row justify-end q-mt-sm">
            <q-btn label="Create" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import type { QSelectProps } from 'quasar';
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const name = ref('');
const sizes = ref<string[]>([]);
const categories = ref<{ _id: string, name: string }[]>([]);
const selectedCategory = ref<string>('');
const $q = useQuasar();

const fetchCategories = async () => {
  try {
    const res = await api.get('/api/category');
    categories.value = res.data;
  } catch (e) {
    console.log('error fetching categories', e);
  }
};


const createSubCategory = async () => {
  try {
    const payload = {
      name: name.value.trim(),
      sizes: sizes.value,
      category: selectedCategory.value
    }
    await api.post('/api/subcategory', payload);
    $q.notify({ type: 'positive', message: 'Suncategory created successfully' });

    name.value = '';
    sizes.value = [];
    selectedCategory.value = '';
  } catch (e) {
    console.log("Couldn't find error", e);
    $q.notify({ type: 'negative', message: 'Failed to create subcategory' });
  }
}

const handleNewValue: QSelectProps['onNewValue'] = (value: string, done) => {
  const size = value.trim().toUpperCase();
  if (size && !sizes.value.includes(size)) {
    done(size);
  }
}


const removeAll = () => {
  sizes.value = [];
}

onMounted(fetchCategories);
</script>

































<!-- <template>
  <q-page class="flex justify-center items-center">
    <q-card style="min-width: 30rem; max-width: 90dvw">
      <q-card-section>
        <div class="text-h6">Create SubCategory</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input v-model="name" label="Name" required />
          <q-select v-model="category" label="Category" required />
          <q-input v-model="sizes" label="Sizes" required />
          <q-btn label="Create" color="primary" outline no-caps type="submit" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const name = ref('');
const category = ref(null);
const sizes = ref('');


</script> -->

<template>
  <q-page class="flex justify-center items-center">
    <q-card style="min-width: 30rem; max-width: 90dvw">
      <q-card-section>
        <div class="text-h6">Create Product</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input v-model="product.title" label="Title" required />
          <div>
            <q-uploader url="http://localhost:4444/upload" label="Upload image" color="purple" square flat bordered
              class="full-width" />
          </div>
          <q-input v-model="product.description" label="Description" type="textarea" />
          <category-select v-model="product.category" @update:model-value="fetchSubcategories" />
          <q-select v-model="product.subcategory" label="SubCategory" :options="subcategories" option-label="name"
            option-value="_id" map-options :disable="!product.category" />
          <div>
            <q-uploader url="http://localhost:4444/upload" label="Upload video" color="purple" square flat bordere
              class="full-width" />
          </div>
          <q-input v-model.number="product.price" label="Price" type="number" />
          <q-input v-model.number="product.stock" label="Stock" type="number" />
          <q-select v-model="product.colors" label="Colors" multiple />
          <q-select v-model="product.sizes" label="Sizes" :options="sizes" :disable="!product.subcategory" multiple
            use-chips hide-dropdown-icon />
          <q-select v-model="product.tags" label="Tags" multiple />
          <div class="row justify-end q-mt-sm" style="margin-top: 50px;">
            <q-btn label="Create" color="primary" outline no-caps />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>

</template>

<script setup lang="ts">
import { api } from 'src/boot/axios';
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import qs from 'qs'
import type { Category, Product, SubCategory } from 'src/types';
import CategorySelect from 'src/components/CategorySelect.vue';

const $q = useQuasar();

const subcategories = ref<SubCategory[]>([]);
const product = ref<Product>({
  _id: undefined as unknown as string,
  title: '',
  imageFiles: [],
  description: '',
  category: undefined as unknown as Category,
  subcategory: undefined as unknown as SubCategory,
  video: '',
  price: 0,
  stock: 0,
  colors: [],
  sizes: [],
  tags: []
});

const sizes = computed(() =>
  subcategories.value.find((v) => v._id === product.value.subcategory?._id)?.sizes || []
);



const fetchSubcategories = async () => {
  if (!product.value.category?._id) {
    subcategories.value = []
    return
  }
  try {
    const response = await api.get('/api/subcategory?' + qs.stringify({
      filter: {
        parent: product.value.category._id
      }
    }));
    subcategories.value = response.data;
  } catch (e) {
    console.log(e);
    $q.notify({ type: 'negative', message: 'Failed to fetch subcategory' });
  }
}
</script>

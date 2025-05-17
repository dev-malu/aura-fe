<template>
  <q-page class="flex justify-center items-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">Create Product</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input v-model="form.title" label="Title" required />
          <q-file v-model="form.imageFiles" label="Image" />
          <q-input v-model="form.description" label="Description" type="textarea" />
          <q-select v-model="form.category" label="Category" />
          <q-select v-model="form.subcategory" label="SubCategory" />
          <q-input v-model="form.video" label="Video" type="url" />
          <q-input v-model.number="form.price" label="Price" type="number" />
          <q-input v-model.number="form.stock" label="Stock" type="number" />
          <q-select v-model="form.colors" label="Colors" />
          <q-select v-model="form.sizes" label="Sizes" />
          <q-select v-model="form.tags" label="Tags" />
        </q-form>
      </q-card-section>

      <q-separator />
      <q-card-section class="column justify-center" style="gap:0.5rem">
        <q-btn label="Create" color="primary" outline no-caps />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  title: '',
  imageFiles: [],
  description: '',
  category: null,
  subcategory: null,
  video: '',
  price: null,
  stock: null,
  colors: [],
  sizes: [],
  tags: []
});



</script>

<template>
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


</script>

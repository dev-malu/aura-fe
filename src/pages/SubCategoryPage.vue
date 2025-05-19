<template>
  <q-page class="flex flex-center column q-gutter-md">
    <q-card bordered style="min-width: 350px;" class="my-card">
      <q-card-section>
        <div class="text-h6">Create SubCategory</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="createSubCategory">
          <q-input label="Name" v-model="subCategory.name" />
          <q-select label="Sizes" v-model="subCategory.sizes" use-chips multiple hide-dropdown-icon use-input fill-input
            new-value-mode="add-unique" @new-value="handleNewValue">
            <template v-slot: append>
              <q-btn label="Cancel" color="negative" flat @click.stop.prevent="removeAll"
                v-if="subCategory.sizes.length > 0" />
            </template>
          </q-select>
          <q-select label="Categories" v-model="subCategory.parent" :options="categories" option-label="name"
            option-value="_id" emit-value map-options filled />
          <div class="row justify-end q-mt-sm">
            <q-btn label="Create" type="submit" color="primary" no-caps />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <div class="q-pa-md " style="width: 550px">
      <q-table :rows="subcategories" :columns="columns">
        <template #body-cell-sizes="props">
          <q-td :props="props">
            <q-chip :label="size" v-for="size of props.row.sizes" :key="size" />
          </q-td>
        </template>
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn icon="delete" flat round color="negative" @click="deleteSubCategory(props.row)" />
          </q-td>
        </template>
        <template #bottom>
          <div></div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import type { QSelectProps, QTableProps } from 'quasar';
import { api } from 'src/boot/axios';
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

type Category = { _id: string, name: string }
type SubCategory = { _id: string, name: string, parent: Category, sizes: string[] }

const categories = ref<Category[]>([]);
const subcategories = ref<SubCategory[]>([]);
const subCategory = ref<SubCategory>({
  _id: undefined as unknown as string,
  name: '',
  parent: undefined as unknown as Category,
  sizes: []
})
const columns = ref<QTableProps['columns']>([
  {
    field: "name",
    label: "Name",
    name: 'name'
  },
  {
    field: "parent",
    label: "Category",
    name: "parent",
    format(val) {
      return val.name
    }
  },
  {
    field: "sizes",
    label: "Sizes",
    name: "sizes",
    align: "center"
  },
  {
    label: "Actions",
    field: "actions",
    name: "actions"
  }
])

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

    await api.post('/api/subcategory', subCategory.value);
    $q.notify({ type: 'positive', message: 'Subcategory created successfully' });
    subCategory.value = {
      _id: undefined as unknown as string,
      name: '',
      parent: undefined as unknown as Category,
      sizes: []
    };
    await fetchSubCategories();
  } catch (e) {
    console.log("Couldn't find error", e);
    $q.notify({ type: 'negative', message: 'Failed to create subcategory' });
  }
}

const handleNewValue: QSelectProps['onNewValue'] = (value: string, done) => {
  const size = value.trim().toUpperCase();
  if (size && !subCategory.value.sizes.includes(size)) {
    done(size);
  }
}

const fetchSubCategories = async () => {
  try {
    const response = await api.get('/api/subcategory');
    subcategories.value = response.data;
  } catch {
    $q.notify({ type: 'positive', message: 'Unable to fetch subcategories' });
  }
}

const deleteSubCategory = async (data: SubCategory, confirmed = false) => {
  if (!confirmed) {
    $q.dialog({
      title: "Confirmation",
      message: "Are you sure you want to delete this subcategory?",
      ok: {
        color: "negative",
        label: "Delete",
        noCaps: true
      },
      cancel: {
        label: "Cancel",
        color: 'grey-7',
        noCaps: true
      },
    }).onOk(() => {
      deleteSubCategory(data, true).catch(() => undefined)
    })

    return
  }

  await api.delete('/api/subcategory/' + data._id)
  await fetchSubCategories()
}

const removeAll = () => {
  subCategory.value.sizes = [];
}

onMounted(async () => {
  await fetchCategories();
  await fetchSubCategories();
});

</script>

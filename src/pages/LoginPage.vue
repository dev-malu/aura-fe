<template>
  <q-page class="flex justify-center items-center">
    <q-card>
      <q-card-section>
        <div class="text-h6">Login</div>
        <div class="text-subtitle2">Login with your account</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="login">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input v-model="email" type="email" lazy-rules :rules="emailRules" outlined dense label="Enter email" />
            </div>
            <div class="col-12">
              <q-input v-model="password" lazy-rules :rules="passwordRules" type="password" outlined dense
                label="Enter password">
                <template #append>
                  <q-icon name="visibility" />
                </template>
              </q-input>
            </div>
            <div class="col-12 flex justify-center">
              <q-btn label="Login" type="submit" color="primary" unelevated no-caps icon-right="login" />
            </div>
          </div>
        </q-form>
      </q-card-section>

      <q-separator />
      <q-card-section class="column justify-center" style="gap:0.5rem">
        <q-btn label="Create Account" to="/signup" color="primary" outline no-caps />
        <q-btn label="Forgot password?" color="primary" flat no-caps />
      </q-card-section>
    </q-card>
  </q-page>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

const email = ref(import.meta.env.VITE_DEV_EMAIL || '');
const password = ref(import.meta.env.VITE_DEV_PASSWORD || '');

const router = useRouter();
const $q = useQuasar();

const login = async () => {
  try {
    const response = await api.post(`/api/user/login`, {
      email: email.value,
      password: password.value
    });

    const { token } = response.data;
    localStorage.setItem('token', token);
    $q.notify({
      type: 'positive',
      message: 'Login successful'
    });

    await router.push({ name: 'dashboard' });
  } catch (error) {
    $q.notify({
      type: "negative",
      message: (error as AxiosError<{ message: string }>).response?.data?.message || 'Login failed'
    })
  }
}

const emailRules = [
  (val: string) => !!val || 'Email is required',
  (val: string) => /.+@.+\..+/.test(val) || 'Email must be valid'
];
const passwordRules = [
  (val: string) => !!val || 'Password is required',
  (val: string) => val.length >= 6 || 'Password should contain atleast 6 characters'
];
</script>

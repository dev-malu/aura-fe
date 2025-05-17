<template>
  <q-page class="flex justify-center items-center">
    <q-card bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Sign up</div>
        <div class="text-subtitle2">Create your account</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form @submit.prevent="signup">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input type="email" lazy-rules :rules="[validateEmail]" outlined v-model="email" label="Enter email" />
            </div>
            <div class="col-12">
              <q-input type="text" lazy-rules :rules="usernameRules" outlined v-model="username"
                label="Enter username" />
            </div>
            <div class="col-12">
              <q-input type="password" lazy-rules :rules="passwordRules" outlined v-model="password"
                label="Enter password" />
            </div>
            <div class="col-12 flex justify-center">
              <q-btn type="submit" color="primary" label="Signup" unelevated icon-right="login" />
            </div>
          </div>
        </q-form>
      </q-card-section>
      <q-separator />
      <q-card-section class="column items-center">
        <div class="text-subtitle2 ">Already an user? <router-link to="/" color="primary">Login</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { AxiosError } from 'axios';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';

const email = ref(import.meta.env.VITE_DEV_EMAIL || '');
const password = ref(import.meta.env.VITE_DEV_PASSWORD || '');
const username = ref(import.meta.env.VITE_DEV_USERNAME || '');

const router = useRouter();
const $q = useQuasar();

const signup = async () => {
  try {
    const response = await api.post(`/api/user/signup`, {
      email: email.value,
      username: username.value,
      password: password.value
    });

    const { token } = response.data;
    localStorage.setItem('token', token);
    $q.notify({
      type: "positive",
      message: 'Signup successfull'
    });
    await router.push('/dashboard');
  } catch (error) {
    $q.notify({
      type: "negative",
      message: (error as AxiosError<{ message: string }>).response?.data?.message || 'Signup failed'
    });
  }

};

const validateEmail = (email: string) => {
  if (!email) {
    return 'Email is required'
  }

  if (!/.+@.+\..+/.test(email)) {
    return 'Email is invalid'
  }

  return true
}

const passwordRules = [
  (val: string) => !!val || 'Password is required',
  (val: string) => val.length >= 6 || 'Password should contain atleast 6 characters'
];

const usernameRules = [
  (val: string) => !!val || 'Username is required',
];
</script>

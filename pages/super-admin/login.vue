<template>
    <div>
        <div>
            <div class="py-12 px-4 sm:px-6 lg:px-8">
                <div class="mb-7">
                  <nuxt-img class="mx-auto h-32 w-auto" src="/public-img/escuela.png" alt="Your Company" />
                  <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 primary-heading">Escuela Admin</h2>   
                </div>
                <div class="flex min-h-full items-center justify-center">
                  <div class="shadow sm:overflow-hidden sm:rounded-md w-full max-w-md space-y-8">
                    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                      
                      <div v-if="errorMessage" class="flex items-center rounded shadow-md overflow-hidden max-w-xl relative dark:bg-red-600 dark:text-gray-100">
                        <div class="self-stretch flex items-center px-3 flex-shrink-0 dark:bg-red-700 dark:text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-8 w-8">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div class="p-4 flex-1">
                          <h3 class="text-xl font-bold">Error</h3>
                          <p class="text-sm dark:text-white">{{ errorMessage }}
                          </p>
                        </div>
                        <button class="absolute top-2 right-2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 p-2 rounded cursor-pointer">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                          </svg>
                        </button>
                      </div>
                      
                      
                      <form class="mt-8 space-y-6" @submit.prevent="loginUser" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div class="-space-y-px rounded-md shadow-sm">
                          <div class="mb-3">
                            <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                            <div class="mt-1">
                                <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="example@gmail.com" />
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <div class="mt-1">
                                <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="*********" />
                            </div>
                          </div>
                        </div>
                
                        <div>
                          <button :disabled="loading" type="submit" class="group relative flex justify-center button-primary w-full">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockClosedIcon v-if="!loading" class="h-5 w-5 text-yellow-300 group-hover:text-yellow-100" aria-hidden="true" />
                              <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            </span>
                            Admin Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
          </div>
    </div>
</template>

<script setup lang="ts">
  import { LockClosedIcon } from '@heroicons/vue/24/outline';

  import { useUserStore, UserInfo } from "~/stores/user";
  
  const user = useUserStore();
  const router = useRouter();
  // data model
  const email = ref('');
  const password = ref('');
  const loading = ref(false);
  const errorMessage = ref('');

  async function loginUser() {

    loading.value = true;

    const { data, pending, refresh, error } = await user.loginSuperAdminUser({email: email.value, password: password.value});
    
    let userData = null;

    if (data.value) {
      userData = data.value.user as UserInfo | null;
    }
    
    loading.value = false;

    if (error.value) {

      errorMessage.value = error.value.data.message;

    } else if (userData) {

      errorMessage.value = "";

      if (userData.user_type == 'admin') {
        router.push('/admin/dashboard')
      } else if (userData.user_type == 'teacher') {
        router.push('/teacher/dashboard')
      } else if (userData.user_type == 'student') {
        router.push('/student/dashboard')
      } else if (userData.user_type == 'super-admin') {
        router.push('/super-admin/dashboard')
      }

    }
 
  }

  onMounted(async () => {
    await nextTick(async () => {
      await user.authUser();
    })
  })

    
</script>
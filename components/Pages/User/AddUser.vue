<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

        <form action="" method="post" @submit.prevent="addUser">
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
              
                <div class="col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12">
                    <div class="overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                        <div class="bg-white py-5 p-6">
                            <div>
                                <!-- Field Input -->
                                <FormInput :models="models" :forms="useUser.getForms" />
                            </div>
                            <div class="mt-5 flex justify-end">
                                <button type="submit" class="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span class="pr-3 item-center">
                                        <Icon v-if="!loading" name="bi:plus-lg" class="h-5 w-5 text-white" />
                                        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                    </span>
                                    Add User
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>

    </NuxtLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useUserStore } from '~~/stores/user';
    import {uploadFile} from '~~/composable/custom';
    import FormInput from '~~/components/form/FormInput.vue';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Add User",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Users', link: `/${props.accessType}/users`},
            {name: 'Add User', link: '#'}
        ]
    };

    const useUser =  useUserStore();

    const errors = ref([] as String[]);
    const success = ref('');
    const loading = ref(false);

    const {models} = storeToRefs(useUser);

    function addUser() {
        loading.value = true;
        useUser.store(models.value).then(res => {
            errors.value = [];
            success.value = '';
            loading.value = false;

            if (res.error.value) {
                console.log(res.error.value.data);
                for (const key in res.error.value.data) {
                    if (Object.hasOwnProperty.call(res.error.value.data, key)) {
                        errors.value.push(res.error.value.data[key][0] as string);
                    }
                }
            } else if (res.data.value) {
                success.value = 'Successfully created user';
                const school_id = models.value.school_id
                models.value = {
                    name: "",
                    email: "",
                    school_id: school_id,
                    password: "",
                    user_type: "",
                }
            }
        })
    }

    
</script>
<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

        <form action="" method="post" @submit.prevent="addSchoolYear">
            <div class="grid grid-col-1">
                <div class="shadow sm:overflow-hidden sm:rounded-md w-full">
                    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                            <div class="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">
                                <label class="block text-sm font-medium text-gray-700">Year From:</label>
                                <input v-model="from" type="number" placeholder="Ex. 2022"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>
                            <div class="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">
                                <label class="block text-sm font-medium text-gray-700">Year To:</label>
                                <input v-model="to" type="number" placeholder="Ex. 2023"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>

                            <div class="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">
                                <div class="flex items-center ml-2">
                                    <input v-model="is_active" id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                                    <label for="remember-me" class="ml-2 block text-sm font-medium text-gray-700">Is Active?</label>
                                  </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-100 px-4 py-4 text-right sm:px-6 flex justify-end">
                        <button type="submit" class="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <span class="pr-3 item-center">
                                <Icon v-if="!loading" name="bi:plus-lg" class="h-5 w-5 text-white" />
                                <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                            </span>
                            Add School Year
                        </button>
                    </div>
                </div>
            </div>
        </form>

    </NuxtLayout>
</template>

<script setup lang="ts">
    import { useSchoolYearStore } from '~~/stores/schoolYear';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Add School Year",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'School Year', link: `/${props.accessType}/school-year`},
            {name: 'Add School Year', link: '#'}
        ]
    };

    const schoolYear = useSchoolYearStore();

    const loading = ref(false);

    const errors = ref([] as String[]);
    const success = ref('');

    const from = ref('');
    const to = ref('');
    const is_active = ref(false);

    function addSchoolYear() {
        loading.value = true;
        schoolYear.store({from: from.value, to: to.value, is_active: is_active.value}).then(res => {
            errors.value = [];
            success.value = '';
            loading.value = false;

            if (res.error.value) {
                for (const key in res.error.value.data.errors) {
                    if (Object.hasOwnProperty.call(res.error.value.data.errors, key)) {
                        errors.value.push(res.error.value.data.errors[key][0] as string);
                    }
                }
            } else if (res.data.value) {
                success.value = 'Successfully added school year';
                from.value = '';
                to.value = '';
                is_active.value = false;
            }
        });

    }
</script>
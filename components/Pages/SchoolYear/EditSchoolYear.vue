<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

        <template v-if="!pageLoading">
            <template v-if="!pageError">
                <form action="" method="post" @submit.prevent="saveSchoolYear">
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
                                        <Icon v-if="!loading" name="bi:save" class="h-5 w-5 text-white" />
                                        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                    </span>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </template>
            <template v-else>
                <PageError :title="`School Year Not Found.`" :link="'/admin/school-year'"></PageError>
            </template>
        </template>
        <template v-else>
           <div class="w-full flex justify-center items-center mt-40">
            <div role="status text-center">
                <svg aria-hidden="true" class="mb-4 text-gray-200 animate-spin dark:text-gray-300 fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="mt-4"><strong>Loading...</strong></span>
            </div>
           </div>
        </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { SchoolYear, useSchoolYearStore } from '~~/stores/schoolYear';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Edit School Year",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'School Year', link: `/${props.accessType}/school-year`},
            {name: 'Edit School Year', link: '#'}
        ]
    };

    const schoolYear = useSchoolYearStore();

    const loading = ref(false);

    const errors = ref([] as String[]);
    const success = ref('');
    const pageError = ref(false);
    const pageLoading = ref(false);

    const from = ref('');
    const to = ref('');
    const is_active = ref(false);

    function saveSchoolYear() {
        loading.value = true;
        schoolYear.update({id: props.id, from: from.value, to: to.value, is_active: is_active.value}).then(res => {
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
                success.value = 'Successfully saved changes.';
            }
        });
    }

    onMounted(() => {

        pageLoading.value = true;

        schoolYear.show(props.id).then(res => {

            pageLoading.value = false;

            const data = res.data.value as SchoolYear | null

            if (data && Object.keys(data).length > 0) {
                pageError.value = false;
                from.value = data.from;
                to.value = data.to;
                is_active.value = data.is_active == '1' ? true : false;

            } else {
                pageError.value = true;
            } 
        });
    })


</script>
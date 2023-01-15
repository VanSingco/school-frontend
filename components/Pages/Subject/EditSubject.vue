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
                <form action="" method="post" @submit.prevent="updateSubject">
                    <div class="grid grid-col-1">
                        <div class="shadow sm:overflow-hidden sm:rounded-md w-full">
                            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                                    <div class="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">
                                        <label class="block text-sm font-medium text-gray-700">Subject Name:</label>
                                        <input v-model="name" type="text" placeholder="Enter Subject"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">
                                        <label class="block text-sm font-medium text-gray-700">Subject Type:</label>
                                        <select v-model="type" name="" id="" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-3 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option value="major">Major</option>
                                            <option value="minor">Minor</option>
                                        </select>
                                    </div>
                                    <div class="col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12">
                                        <label class="block text-sm font-medium text-gray-700">Parent Subject:</label>
                                        <select v-model="parent_subject_id" name="" id="" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-3 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option value=""></option>
                                            <option v-for="sub in subject.getSubjects" :value="sub.id">
                                                {{ sub.name }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4">
                                        <label class="block text-sm font-medium text-gray-700">Written Work (%):</label>
                                        <input v-model="ww" type="number"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4">
                                        <label class="block text-sm font-medium text-gray-700">Performance Task (%):</label>
                                        <input v-model="pt" type="number"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                    </div>
                                    <div class="col-span-1 sm:col-span-1 md:col-span-4 lg:col-span-4">
                                        <label class="block text-sm font-medium text-gray-700">Quarterly Assisment (%):</label>
                                        <input v-model="qa" type="number"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
                                    Save Change
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </template>
            <template v-else>
                <PageError :title="`Subject Not Found.`" :link="'/admin/subjects'"></PageError>
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
    import { useSubjectStore, Subject } from '~~/stores/subject';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Edit Subject",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Subjects', link: `/${props.accessType}/subjects`},
            {name: 'Edit Subject', link: '#'}
        ]
    };

    const subject = useSubjectStore();

    const name = ref('');
    const type = ref('minor');
    const parent_subject_id = ref('');
    const ww = ref(0);
    const pt = ref(0);
    const qa= ref(0);
    const loading = ref(false);

    const errors = ref([]);
    const success = ref('');
    const pageError = ref(false);
    const pageLoading = ref(false);


    function updateSubject() {
        loading.value = true;
        
        subject.update({
            id: props.id,
            name: name.value, 
            type: type.value, 
            parent_subject_id: parent_subject_id.value,
            ww: ww.value, 
            pt: pt.value, 
            qa: qa.value 
        }).then(res => {
            errors.value = [];
            success.value = '';
            loading.value = false;

            if (res.error.value) {
                for (const key in res.error.value.data) {
                    if (Object.hasOwnProperty.call(res.error.value.data, key)) {
                        errors.value.push(res.error.value.data[key][0] as never);
                    }
                }
            } else if (res.data.value) {
                success.value = 'Successfully saved changes.';
            }

        });
    }

    onMounted(() => {

        subject.list({search: '', orderBy: 'DESC', paginate: false});

        pageLoading.value = true;

        subject.show(props.id).then(res => {

            pageLoading.value = false;

            const data = res.data.value as Subject | null

            if (data && Object.keys(data).length > 0) {
                pageError.value = false;

                name.value = data.name;
                type.value = data.type;
                parent_subject_id.value = data.parent_subject_id as string;
                ww.value = data.ww;
                pt.value = data.pt;
                qa.value = data.qa;

            } else {
                pageError.value = true;
            }

            

        });
    })


</script>
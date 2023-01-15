<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
       

        <form action="" method="post" @submit.prevent="addSubject">
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
                                <Icon v-if="!loading" name="bi:plus-lg" class="h-5 w-5 text-white" />
                                <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                            </span>
                            Add Subject
                        </button>
                    </div>
                </div>
            </div>
        </form>
        
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { useSubjectStore } from '~~/stores/subject';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Add Subject",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Subjects', link: `/${props.accessType}/subjects`},
            {name: 'Add Subject', link: `/${props.accessType}/subjects/add`}
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

    const errors = ref([] as String[]);
    const success = ref('');

    function addSubject() {
        loading.value = true;
        
        subject.store({
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
                        errors.value.push(res.error.value.data[key][0] as string);
                    }
                }
            } else if (res.data.value) {
                success.value = 'Successfully added subject';
                name.value = '';
                type.value = '';
                parent_subject_id.value = '';
                ww.value = 0;
                pt.value = 0;
                qa.value = 0;

            }

        });
    }

    onMounted(() => {
        subject.list({search: '', orderBy: 'DESC', paginate: false});
    })


</script>
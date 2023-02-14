<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="` ${section.getSection ? section.getSection.name : ''} - ${section.getSection && section.getSection.grade_level ? section.getSection.grade_level.name : ''} Students`">
            <a :href="`#`" @click="openAddStudent = true" class="group relative flex justify-center button-primary">
                <span class="pr-3 item-center">
                    <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                </span>
                Add Student
            </a>
        </Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

            <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Section Not Found" :link="`/${accessType}/sections`">
                <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                    <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 py-2">
                        <div class="overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                            <div class="bg-white py-5 p-6">
                                <form action="" method="post" @submit.prevent="searchSectionStudent">
                                    <div class="grid grid-cols-1 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Search</label>
                                            <input v-model="search" type="text" placeholder="Search Section"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Order By</label>
                                            <select v-model="orderBy" name="" id="" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-3 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                                <option value="DESC">Latest</option>
                                                <option value="ASC">Oldest</option>
                                            </select>
                                        </div>
                                        <div>
                                            <button  type="submit" class="w-full group relative flex justify-center button-primary">
                                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <span v-if="!search_loading" class="pr-3 item-center">
                                                        <Icon name="bi:search" class="h-5 w-5 text-yellow-300 group-hover:text-yellow-100" />
                                                    </span>
                                                    <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                  </span>
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                    <div class="col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-9">
                        <TableList 
                            v-slot="{row}" 
                            :loading="section_student_loading" 
                            :bodyData="sectionStudent.getSectionStudentData" 
                            :columns="columns" 
                            @selectedPage="pageSelected">
                            <td class="whitespace-nowrap py-4 pr-2 text-sm font-semibold text-gray-700 sm:pl-6">
                                <nuxt-img class="w-10 h-10 rounded-lg shadow sm:rounded-md border" style="object-fit: cover;" :src="row.student && row.student.id_picture ? `${api_url + row.student.id_picture}` : '/public-img/default_logo.png'" />
                            </td>
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-700 truncate">
                                <nuxt-link :to="`/${accessType}/students/profile/${row.student.id}`">{{truncateString(`${row.student.first_name} ${row.student.middle_name} ${row.student.last_name} ${row.student.suffix_name ? row.student.suffix_name : ''}`, 30)}}</nuxt-link>
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row.student.number}}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row.student.lrn ? row.lrn : 'N/A'}}</td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row.student.status}}</td>
                            <td class="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                                <button @click="isOpenDeleteStudent(row.id)" type="button" class="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                    <Icon name="bi:trash3" class="h-5 w-5 text-white"  />
                                </button>
                            </td>
                        </TableList>
                    </div>
                </div>
            </PageLoading>

            <TransitionRoot
                :show="openAddStudent"
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <Dialog @close="setOpenAddStudent" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel class="w-full max-w-lg rounded bg-white p-5">
                            <DialogTitle class="text-xl font-extrabold tracking-tight text-slate-800 text-center">Add Student</DialogTitle>
                            <p class="text-center mb-4">Add multiple students to this section</p>

                            <AlertErrorSuccess  
                                :success="success" 
                                :errors="errors"
                                @closeError="errors = []"
                                @closeSuccess="success = ''"/>

                            <div class="mt-5">
                                <div class="mb-3">
                                    <FormInput :models="models" :forms="sectionStudent.getForms" />
                                </div>
                                <button @click="addStudents" type="submit" class="group relative flex justify-center button-primary w-full">
                                    <span class="pr-3 item-center">
                                        <Icon v-if="!loading" name="bi:plus-lg" class="h-5 w-5 text-white" />
                                        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                    </span>
                                    Add Students
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </TransitionRoot>

            <TransitionRoot
                :show="openRemoveStudent"
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <Dialog @close="setOpenRemoveStudent" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex items-center justify-center p-5">
                        <DialogPanel class="w-full max-w-lg rounded bg-white p-5">
                        
                        <div class="flex justify-center">
                            <div class="text-center">
                               <div class="flex justify-center">
                                    <img style="width: 150px;" src="/public-img/delete.png" alt="">
                               </div>
                                <h4 class="mt-2 text-md font-extrabold tracking-tight text-slate-800">Are you sure you want to remove this student from this section?</h4>
                                <div class="flex justify-center mt-5">
                                    <a @click="openRemoveStudent = false" class="mx-2 group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-3 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" :href="`#`">Cancel</a>
                                    <button @click="deleteStudent" type="submit" class="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                        <span class="pr-3 item-center">
                                            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                              </svg>
                                        </span>
                                        Confirm Remove Student
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                     
                        <!-- ... -->
                        </DialogPanel>
                    </div>
                </Dialog>
            </TransitionRoot>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { Section, useSectionStore } from '~~/stores/section';
    import { useSectionStudentStore } from '~~/stores/sectionStudent';
    import { truncateString } from '~~/composable/custom';
    import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Section Students",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Sections', link: `/${props.accessType}/sections`},
            {name: 'Section Students', link: '#'}
        ]
    };

    const openAddStudent = ref(false);
    const openRemoveStudent = ref(false);

    const section = useSectionStore();
    const config = useRuntimeConfig();
    const api_url = config.public.apiBase;
    
    const errors = ref([] as String[]);
    const success = ref('');
    const pageError = ref(false);
    const pageLoading = ref(false);
    

    const search_loading = ref(false);

    const search = ref('');

    const orderBy = ref('DESC');

    const page = ref(1);

    const section_student_loading = ref(false);

    const sectionStudent = useSectionStudentStore();

    const {models} = storeToRefs(sectionStudent);

    const columns = ['', 'Name', 'Number', 'LRN', 'Status', 'Actions']

    function setOpenAddStudent(value: any) {
        openAddStudent.value = value;
    }

    function setOpenRemoveStudent(value: any) {
        openRemoveStudent.value = value;
    }

    

    const loading = ref(false);
    const delete_student_id = ref('');
    const delete_loading = ref(false);

    function isOpenDeleteStudent(id: string) {
        delete_student_id.value = id;
        openRemoveStudent.value = true;
    }

    function deleteStudent() {
        delete_loading.value = false;
        sectionStudent.delete(delete_student_id.value).then(res => {
            success.value = "Successfully removed the student from this section."
            openRemoveStudent.value = false;

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        })
    }

    function addStudents(){
        loading.value = true;

        let student_ids = [] as string[];
        models.value.student_ids.map((item: any) => student_ids.push(item.value))
        models.value.student_id = student_ids;
        if (models.value.student_id.length == 0) {
            errors.value = ['Please select a students'];
            loading.value = false;
        } else {
            sectionStudent.store(models.value).then(res => {
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
                    errors.value = [];
                    success.value = 'Successfully added students on this section';
                    models.value.student_id = [];
                    models.value.student_ids = [];

                    openAddStudent.value = false;

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            })
        }
    }

    function pageSelected(url: string | null) {
        if(url) {
            const pageNumber = parseInt(url.split('=')[1]);
            page.value = pageNumber;
            fetchSectionStudents();
        }
    }

    function searchSectionStudent() {
        search_loading.value = true;
        fetchSectionStudents();
    }

    function fetchSectionStudents() {
        section_student_loading.value = true;
        sectionStudent.list({id: props.id, search: search.value, orderBy: orderBy.value, page: page.value, paginate: true, school_id: null}).then((res) => {
            section_student_loading.value = false;
            search_loading.value = false;
        });
    }


    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            fetchSectionStudents();

            section.show(props.id).then(res => {

                pageLoading.value = false;
                const data = res.data.value as Section | null

                if (data && Object.keys(data).length > 0) {
                    models.value.grade_level_id = data.grade_level_id
                    models.value.section_id = data.id as any
                    pageError.value = false;
                } else {
                    pageError.value = true;
                } 
            });
        });
    })


</script>
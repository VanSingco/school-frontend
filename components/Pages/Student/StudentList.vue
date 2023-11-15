<template>
    <NuxtLayout :name="accessType">
        <div>
            <Header :breadcrumbs="header.breadcrumbs" :title="header.title">
                <nuxt-link :to="`/${accessType}/students/add`" class="group relative flex justify-center button-primary">
                    <span class="pr-3 item-center">
                        <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                    </span>
                    Add Student
                </nuxt-link>
            </Header>
           
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 py-2">
                    <div class="overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                        <div class="bg-white py-5 p-6">
                            <form action="" method="post" @submit.prevent="searchStudent">
                                <div class="grid grid-cols-1 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Search</label>
                                        <input v-model="search" type="text" placeholder="Search Student"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
                        :loading="student_loading" 
                        :bodyData="student.getStudentData" 
                        :columns="columns" 
                        @selectedPage="pageSelected">
                        <td class="whitespace-nowrap py-4 pr-2 text-sm font-semibold text-gray-700 sm:pl-6">
                            <nuxt-img class="w-10 h-10 rounded-lg shadow sm:rounded-md border" style="object-fit: cover;" :src="row.id_picture ? `${api_url + row.id_picture}` : '/public-img/default_logo.png'" />
                        </td>
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-700 truncate"> {{truncateString(`${row.first_name} ${row.middle_name} ${row.last_name} ${row.suffix_name ? row.suffix_name : ''}`, 30)}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row.number}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row.lrn ? row.lrn : 'N/A'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row.grade_level ? row.grade_level.name : 'N/A'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row.status}}</td>
                        <td class="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton class="text-gray-500">
                                        <Icon name="bi:three-dots-vertical" size="15" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem>
                                            <nuxt-link :to="`/${accessType}/students/profile/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                                View Profile
                                            </nuxt-link>
                                        </MenuItem>
                                        <MenuItem>
                                            <nuxt-link :to="`/${accessType}/students/edit/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                                Edit Student
                                            </nuxt-link>
                                        </MenuItem>
                                        <MenuItem>
                                            <nuxt-link :to="`/${accessType}/students/delete/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                                Delete Student
                                            </nuxt-link>
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </td>
                    </TableList>
                </div>
            </div>
            
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
    import { truncateString } from '~~/utils/custom';
    import { useStudentStore } from '~~/stores/student';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Student List",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Students', link: `/${props.accessType}/students`}
        ]
    };

    const config = useRuntimeConfig();
    const api_url = config.public.apiBase;
    const base_url = config.public.baseUrl;

    const search_loading = ref(false);
    const search = ref('');
    const orderBy = ref('DESC');
    const page = ref(1);

    const student_loading = ref(false);
    const student = useStudentStore();
    const columns = ['', 'Name', 'Number', 'LRN', 'Grade Level', 'Status', 'Actions']

    function pageSelected(url: string | null) {
        if(url) {
            const pageNumber = parseInt(url.split('=')[1]);
            page.value = pageNumber;
            fetchStudent();
        }
    
    }

    function searchStudent() {
        search_loading.value = true;
        fetchStudent();
    }

    function fetchStudent() {
        student_loading.value = true;
        student.list({search: search.value, orderBy: orderBy.value, page: page.value, paginate: true, school_id: null, grade_level_id: null}).then((res) => {
            student_loading.value = false;
            search_loading.value = false;
        });
    }

    onMounted(async () => {
        await nextTick(async () => {
            fetchStudent();
        })
    })

</script>~~/utils/custom
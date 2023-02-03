<template>
    <NuxtLayout :name="accessType">
        <div>
            <Header :breadcrumbs="header.breadcrumbs" :title="header.title">
                <nuxt-link :to="`/${props.accessType}/school-year/add`" class="group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span class="pr-3 item-center">
                        <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                    </span>
                    Add School Year
                </nuxt-link>
            </Header>
           
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 py-2">
                    <div class="overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                        <div class="bg-white py-5 p-6">
                            <form action="" method="post" @submit.prevent="searchSchoolYear">
                                <div class="grid grid-cols-1 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700">Order By</label>
                                        <select v-model="orderBy" name="" id="" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-3 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                                            <option value="DESC">Latest</option>
                                            <option value="ASC">Oldest</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button  type="submit" class="w-full group relative flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span v-if="!searchLoading" class="pr-3 item-center">
                                                    <Icon name="bi:search" class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
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
                        :loading="schoolYearLoading" 
                        :bodyData="schoolYear.getSchoolYearData" 
                        :columns="columns" 
                        @selectedPage="pageSelected">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-700 sm:pl-6">{{row.school_year}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <template v-if="row.is_active == '1'">
                                <Icon name="flat-color-icons:checkmark" size="20" />
                            </template>
                            <template v-else>
                                <Icon name="flat-color-icons:cancel" size="20" />
                            </template>
                        </td>
                       
                        <td class="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                            <Menu as="div" class="relative ml-3 w-5">
                                <div>
                                    <MenuButton class="text-gray-500">
                                        <Icon name="bi:three-dots-vertical" size="15" />
                                    </MenuButton>
                                </div>
                                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                                    <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem>
                                            <nuxt-link :to="`/${accessType}/school-year/edit/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                                Edit School Year
                                            </nuxt-link>
                                        </MenuItem>
                                        <MenuItem>
                                            <nuxt-link :to="`/${accessType}/school-year/delete/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                                Delete School Year
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
    import { useSchoolYearStore } from '~~/stores/schoolYear';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "School Year List",
        breadcrumbs: [
            {name: 'Dashboard', link:`/${props.accessType}/dashboard`},
            {name: 'School Year', link: `/${props.accessType}/school-year`}
        ]
    };

    const searchLoading = ref(false);
    const orderBy = ref('DESC');
    const page = ref(1);

    const schoolYearLoading = ref(false);
    const schoolYear = useSchoolYearStore();
    const columns = ['Schoo Year', 'Active', 'Actions']

    function pageSelected(url: string | null) {
        if(url) {
            const pageNumber = parseInt(url.split('=')[1]);
            page.value = pageNumber;
            fetchSchoolYear();
        }
    
    }

    function searchSchoolYear() {
        searchLoading.value = true;
        fetchSchoolYear();
    }

    function fetchSchoolYear() {
        schoolYearLoading.value = true;
        schoolYear.list({orderBy: orderBy.value, page: page.value, paginate: true, school_id: null}).then((res) => {
            schoolYearLoading.value = false;
            searchLoading.value = false;
        });
    }

    onMounted(async () => {
        await nextTick(() => {
            fetchSchoolYear();
        })
    })
</script>
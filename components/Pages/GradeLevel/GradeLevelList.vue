<template>
    <NuxtLayout :name="accessType">
        <div>
            <Header :breadcrumbs="header.breadcrumbs" :title="header.title">
                <nuxt-link :to="`/${accessType}/grade-level/add`" class="group relative flex justify-center button-primary">
                    <span class="pr-3 item-center">
                        <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                    </span>
                    Add Grade Level
                </nuxt-link>
            </Header>
           
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 py-2">
                    <div class="overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                        <div class="bg-white py-5 p-6">
                            <form action="" method="post" @submit.prevent="searchGradeLevel">
                                <div class="grid grid-cols-1 gap-4">
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
                                                <span v-if="!searchLoading" class="pr-3 item-center">
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
                        :loading="gradeLevelLoading" 
                        :bodyData="gradeLevel.getGradeLevelData" 
                        :columns="columns" 
                        @selectedPage="pageSelected">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-700 sm:pl-6">{{row.name}}</td>
                        
                       
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
                                            <nuxt-link :to="`/${accessType}/grade-level/edit/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                                Edit Grade Level
                                            </nuxt-link>
                                        </MenuItem>
                                        <MenuItem>
                                            <nuxt-link :to="`/${accessType}/grade-level/delete/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                                Delete Grade Level
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
    import { useGradeLevelStore } from '~~/stores/gradeLevel';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Grade Level List",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Grade Level', link: `/${props.accessType}/grade-level`}
        ]
    };


    const searchLoading = ref(false);
    const orderBy = ref('DESC');
    const page = ref(1);

    const gradeLevelLoading = ref(false);
    const gradeLevel = useGradeLevelStore();
    const columns = ['Grade Level', 'Actions']

    function pageSelected(url: string | null) {
        if(url) {
            const pageNumber = parseInt(url.split('=')[1]);
            page.value = pageNumber;
            fetchGradeLevel();
        }
    
    }

    function searchGradeLevel() {
        searchLoading.value = true;
        fetchGradeLevel();
    }

    function fetchGradeLevel() {
        gradeLevelLoading.value = true;
        gradeLevel.list({orderBy: orderBy.value, page: page.value, paginate: true, school_id: null}).then((res) => {
            gradeLevelLoading.value = false;
            searchLoading.value = false;
        });
    }

    onMounted(async () => {
        await nextTick(async () => {
            fetchGradeLevel();
        })
    })

</script>
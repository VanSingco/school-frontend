<template>
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
        <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 py-2">
            <div class="overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                <div class="bg-white py-5 p-6">
                    <form action="" method="post" @submit.prevent="searchCustomGradingOption">
                        <div class="grid grid-cols-1 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Search</label>
                                <input v-model="search" type="text" placeholder="Search Custom Grading"  class="mt-1 py-3 px-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
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
                :loading="customGradingOption_loading" 
                :bodyData="customGradingOption.getCustomGradingOptionData" 
                :columns="columns" 
                @selectedPage="pageSelected">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-700 sm:pl-6">{{row.name}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{row.description}}</td>
                
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
                                    <nuxt-link :to="`#`" @click="onEditCustomGradingOption(row)" class="block px-4 py-2 text-sm text-gray-500">
                                        Edit Custom Grading Option
                                    </nuxt-link>
                                </MenuItem>
                                <MenuItem>
                                    <nuxt-link :to="`#`" @click="onDeleteCustomGradingOption(row)" class="block px-4 py-2 text-sm text-gray-500">
                                        Delete Custom Grading Option
                                    </nuxt-link>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </td>
            </TableList>
        </div>

        <TransitionRoot
                :show="editOptionOpenModal"
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <Dialog @close="() => editOptionOpenModal = false" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel class="w-full max-w-lg rounded bg-white p-5">
                            <DialogTitle class="text-xl font-extrabold tracking-tight text-slate-800 text-center">Update Option</DialogTitle>
                            <p class="text-center mb-4">Update option from custom grading</p>

                            <AlertErrorSuccess  
                                :success="success" 
                                :errors="errors"
                                @closeError="errors = []"
                                @closeSuccess="success = ''"/>

                            <form class="mt-5" method="post" @submit.prevent="submitEditCustomGradingOption">
                                <div class="mb-3">
                                    <FormInput :models="option_models" :forms="customGradingOption.getForms" />
                                </div>
                                <button type="submit" class="group relative flex justify-center button-primary w-full">
                                    <span class="pr-3 item-center">
                                        <Icon v-if="!loading" name="bi:plus-lg" class="h-5 w-5 text-white" />
                                        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                    </span>
                                   Edit Option
                                </button>
                            </form>
                            
                        </DialogPanel>
                    </div>
                </Dialog>
        </TransitionRoot>

        <TransitionRoot
                :show="deleteOptionOpenModal"
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <Dialog @close="deleteOptionOpenModal = false" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel class="w-full max-w-lg rounded bg-white p-5">
                            <DialogTitle class="text-xl font-extrabold tracking-tight text-slate-800 text-center">Delete Option</DialogTitle>
                            <p class="text-center mb-4">Delete option from custom grading</p>

                            <AlertErrorSuccess  
                                :success="success" 
                                :errors="errors"
                                @closeError="errors = []"
                                @closeSuccess="success = ''"/>

                             <div class="flex justify-center">
                                    <div class="text-center">
                                       <div class="flex justify-center">
                                            <img style="width: 150px;" src="/public-img/delete.png" alt="">
                                       </div>
                                        <h4 class="mt-2 text-md font-extrabold tracking-tight text-slate-800">Are you sure you want to remove this option from this custom grading?</h4>
                                        <div class="flex justify-center mt-5">
                                            <a @click="deleteOptionOpenModal = false" class="mx-2 group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-3 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" :href="`#`">Cancel</a>
                                            <button @click="confirmDeleteCustomGradingOption" type="submit" class="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                <span class="pr-3 item-center">
                                                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                      </svg>
                                                </span>
                                                Confirm Remove Option
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            
                        </DialogPanel>
                    </div>
                </Dialog>
        </TransitionRoot>

    </div>
</template>

<script setup lang="ts">
    import { Dialog, DialogPanel, DialogTitle, Menu, MenuButton, MenuItem, MenuItems, TransitionRoot } from '@headlessui/vue';
    import { useCustomGradingOptionStore } from '~~/stores/customGradingOption';
    import { useCustomGradingStore } from '~~/stores/customGrading';
    import { storeToRefs } from 'pinia';


    const editOptionOpenModal = ref(false);
    const deleteOptionOpenModal = ref(false);

    const loading = ref(false);

    const errors = ref([] as String[]);
    const success = ref('');

    const editOptionId = ref('');
    const deleteOptionId= ref('');

    const search_loading = ref(false);
    const search = ref('');
    const orderBy = ref('DESC');
    const page = ref(1);

    const customGradingOption_loading = ref(false);
    const customGradingOption = useCustomGradingOptionStore();
    const customGrading = useCustomGradingStore();

    const {option_models} = storeToRefs(customGradingOption);

    const columns = ['Name', 'Description', 'Actions']

    function onEditCustomGradingOption(data: any) {
        editOptionId.value = data.id;

        option_models.value = {
            school_id: data.school_id,
            custom_grading_id: data.custom_grading_id,
            description: data.description,
            name: data.name,
        }

        editOptionOpenModal.value = true;

    }

    function onDeleteCustomGradingOption(data: any) {
        deleteOptionId.value = data.id;
        deleteOptionOpenModal.value = true;
    }

    function confirmDeleteCustomGradingOption () {
        loading.value = true;
        customGradingOption.delete(deleteOptionId.value).then(res => {
            loading.value = false;
            deleteOptionOpenModal.value = false;
            success.value = 'Successfully removed Option';
        })
    }

    function submitEditCustomGradingOption () {
        loading.value = true;
        customGradingOption.update(editOptionId.value, option_models.value).then(res => {
            loading.value = false;
            editOptionOpenModal.value = false;
            success.value = 'Successfully updated option';
        })
    }

    function pageSelected(url: string | null) {
        if(url) {
            const pageNumber = parseInt(url.split('=')[1]);
            page.value = pageNumber;
            fetchCustomGradingOptions();
        }
    }

    function searchCustomGradingOption() {
        search_loading.value = true;
        fetchCustomGradingOptions();
    }

    function fetchCustomGradingOptions() {
        if (customGrading.getCustomGrading) {
            customGradingOption_loading.value = true;
            customGradingOption.list({
                search: search.value, 
                orderBy: orderBy.value, 
                page: page.value, 
                paginate: true, 
                school_id: customGrading.getCustomGrading.school_id,
                custom_grading_id: customGrading.getCustomGrading.id as string
            }).then((res) => {

                customGradingOption_loading.value = false;
                search_loading.value = false;

            });
        }
       
    }

    onMounted(async () => {
        await nextTick(async () => {
            fetchCustomGradingOptions();
        })
    })

</script>
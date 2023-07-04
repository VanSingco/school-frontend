<template>
    <div>
        <div class="shadow ring-1 ring-black ring-opacity-5 md:rounded-xl overflow-hidden">
            <table v-if="customGrading.getCustomGrading" class="border-collapse border border-slate-400 w-full max-w-full bg-[#fff]">
                <thead>
                  <tr>
                    <th class="w-auto px-3 py-3.5 border border-slate-300"></th>
                    <template v-if="customGrading.getCustomGrading.type == 'quarter'">
                        <th class="w-[100px] px-3 py-3.5 border border-slate-300" v-for="(item) in 4">Q{{item}}</th>
                    </template>
                    <template v-else>
                        <th class="w-[100px] px-3 py-3.5 border border-slate-300" v-for="(item) in 2">SEM {{item}}</th>
                    </template>
                  
                  </tr>
                </thead>
                <draggable v-model="customGradingItems" tag="tbody" item-key="id">
                    <template #item="{ element }">
                      <tr class="cursor-pointer">
                            <template v-if=" element.is_heading">
                                <td class="w-auto px-3 py-3.5 border border-slate-300" :colspan="customGrading.getCustomGrading.type == 'quarter' ? 5 : 3">
                                    <strong class="mr-4">{{  element.title }}</strong>
                                    <span title="Edit Item" class="mx-3" @click="onEditCustomGradingItem(element)"><Icon name="bi:pencil" class="text-gray-500" /></span>
                                    <span title="Delete Item" class="mx-3" @click="onDeleteCustomGradingItem(element)"><Icon name="bi:trash3" class="text-gray-500" /></span>
                                </td>
                            </template>
                            <template v-else>
                                <td class="w-auto px-3 py-3.5 border border-slate-300">
                                    <span class="mr-4">{{  element.title }}</span>
                                    <span title="Edit Item" class="mx-3" @click="onEditCustomGradingItem(element)"><Icon name="bi:pencil" class="text-gray-500" /></span>
                                    <span title="Delete Item" class="mx-3" @click="onDeleteCustomGradingItem(element)"><Icon name="bi:trash3" class="text-gray-500" /></span>
                                </td>
                                <template v-if="customGrading.getCustomGrading.type == 'quarter'">
                                    <td class="w-[100px] border border-slate-300" v-for="(item) in 4">
                                        <select name="" id="" class="py-3 px-3 block w-full rounded-md border border-transparent shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                            <option value=""></option>
                                            <option v-for="option in customGradingOption.getCustomGradingOptions" :value="option.id">{{option.name}}</option>
                                        </select>
                                    </td>
                                </template>
                                <template v-else>
                                    <td class="w-[100px] border border-slate-300" v-for="(item) in 2">
                                        <select name="" id="" class="py-3 px-3 block w-full rounded-md border border-transparent shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                            <option value=""></option>
                                            <option v-for="option in customGradingOption.getCustomGradingOptions" :value="option.id">{{option.name}}</option>
                                        </select>
                                    </td>
                                </template>
                            </template>
                        </tr>
                    </template>
                  </draggable>
       
              </table>
        </div>

        <div class="mt-[40px]">
            <div class="flex justify-end">
                
                <button class="button-default group relative flex justify-center" @click="onChangeOrder">
                    <span class="pr-3 item-center">
                        <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </span>
                    Save order changes
                </button>
            </div>
        </div>


        <TransitionRoot
                :show="editItemOpenModal"
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <Dialog @close="() => editItemOpenModal = false" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel class="w-full max-w-lg rounded bg-white p-5">
                            <DialogTitle class="text-xl font-extrabold tracking-tight text-slate-800 text-center">Update Item</DialogTitle>
                            <p class="text-center mb-4">Update item from custom grading</p>

                            <AlertErrorSuccess  
                                :success="success" 
                                :errors="errors"
                                @closeError="errors = []"
                                @closeSuccess="success = ''"/>

                            <form class="mt-5" method="post" @submit.prevent="submitEditCustomGradingItem">
                                <div class="mb-3">
                                    <FormInput :models="models" :forms="customGradingItem.getForms" />
                                </div>
                                <button type="submit" class="group relative flex justify-center button-primary w-full">
                                    <span class="pr-3 item-center">
                                        <Icon v-if="!loading" name="bi:plus-lg" class="h-5 w-5 text-white" />
                                        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                    </span>
                                   Edit Item
                                </button>
                            </form>
                            
                        </DialogPanel>
                    </div>
                </Dialog>
        </TransitionRoot>

        <TransitionRoot
                :show="deleteItemOpenModal"
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <Dialog @close="deleteItemOpenModal = false" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel class="w-full max-w-lg rounded bg-white p-5">
                            <DialogTitle class="text-xl font-extrabold tracking-tight text-slate-800 text-center">Delete Item</DialogTitle>
                            <p class="text-center mb-4">Delete item from custom grading</p>

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
                                        <h4 class="mt-2 text-md font-extrabold tracking-tight text-slate-800">Are you sure you want to remove this item from this custom grading?</h4>
                                        <div class="flex justify-center mt-5">
                                            <a @click="deleteItemOpenModal = false" class="mx-2 group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-3 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" :href="`#`">Cancel</a>
                                            <button @click="confirmDeleteCustomGradingItem" type="submit" class="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                <span class="pr-3 item-center">
                                                    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                      </svg>
                                                </span>
                                                Confirm Remove Item
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
    import { storeToRefs } from 'pinia';
    import { useCustomGradingItemStore } from '~~/stores/customGradingItem'
    import { useCustomGradingStore } from '~~/stores/customGrading';
    import { useCustomGradingOptionStore } from '~~/stores/customGradingOption';
    import draggable from "vuedraggable";
    import { Dialog, DialogPanel, DialogTitle, TransitionRoot } from '@headlessui/vue';

    const custom_grading_item_loading = ref(false);

    const editItemOpenModal = ref(false);
    const deleteItemOpenModal = ref(false);

    const editItemId = ref('');
    const deleteItemId= ref('');

    const loading = ref(false);

    const errors = ref([] as String[]);
    const success = ref('');

    const customGradingItem = useCustomGradingItemStore();
    const customGrading = useCustomGradingStore();
    const customGradingOption =  useCustomGradingOptionStore();
    const {customGradingItems, models} = storeToRefs(customGradingItem);

    function onEditCustomGradingItem(data: any) {
        editItemId.value = data.id;

        models.value = {
            school_id: data.school_id,
            custom_grading_id: data.custom_grading_id,
            parent_custom_grading_item_id: data.parent_custom_grading_item_id,
            title: data.title,
            is_heading: data.is_heading,
            order: data.order
        }

        editItemOpenModal.value = true;

    }

    function onChangeOrder() {
        if (customGrading.getCustomGrading) {
            loading.value = true;
            customGradingItem.changeOrder({
                custom_grading_id: customGrading.getCustomGrading.id,
                custom_grading_items: customGradingItems
            }).then(res => {
                success.value = 'Successfully change orders';
                loading.value = false;
            })
        }
        
    }

    function onDeleteCustomGradingItem(data: any) {
        deleteItemId.value = data.id;
        deleteItemOpenModal.value = true;
    }

    function submitEditCustomGradingItem() {
        loading.value = true;
        customGradingItem.update(editItemId.value, models.value).then(res => {
            loading.value = false;
            editItemOpenModal.value = false;
            success.value = 'Successfully updated item';
        })
    }

    function confirmDeleteCustomGradingItem() {
        loading.value = true;
        customGradingItem.delete(deleteItemId.value).then(res => {
            loading.value = false;
            deleteItemOpenModal.value = false;
            success.value = 'Successfully removed item';
        })
    }

    function fetchCustomGradingItem() {
        custom_grading_item_loading.value = true;
            if (customGrading.getCustomGrading) {
                customGradingItem.list({custom_grading_id: customGrading.getCustomGrading.id, school_id: customGrading.getCustomGrading.school_id}).then((res) => {
                custom_grading_item_loading.value = false;
            });

            customGradingOption.list({orderBy: 'asc', page: 1, search: '', paginate: false, custom_grading_id: customGrading.getCustomGrading.id, school_id: customGrading.getCustomGrading.school_id})
        }
    }



    onMounted(async () => {
        await nextTick(async () => {
            fetchCustomGradingItem();
        })
    })


</script>
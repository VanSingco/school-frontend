<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="`${customGrading.getCustomGrading ? customGrading.getCustomGrading.name : ''}`">
           
        </Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
            
        <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Custom Grading Not Found" :link="`/${accessType}/custom-grading`">
            
            <div v-if="customGrading.getCustomGrading" class="w-full mx-auto">
                <TabGroup>
                    <TabList>
                        <Tab v-slot="{ selected }" class="mr-[10px]">
                            <button
                                :class="[
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 px-[20px]',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-gray-500 bg-gray-300 hover:bg-gray-400 hover:text-white',
                                ]"
                            >
                                Custom Grading Items
                            </button>
                        </Tab>
                        <Tab v-slot="{ selected }" class="mr-[10px]">
                            <button
                                :class="[
                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-700 px-[20px] mr-[10px]',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                                selected
                                    ? 'bg-white shadow'
                                    : 'text-gray-500 bg-gray-300 hover:bg-gray-400 hover:text-white',
                                ]"
                            >
                                Custom Grading Options
                            </button>
                        </Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <div class="overflow-x-auto max-w-full w-full py-2 align-middle">
                            <div class="flex justify-end mb-[30px]">
                                <div>
                                    <a href="#" @click="openAddItem = true" class="group relative flex justify-center button-primary">
                                        <span class="pr-3 item-center">
                                            <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                                        </span>
                                        Add Item
                                    </a>
                                </div>
                            </div>
                            <CustomGradingItemList />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div class="my-[30px]">
                            <div class="flex justify-end mb-[30px]">
                                <div>
                                    <a href="#" @click="openAddOption = true" class="group relative flex justify-center button-primary">
                                        <span class="pr-3 item-center">
                                            <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                                        </span>
                                        Add Option
                                    </a>
                                </div>
                            </div>
                            <CustomGradingOption />
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </TabGroup>
               
            </div>
        </PageLoading>
        <TransitionRoot
                :show="openAddItem"
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <Dialog @close="setOpenAddItem" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel class="w-full max-w-lg rounded bg-white p-5">
                            <DialogTitle class="text-xl font-extrabold tracking-tight text-slate-800 text-center">Add Item</DialogTitle>
                            <p class="text-center mb-4">Add item to this custom grading</p>

                            <AlertErrorSuccess  
                                :success="success" 
                                :errors="errors"
                                @closeError="errors = []"
                                @closeSuccess="success = ''"/>
                            <form class="mt-5" method="post" @submit.prevent="addCustomGradingItem">
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
                                    Add Item
                                </button>
                            </form>
                            
                        </DialogPanel>
                    </div>
                </Dialog>
            </TransitionRoot>


            <TransitionRoot
                :show="openAddOption"
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <Dialog @close="openAddOption = false" class="relative z-50">
                    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div class="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel class="w-full max-w-lg rounded bg-white p-5">
                            <DialogTitle class="text-xl font-extrabold tracking-tight text-slate-800 text-center">Add Option</DialogTitle>
                            <p class="text-center mb-4">Add option to this custom grading</p>

                            <AlertErrorSuccess  
                                :success="success" 
                                :errors="errors"
                                @closeError="errors = []"
                                @closeSuccess="success = ''"/>
                            <form class="mt-5" method="post" @submit.prevent="addCustomGradingOption">
                                <div class="mb-3">
                                    <FormInput :models="option_models" :forms="customGradingOptions.getForms" />
                                </div>
                                <button type="submit" class="group relative flex justify-center button-primary w-full">
                                    <span class="pr-3 item-center">
                                        <Icon v-if="!loading" name="bi:plus-lg" class="h-5 w-5 text-white" />
                                        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                    </span>
                                    Add Option
                                </button>
                            </form>
                            
                        </DialogPanel>
                    </div>
                </Dialog>
            </TransitionRoot>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { Dialog, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels, TransitionRoot } from '@headlessui/vue';
    import { storeToRefs } from 'pinia';
    import { CustomGrading, useCustomGradingStore } from '~~/stores/customGrading';
    import { useCustomGradingItemStore, CustomGradingItem } from '~~/stores/customGradingItem'
    import { useCustomGradingOptionStore } from '~~/stores/customGradingOption'
    import CustomGradingItemList from './CustomGradingItemList.vue';
    import CustomGradingOption from './CustomGradingOption.vue';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Custom Grading",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Custom Gradings', link: `/${props.accessType}/custom-grading`},
            {name: 'Custom Grading Details', link: '#'}
        ]
    };

    const openAddItem = ref(false);
    const openAddOption = ref(false);

    const loading = ref(false);

    const errors = ref([] as String[]);
    const success = ref('');

    const customGrading = useCustomGradingStore();
    const customGradingItem = useCustomGradingItemStore();
    const customGradingOptions = useCustomGradingOptionStore();
    const {models} = storeToRefs(customGradingItem);
    
    const {option_models} = storeToRefs(customGradingOptions);

    const route = useRoute();
    const router = useRouter();

    const pageError = ref(false);
    const pageLoading = ref(false);

    function addCustomGradingOption() {
        loading.value = true;
        customGradingOptions.store(option_models.value as any).then(res => {
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
                success.value = 'Successfully added Custom Grading Option';
                const school_id = models.value.school_id
                option_models.value = {
                    school_id: school_id,
                    custom_grading_id: props.id,
                    description: '',
                    name: '',
                }

                openAddOption.value = false; 
        
            }
        });
    }

    function addCustomGradingItem() {
        loading.value = true;
        customGradingItem.store(models.value as any).then(res => {
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
                success.value = 'Successfully added Custom Grading Item';
                const school_id = models.value.school_id
                models.value = {
                    school_id: school_id,
                    custom_grading_id: props.id,
                    parent_custom_grading_item_id: '',
                    title: '',
                    order: 0,
                    is_heading: false,
                }

                openAddItem.value = true;
        
            }
        });

    }

    function setOpenAddItem() {
        openAddItem.value = false;
    }

    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            customGrading.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as CustomGrading | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;
                    models.value.school_id = data.school_id;
                    models.value.custom_grading_id = data.id as string;
                    option_models.value.school_id = data.school_id;
                    option_models.value.custom_grading_id = data.id as string;
                } else {
                    pageError.value = true;
                }
            });
        });
    })


</script>
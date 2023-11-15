<template>
    <div>
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

        <form action="" @submit.prevent="next">
            <div class="p-5">
                <!-- Field Input -->
                <FormInput :models="family" :forms="useApplication.getFamilyForms" />
                <div class="mt-5 flex justify-end">
                    <button type="submit" class="group relative flex justify-center button-primary">
                        <span class="text-base">Next</span>
                        <span class="pl-3 item-center">
                            <Icon v-if="!loading" name="bi:chevron-right" class="h-5 w-5 text-white" />
                            <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useApplicationStore } from '~~/stores/applications';
    import AlertErrorSuccess from '../Alert/AlertErrorSuccess.vue';
    import FormInput from '../form/FormInput.vue';

    const useApplication = useApplicationStore();

    const {family} = storeToRefs(useApplication);

    const loading = ref(false);
    const errors = ref([] as String[]);
    const success = ref('');

    function next() {

    }
</script>
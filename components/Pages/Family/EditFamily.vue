<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

            <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Family Not Found" :link="`/${accessType}/families`">
                <form action="" method="post" @submit.prevent="updateFamily">
                    <div class="grid grid-col-1">
                        <div class="shadow sm:overflow-hidden sm:rounded-md w-full">
                            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <FormInput :models="models" :forms="family.getForms" />
                            </div>
                            <div class="bg-gray-100 px-4 py-4 text-right sm:px-6 flex justify-end">
                                <button type="submit" class="group relative flex justify-center button-primary">
                                    <span class="pr-3 item-center">
                                        <Icon v-if="!loading" name="bi:save" class="h-5 w-5 text-white" />
                                        <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </PageLoading>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
import { Family, useFamilyStore } from '~~/stores/family';
    import { GradeLevel, useGradeLevelStore } from '~~/stores/gradeLevel';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Edit Family",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Families', link: `/${props.accessType}/families`},
            {name: 'Edit Family', link: '#'}
        ]
    };

    const family = useFamilyStore();
    const {models} = storeToRefs(family);

    const route = useRoute();

    const loading = ref(false);

    const errors = ref([] as String[]);
    const success = ref('');
    const pageError = ref(false);
    const pageLoading = ref(false);

    function updateFamily() {

        loading.value = true;

        family.update(props.id, models.value).then(res => {
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
                success.value = 'Successfully added family';
            }
        });
    }

    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            family.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as Family | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;
                    models.value = {
                        school_id: data.school_id as string,
                        primary_contact_person: data.primary_contact_person,
                        primary_contact_number: data.primary_contact_number,
                        primary_contact_email: data.primary_contact_email,
                        father_first_name: data.father_first_name,
                        father_last_name: data.father_last_name,
                        father_middle_name: data.father_middle_name,
                        father_suffix_name: data.father_suffix_name,
                        father_contact_no: data.father_contact_no,
                        father_birth_date: data.father_birth_date,
                        father_occupation: data.father_occupation,
                        father_highest_education_attaiment: data.father_highest_education_attaiment,
                        mother_first_name: data.mother_first_name,
                        mother_last_name: data.mother_last_name,
                        mother_middle_name: data.mother_middle_name,
                        mother_suffix_name: data.mother_suffix_name,
                        mother_contact_no: data.mother_contact_no,
                        mother_birth_date: data.mother_birth_date,
                        mother_occupation: data.mother_occupation,
                        mother_highest_education_attaiment: data.mother_highest_education_attaiment,
                        guardian_first_name: data.guardian_first_name,
                        guardian_last_name: data.guardian_last_name,
                        guardian_middle_name: data.guardian_middle_name,
                        guardian_suffix_name: data.guardian_suffix_name,
                        guardian_contact_no: data.guardian_contact_no,
                        guardian_birth_date: data.guardian_birth_date,
                        guardian_occupation: data.guardian_occupation,
                        guardian_highest_education_attaiment: data.guardian_highest_education_attaiment,
                        is_active: true,
                    }
                } else {
                    pageError.value = true;
                } 
            });
        });
    })


</script>
<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>

        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

        <form action="" @submit.prevent="addStudent">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12">
                <div class="col-span-1 image-upload sm:col-span-1 md:col-span-3 lg:col-span-3">
                    <div class="image-upload__overlay">
                        <div class="flex align-center">
                            <Icon name="bi:cloud-upload" class="w-5 h-5 text-white" />
                            <label for="image-upload" class="cursor-pointer"><h4 class="ml-2">Upload ID Picture</h4></label>
                            <input id="image-upload" @change="uploadImage" name="image-upload" type="file" class="hidden">
                        </div>
                    </div>
                    <nuxt-img class="w-full border rounded-lg shadow sm:rounded-md" :src="image_url ? image_url : '/public-img/default_profile.png'" />
                </div>
                <div class="col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-9">
                    <div class="overflow-hidden border border-gray-100 rounded-lg shadow sm:rounded-md">
                        <div class="p-6 py-5 bg-white">
                            <div>
                                <!-- Field Input -->
                                <FormInput :models="models" :forms="useStudent.getForms" />
                            </div>
                            <div class="flex justify-end mt-5">
                                <button type="submit" class="relative flex justify-center group button-primary">
                                    <span class="pr-3 item-center">
                                        <Icon v-if="!loading" name="bi:plus-lg" class="w-5 h-5 text-white" />
                                        <svg v-else class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                          </svg>
                                    </span>
                                    Add Student
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
       
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useStudentStore } from '~~/stores/student';
    import {uploadFile} from '~~/utils/custom';
    import FormInput from '~~/components/form/FormInput.vue';
    import AlertErrorSuccess from '~~/components/Alert/AlertErrorSuccess.vue';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });
    

    const header = {
        title: "Add Student",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Students', link: `/${props.accessType}/students`},
            {name: 'Add Student', link: `#`}
        ]
    };

    const useStudent = useStudentStore();

    const {models} = storeToRefs(useStudent);

    const loading = ref(false);
    const errors = ref([] as String[]);
    const success = ref('');

    const image_url = ref('');

    async function uploadImage(e : any){
        let file = e.target.files[0];
        models.value.id_picture = file;
        try {
            const result = await uploadFile(file);
            image_url.value = result as any
        } catch (error: any) {
            errors.value.push(error);
        }

    }

    function addStudent() {
        loading.value = true;
        useStudent.store(models.value).then(res => {
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
                success.value = 'Successfully added student';
                const school_id = models.value.school_id
                models.value = {
                    school_id: school_id,
                    lrn: '',
                    number: 0,
                    first_name: '',
                    last_name: '',
                    middle_name: '',
                    suffix_name: '',
                    id_picture: '',
                    gender: '',
                    birth_date: '',
                    birth_place: '',
                    citizenship: '',
                    mother_tongue: '',
                    religion: '',
                    street_address: '',
                    barangay: '',
                    city: '',
                    region: '',
                    province: '',
                    country: 'philippines',
                    zipcode: '',
                    status: '',
                    type: '',
                    payment_options: '',
                    grade_level_id: '',
                    last_grade_level_id: '',
                    school_year_id: '',
                    last_school_year_id: '',
                    primary_contact_person: '',
                    primary_contact_no: '',
                    primary_contact_relationship: '',
                }
            }
        })
    }

</script>
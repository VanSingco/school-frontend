<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

           <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="School Not Found" :link="`/${accessType}/schools`">
                <form action="" method="post" @submit.prevent="editSchool">
                    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                        <div class="image-upload col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3">
                            <div class="image-upload__overlay">
                                <div class="flex align-center">
                                    <Icon name="bi:cloud-upload" class="h-5 w-5 text-white" />
                                    <label for="image-upload" class="cursor-pointer"><h4 class="ml-2">Upload School Logo</h4></label>
                                    <input id="image-upload" @change="uploadLogo" name="image-upload" type="file" class="hidden">
                                </div>
                            </div>
                            <nuxt-img class="w-full rounded-lg shadow sm:rounded-md border" :src="image_url ? image_url : '/public-img/default_logo.png'" />
                        </div>
                        <div class="col-span-1 sm:col-span-1 md:col-span-7 lg:col-span-9">
                            <div class="overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                                <div class="bg-white py-5 p-6">
                                    <div>
                                        <!-- Field Input -->
                                        <FormInput :models="models" :forms="useSchool.getForms" />
                                    </div>
                                    <div class="mt-5 flex justify-end">
                                        <button type="submit" class="group relative flex justify-center button-primary">
                                            <span class="pr-3 item-center">
                                                <Icon v-if="!loading" name="bi:save" class="h-5 w-5 text-white" />
                                                <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </span>
                                            Save School
                                        </button>
                                    </div>
                                </div>
                            </div>
        
                        </div>
                    </div>
                </form>
           </PageLoading>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { School, useSchoolStore } from '~~/stores/school';
    import {uploadFile} from '~~/composable/custom';
    import FormInput from '~~/components/form/FormInput.vue';
    import PageLoading from '~~/components/PageError/PageLoading.vue';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'},
        id: {type: String, required: true}
    });

    const header = {
        title: "Edit School",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Schools', link: `/${props.accessType}/schools`},
            {name: 'Edit School', link: '#'}
        ]
    };

    const config = useRuntimeConfig();
    const base_url = config.public.apiBase;

    const useSchool =  useSchoolStore();

    const errors = ref([] as String[]);
    const success = ref('');
    const loading = ref(false);
    const pageError = ref(false);
    const pageLoading = ref(false);

    const {models} = storeToRefs(useSchool);

    const image_url = ref('');

    async function uploadLogo(e : any){
        let file = e.target.files[0];
        models.value.logo = file;
        try {
            const result = await uploadFile(file);
            image_url.value = result as any
        } catch (error: any) {
            errors.value.push(error);
        }

    }

    function editSchool() {
        loading.value = true;

        useSchool.update(props.id, models.value).then(res => {
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
                success.value = 'Successfully saved school';
                
            }
        })
    }

    onMounted(async () => {
        await nextTick(async () => {
            pageLoading.value = true;
            useSchool.show(props.id).then((res) => {
                pageLoading.value = false;

                const data = res.data.value as School | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;
                    image_url.value = base_url + data.logo;
                    models.value = {
                        id_number: data.id_number,
                        name: data.name,
                        school_head: data.school_head,
                        email: data.email,
                        contact_no: data.contact_no,
                        logo: "",
                        curricular_offering: data.curricular_offering,
                        classification: data.classification,
                        district: data.district,
                        division: data.division,
                        region: data.region,
                        city: data.city,
                        province: data.province,
                        country: data.country,
                        address: data.address,
                        accredited_to_deped: data.accredited_to_deped,
                        description: data.description,
                        mission: data.mission,
                        vision: data.vision,
                        status: data.status,
                    }
                

                } else {
                    pageError.value = true;
                }
            })
        })
    })

    
</script>
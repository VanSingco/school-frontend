<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
            <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Teacher Not Found" :link="`/${accessType}teachers`">
                <div class="profile">
                    <div class="profile__header mb-5" v-if="teacher.getTeacher">
                        <div class="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-12 lg:grid-cols-12">
                            <div class="col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-9">
                                <div class="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-12 lg:grid-cols-12">
                                    <div class=" col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-3"> 
                                        <nuxt-img :src="teacher.getTeacher.picture ? `${api_url + teacher.getTeacher.picture}` : '/public-img/default_logo.png'" />
                                    </div>
                                    <div class="profile__header--info col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-9">
                                        <div class="mb-3">
                                            <h2>{{teacher.getTeacher.first_name}} {{teacher.getTeacher.middle_name}} {{teacher.getTeacher.last_name}} {{teacher.getTeacher.suffix_name != 'null' ? teacher.getTeacher.suffix_name : ''}}</h2>
                                        </div>
                                        <div class="mb-3">
                                            <h4>Major: {{teacher.getTeacher.major}}</h4>
                                        </div>
                                        <div class="mb-3">
                                            <h4>Email: {{teacher.getTeacher.email}}</h4>
                                        </div>
                                        <div class="mb-3">
                                            <h4>Education Attainment: {{teacher.getTeacher.highest_education_attaiment}}</h4>
                                        </div>
                                        <div class="mb-3">
                                            <h4>Section Adviser: N/A</h4>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mt-3">
                                    <nuxt-link class="button-primary w-full flex justify-center items-center" :to="`/${accessType}/teachers/edit/${teacher.getTeacher.id}`">Edit Profile</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="profile__info overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                        <div class="bg-white py-5 p-6">
                            <div v-if="teacher.getTeacher" class="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-12 lg:grid-cols-12">
                                <div class="border-b border-gray-300 col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12 mb-4">
                                    <div class="py-2">
                                        <h4>Teacher Details</h4>
                                    </div> 
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">First Name:</label>
                                    <h6>{{teacher.getTeacher.first_name}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Last Name:</label>
                                    <h6>{{teacher.getTeacher.last_name}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Middle Name:</label>
                                    <h6>{{teacher.getTeacher.middle_name}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Suffix Name:</label>
                                    <h6>{{teacher.getTeacher.suffix_name != 'null' ? teacher.getTeacher.suffix_name : 'N/A'}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Gender:</label>
                                    <h6>{{teacher.getTeacher.gender}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Birth Date:</label>
                                    <h6>{{teacher.getTeacher.birth_date}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Birth Place:</label>
                                    <h6>{{teacher.getTeacher.birth_place}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Email:</label>
                                    <h6>{{teacher.getTeacher.email}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Contact Number:</label>
                                    <h6>{{teacher.getTeacher.contact_no}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Major:</label>
                                    <h6>{{teacher.getTeacher.major}}</h6>
                                </div>

                                <div class="mt-5 border-b border-gray-300 col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12 mb-4">
                                    <div class="py-2">
                                        <h4>Teacher Address</h4>
                                    </div> 
                                </div>

                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Region:</label>
                                    <h6>{{teacher.getTeacher.region}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Province:</label>
                                    <h6>{{teacher.getTeacher.province}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">City:</label>
                                    <h6>{{teacher.getTeacher.city}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Barangay:</label>
                                    <h6>{{teacher.getTeacher.barangay}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Street Address:</label>
                                    <h6>{{teacher.getTeacher.street_address}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Zipcode:</label>
                                    <h6>{{teacher.getTeacher.zipcode}}</h6>
                                </div>
                                


                            </div>
                        </div>
                    </div>
                </div>
            </PageLoading>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { Teacher, useTeacherStore } from '~~/stores/teacher';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Teacher Profile",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Teachers', link: `/${props.accessType}/teachers`},
            {name: 'Teacher Profile', link: '#'}
        ]
    };

   const loading = ref(false);

    const errors = ref([]);
    const success = ref('');

    const teacher = useTeacherStore();
    const router = useRouter();

    const config = useRuntimeConfig();
    const api_url = config.public.apiBase;

    const pageError = ref(false);
    const pageLoading = ref(false);

 

    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            teacher.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as Teacher | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;

                } else {
                    pageError.value = true;
                }
            });
        });
    })


</script>
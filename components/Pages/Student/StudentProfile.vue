<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
            <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Student Not Found" :link="`/${accessType}/students`">
                <div class="profile">
                    <div class="profile__header mb-5" v-if="student.getStudent">
                        <div class="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-12 lg:grid-cols-12">
                            <div class="col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-9">
                                <div class="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-12 lg:grid-cols-12">
                                    <div class=" col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-3"> 
                                        <nuxt-img :src="student.getStudent.id_picture ? `${api_url + student.getStudent.id_picture}` : '/public-img/default_logo.png'" />
                                    </div>
                                    <div class="profile__header--info col-span-1 sm:col-span-1 md:col-span-9 lg:col-span-9">
                                        <div class="mb-3">
                                            <h2>{{student.getStudent.first_name}} {{student.getStudent.middle_name}} {{student.getStudent.last_name}} {{student.getStudent.suffix_name != 'null' ? student.getStudent.suffix_name : ''}}</h2>
                                        </div>
                                        <div class="mb-3">
                                            <h4>Student Number: {{student.getStudent.number}}</h4>
                                        </div>
                                        <div class="mb-3">
                                            <h4>Grade Level: {{student.getStudent.grade_level ? student.getStudent.grade_level.name : ''}}</h4>
                                        </div>
                                        <div class="mb-3">
                                            <h4>School Year: {{student.getStudent.school_year ? student.getStudent.school_year.school_year : ''}}</h4>
                                        </div>
                                        <div class="mb-3">
                                            <h4>Current Section: {{student.getStudent.section ? student.getStudent.section.name : 'N/A'}}</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mt-3">
                                    <nuxt-link class="button-primary w-full flex justify-center items-center" :to="`/${accessType}/students/edit/${student.getStudent.id}`">Edit Profile</nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="profile__info overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                        <div class="bg-white py-5 p-6">
                            <div v-if="student.getStudent" class="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-12 lg:grid-cols-12">
                                <div class="border-b border-gray-300 col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12 mb-4">
                                    <div class="py-2">
                                        <h4>Student Details</h4>
                                    </div> 
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Student Number:</label>
                                    <h6>{{student.getStudent.number}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">LRN:</label>
                                    <h6>{{student.getStudent.lrn != 'null' ? student.getStudent.lrn : 'N/A'}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">First Name:</label>
                                    <h6>{{student.getStudent.first_name}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Last Name:</label>
                                    <h6>{{student.getStudent.last_name}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Middle Name:</label>
                                    <h6>{{student.getStudent.middle_name}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Suffix Name:</label>
                                    <h6>{{student.getStudent.suffix_name != 'null' ? student.getStudent.suffix_name : 'N/A'}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Gender:</label>
                                    <h6>{{student.getStudent.gender}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Birth Date:</label>
                                    <h6>{{student.getStudent.birth_date}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Birth Place:</label>
                                    <h6>{{student.getStudent.birth_place}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Citizenship:</label>
                                    <h6>{{student.getStudent.citizenship}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Mother Tongue:</label>
                                    <h6>{{student.getStudent.mother_tongue}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Religion:</label>
                                    <h6>{{student.getStudent.religion}}</h6>
                                </div>
                                <div class="mt-5 border-b border-gray-300 col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12 mb-4">
                                    <div class="py-2">
                                        <h4>Student Address</h4>
                                    </div> 
                                </div>

                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Region:</label>
                                    <h6>{{student.getStudent.region}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Province:</label>
                                    <h6>{{student.getStudent.province}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">City:</label>
                                    <h6>{{student.getStudent.city}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Barangay:</label>
                                    <h6>{{student.getStudent.barangay}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Street Address:</label>
                                    <h6>{{student.getStudent.street_address}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Zipcode:</label>
                                    <h6>{{student.getStudent.zipcode}}</h6>
                                </div>
                                <div class="mt-5 border-b border-gray-300 col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12 mb-4">
                                    <div class="py-2">
                                        <h4>Student Schooling Information</h4>
                                    </div> 
                                </div>

                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Active Grade Level:</label>
                                    <h6>{{student.getStudent.grade_level ? student.getStudent.grade_level.name : 'N/A'}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Last Grade Level:</label>
                                    <h6>{{student.getStudent.last_grade_level ? student.getStudent.last_grade_level.name : 'N/A'}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Active School Year:</label>
                                    <h6>{{student.getStudent.school_year ? student.getStudent.school_year.school_year : 'N/A'}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Last School Year:</label>
                                    <h6>{{student.getStudent.last_school_year ? student.getStudent.last_school_year.school_year : 'N/A'}}</h6>
                                </div>

                                <div class="mt-5 border-b border-gray-300 col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12 mb-4">
                                    <div class="py-2">
                                        <h4>Student Primary Contact</h4>
                                    </div> 
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Primary Contact Person:</label>
                                    <h6>{{student.getStudent.primary_contact_person}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Primary Contact Number:</label>
                                    <h6>{{student.getStudent.primary_contact_no}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Primary Contact Relationship:</label>
                                    <h6>{{student.getStudent.primary_contact_relationship}}</h6>
                                </div>

                                <div class="mt-5 border-b border-gray-300 col-span-1 sm:col-span-1 md:col-span-12 lg:col-span-12 mb-4">
                                    <div class="py-2">
                                        <h4>Admin Remarks</h4>
                                    </div> 
                                </div>

                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Status:</label>
                                    <h6>{{student.getStudent.status}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Type:</label>
                                    <h6>{{student.getStudent.type}}</h6>
                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3 mb-4">
                                    <label for="">Payment Option:</label>
                                    <h6>{{student.getStudent.payment_options}}</h6>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </PageLoading>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { Student, useStudentStore } from '~~/stores/student';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Student Profile",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Students', link: `/${props.accessType}/students`},
            {name: 'Student Profile', link: '#'}
        ]
    };

   const loading = ref(false);

    const errors = ref([]);
    const success = ref('');

    const student = useStudentStore();
    const router = useRouter();

    const config = useRuntimeConfig();
    const api_url = config.public.apiBase;

    const pageError = ref(false);
    const pageLoading = ref(false);

 

    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            student.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as Student | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;

                } else {
                    pageError.value = true;
                }
            });
        });
    })


</script>
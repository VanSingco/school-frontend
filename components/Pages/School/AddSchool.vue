<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

        <form action="" method="post" @submit.prevent="addSchool">
            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                <div class="col-span-1 sm:col-span-1 md:col-span-3 lg:col-span-3">

                </div>
                <div class="col-span-1 sm:col-span-1 md:col-span-7 lg:col-span-9">
                    <div class="overflow-hidden shadow sm:rounded-md border border-gray-100 rounded-lg">
                        <div class="bg-white py-5 p-6">
                            <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-4">
                                <div class="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">

                                </div>
                                <div class="col-span-1 sm:col-span-1 md:col-span-6 lg:col-span-6">

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>

    </NuxtLayout>
</template>

<script setup lang="ts">

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });

    const model = ref({
        id_number: 0,
        name: '',
        email: '',
        contact_no: 0,
        logo: '',
        subname: '',
        curricular_offering: '',
        classification: '',
        district: '',
        division: '',
        region: '',
        city: '',
        country: '',
        address: '',
        accredited_to_deped: '',
        description: '',
        mission: '',
        vision: '',
        status: ''
    });

    const header = {
        title: "Add School",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Schools', link: `/${props.accessType}/schools`},
            {name: 'Add School', link: '#'}
        ]
    };

    const errors = ref([] as String[]);
    const success = ref('');

    function addSchool() {

    }

    
</script>
<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

        <form action="" method="post" @submit.prevent="addLesson">
            <div class="grid grid-col-1">
                <div class="shadow sm:overflow-hidden sm:rounded-md w-full">
                    <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                        <FormInput :models="models" :forms="lesson.getForms" />
                    </div>
                    <div class="bg-gray-100 px-4 py-4 text-right sm:px-6 flex justify-end">
                        <button type="submit" class="group relative flex justify-center button-primary">
                            <span class="pr-3 item-center">
                                <Icon v-if="!loading" name="bi:plus-lg" class="h-5 w-5 text-white" />
                                <svg v-else class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                            </span>
                            Add Lesson
                        </button>
                    </div>
                </div>
            </div>
        </form>

    </NuxtLayout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLessonStore } from '~~/stores/lessons';

    const props = defineProps({
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Add Lesson",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Lesson List', link: `/${props.accessType}/lessons`},
            {name: 'Add Lesson', link: '#'}
        ]
    };

    const lesson = useLessonStore();

    const {models} = storeToRefs(lesson);

    const loading = ref(false);

    const errors = ref([] as String[]);
    const success = ref('');

    function addLesson() {
        loading.value = true;
        lesson.store(models.value).then(res => {
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
                success.value = 'Successfully added lessons';
                const school_id = models.value.school_id
                models.value = {
                    school_id: school_id,
                    assign_subject_schedule_id: '',
                    description: '',
                }
            }
        });

    }
</script>
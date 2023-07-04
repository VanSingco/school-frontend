<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
            
        <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Lesson Not Found" :link="`/${accessType}/lessons`">
            <div class="grid grid-col-1">
                <div class="shadow bg-white p-5 sm:overflow-hidden sm:rounded-md w-full">
                    <div>
                        <h2 class="mt-3 text-2xl font-extrabold tracking-tight text-slate-800">{{lesson.getLesson?.assign_subject_schedule?.assign_subject?.subject?.name}} / {{lesson.getLesson?.assign_subject_schedule?.assign_subject?.grade_level?.name}} / {{lesson.getLesson?.assign_subject_schedule?.section?.name}}</h2>     
                        <div class="flex items-center mt-3">
                            <nuxt-img class="w-7 h-7 rounded-lg shadow sm:rounded-md border" style="object-fit: cover;" :src="lesson.getLesson?.assign_subject_schedule?.teacher?.picture ? `${api_url + lesson.getLesson?.assign_subject_schedule.teacher.picture}` : '/public-img/default_logo.png'" /> 
                            <h4 class="ml-3 text-sm font-semibold text-gray-700">{{lesson.getLesson?.assign_subject_schedule?.teacher?.first_name}} {{lesson.getLesson?.assign_subject_schedule?.teacher?.middle_name}} {{lesson.getLesson?.assign_subject_schedule?.teacher?.last_name}}</h4>
                        </div>
                        <div class="my-5">
                            <div v-html="lesson.getLesson?.description" class="text-sm text-gray-700"></div>
                        </div>
                    </div>
                    <div class="mt-10 mb-5 flex justify-end" v-if="accessType != 'student'">
                      <nuxt-link :to="`/${accessType}/lessons/${id}/discussion/add`" class="button-primary">Add Discussion / Quiz / Exam</nuxt-link>
                    </div>
                    <div class="w-full max-w-full px-2 pt-5 sm:px-0">
                        <LessonDiscussionList :id="id" :accessType="accessType" />
                    </div>
                </div>
            </div>
        </PageLoading>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import LessonDiscussionList from '~~/components/Pages/LessonDiscussion/LessonDiscussionList.vue'
    import { Lesson, useLessonStore } from '~~/stores/lessons';
    import { ref } from 'vue'


    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Lesson",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Lesson List', link: `/${props.accessType}/lessons`},
            {name: 'Lesson', link: '#'}
        ]
    };

   const loading = ref(false);

    const errors = ref([]);
    const success = ref('');

    const lesson = useLessonStore();
    const route = useRoute();
    const router = useRouter();

    const config = useRuntimeConfig();
    const api_url = config.public.apiBase;

    const pageError = ref(false);
    const pageLoading = ref(false);

    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            lesson.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as Lesson | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;

                } else {
                    pageError.value = true;
                }
            });
        });
    })


</script>
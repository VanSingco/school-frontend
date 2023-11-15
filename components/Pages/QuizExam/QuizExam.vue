<template>
    <NuxtLayout :name="accessType">
        <div>
            <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        </div>
        <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Lesson Discussion Not Found" :link="`/${props.accessType}/lessons/${props.id}`">
            <div v-if="lessonDiscussion.getLessonDiscussion" class="shadow sm:overflow-hidden sm:rounded-md w-full">
                <div class="grid grid-cols-12 gap-5">
                    <div class="col-span-12 lg:col-span-5">
                        <div  class="shadow sm:overflow-hidden sm:rounded-md w-full">
                            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">

                            </div>
                        </div>
                    </div>
                    <div class="col-span-12 lg:col-span-7">
                        <div  class="shadow sm:overflow-hidden sm:rounded-md w-full">
                            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <QuizExamForm :id="id" :discussion_id="discussion_id" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLoading>
        
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { LessonDiscussion, useLessonDiscussionStore } from '~~/stores/lessonDiscussion';
    import moment from 'moment';
    import { getExtension } from '~~/utils/custom';
    import QuizExamForm from './QuizExamForm.vue';

    const props = defineProps({
        id: {type: String, required: true},
        discussion_id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Quiz / Exam",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Lesson', link: `/${props.accessType}/lessons/${props.id}`},
            {name: 'Quiz Exam', link: '#'}
        ]
    };

    const loading = ref(false);

    const errors = ref([]);
    const success = ref('');

    const lessonDiscussion = useLessonDiscussionStore();
    const route = useRoute();
    const router = useRouter();

    const config = useRuntimeConfig();
    const api_url = config.public.apiBase;

    const pageError = ref(false);
    const pageLoading = ref(false);

    onMounted(async () => {
        await nextTick(async () => {
            pageLoading.value = true;

            lessonDiscussion.show(props.discussion_id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as LessonDiscussion | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;

                } else {
                    pageError.value = true;
                }
            });
        })
    });
</script>~~/utils/custom
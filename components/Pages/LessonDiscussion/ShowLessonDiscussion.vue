<template>
    <NuxtLayout :name="accessType">
        <div>
            <Header :breadcrumbs="header.breadcrumbs" :title="header.title">
                <nuxt-link :to="`/${accessType}/lessons/${id}/quiz-exam/${discussion_id}`" class="group relative flex justify-center button-primary">
                    <span class="pr-3 item-center">
                        <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                    </span>
                    Add Quiz/Exam
                </nuxt-link>
            </Header>
        </div>
        <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Lesson Discussion Not Found" :link="`/${props.accessType}/lessons/${props.id}`">
            <div v-if="lessonDiscussion.getLessonDiscussion" class="shadow sm:overflow-hidden sm:rounded-md w-full">
                <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <h1 class="mt-3 text-xl font-semibold tracking-tight text-slate-700">{{lessonDiscussion.getLessonDiscussion.title}}</h1>
                    <p class="text-sm !mt-2">{{lessonDiscussion.getLessonDiscussion.description}}</p>
                    <div class="mt-5 flex" v-if="lessonDiscussion.getLessonDiscussion.files?.length > 0">
                       <a v-for="file in lessonDiscussion.getLessonDiscussion.files" class="mr-5" :href="api_url + file.file_path" target="_blank">
                            <nuxt-img class="w-16" :src="`/file/${getExtension(file.file_path)}.png`" />
                            <span class="text-sm">{{file.file_path.split('___')[1]}}</span>
                       </a>
                    </div>
                    <div class="mt-5">
                        <ul class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                            <li class="!text-md"><strong>Start Date</strong>: {{ moment(lessonDiscussion.getLessonDiscussion.start_date).format('LL') }}</li>
                            <li>&middot;</li>
                            <li class="!text-md"><strong>End Date</strong>: {{ moment(lessonDiscussion.getLessonDiscussion.end_date).format('LL') }}</li>
                            <li>&middot;</li>
                        </ul>
                    </div>
                </div>
            </div>
        </PageLoading>
        
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { LessonDiscussion, useLessonDiscussionStore } from '~~/stores/lessonDiscussion';
    import moment from 'moment';
    import { getExtension } from '~~/composable/custom';

    const props = defineProps({
        id: {type: String, required: true},
        discussion_id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Lesson Discussion",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Lesson', link: `/${props.accessType}/lessons/${props.id}`},
            {name: 'Lesson Discussion', link: '#'}
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
</script>
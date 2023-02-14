<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="header.title"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>

            <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Subject Not Found" :link="`/${accessType}/subjects`">
                <form action="" method="post" @submit.prevent="updateSubject">
                    <div class="grid grid-col-1">
                        <div class="shadow sm:overflow-hidden sm:rounded-md w-full">
                            <div class="space-y-6 bg-white px-4 py-5 sm:p-6">
                                <FormInput :models="models" :forms="subject.getForms" />
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
                                    Save Change
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
    import { useSubjectStore, Subject } from '~~/stores/subject';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Edit Subject",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Subjects', link: `/${props.accessType}/subjects`},
            {name: 'Edit Subject', link: '#'}
        ]
    };

    const subject = useSubjectStore();
    const {models} = storeToRefs(subject);
    const loading = ref(false);

    const errors = ref([]);
    const success = ref('');
    const pageError = ref(false);
    const pageLoading = ref(false);


    function updateSubject() {
        loading.value = true;
        
        subject.update(props.id, models.value).then(res => {
            errors.value = [];
            success.value = '';
            loading.value = false;

            if (res.error.value) {
                for (const key in res.error.value.data) {
                    if (Object.hasOwnProperty.call(res.error.value.data, key)) {
                        errors.value.push(res.error.value.data[key][0] as never);
                    }
                }
            } else if (res.data.value) {
                success.value = 'Successfully saved changes.';
            }

        });
    }

    onMounted(async () => {
        await nextTick(async () => {

            pageLoading.value = true;

            subject.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as Subject | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;
                    models.value = {
                        school_id: data.school_id as string,
                        name: data.name,
                        type: data.type,
                        parent_subject_id:  data.parent_subject_id as string,
                        ww: data.ww,
                        qa: data.pt,
                        pt: data.pt,
                        ww_min_task: data.ww_min_task,
                        ww_max_task: data.ww_max_task,
                        qa_min_task: data.qa_min_task,
                        qa_max_task: data.qa_max_task,
                        pt_min_task: data.pt_min_task,
                        pt_max_task: data.pt_max_task,
                    }
                } else {
                    pageError.value = true;
                }

            }); 

        });
    })


</script>
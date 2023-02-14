<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="`${header.title} From ${(assignSubject.getAssignSubject && assignSubject.getAssignSubject.subject) ? assignSubject.getAssignSubject.subject.name : ''} - ${(assignSubject.getAssignSubject && assignSubject.getAssignSubject.grade_level) ? assignSubject.getAssignSubject.grade_level.name : '' }`"></Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
        <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Assign Subject Not Found" :link="`/${accessType}/assign-subjects/schedules/${id}`">
            <form action="" method="post" @submit.prevent="updateSchedule">
                <div class="grid grid-col-1">
                    <div class="shadow sm:overflow-hidden sm:rounded-md w-full">
                        <div class="bg-white py-5 p-6">
                            <div class="mb-8">
                                <FormInput :models="models" :forms="schedule.getForms" />
                            </div>
                            <div>
                                <div class="mb-5">
                                    <h2 class="text-md font-semibold leading-9 tracking-tight text-slate-900">Day and Time</h2>
                                </div>
                                <div class="mb-5">
                                    <div v-for="(dayTime, i) in models.day_time_schedules" class="mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-12 lg:grid-cols-12 items-end">
                                        <div class="cols-span-1 sm:col-span-1 md:col-span-11 lg:col-span-11">
                                            <FormInput :models="dayTime" :forms="schedule.getDayTimeFrom" />
                                        </div>
                                        <div class="cols-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-end">
                                            <button v-if="i != 0" type="button" @click="removeDayTime(i)" class="group relative flex justify-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                                                <Icon name="bi:trash3" class="h-5 w-5 text-white"  />
                                            </button>
                                        </div>
                                    </div>
                                </div>
    
                                <div>
                                    <button @click="addDayTime" type="button" class="group relative flex justify-center rounded-md border border-transparent bg-gray-600 py-3 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                        <span class="pr-3 item-center">
                                            <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                                        </span>
                                        Add Day And Time
                                    </button>
                                </div>
                            </div>
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
import { AssignSubject, useAssignSubjectStore } from '~~/stores/assignSubject';
    import { AssignSubjectSchedule, ScheduleDayTime, useAssignSubjectScheduleStore } from '~~/stores/assignSubjectSchedule';

    const props = defineProps({
        id: {type: String, required: true},
        schedule_id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Edit Schedule",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Assign Subjects', link: `/${props.accessType}/assign-subjects`},
            {name: 'Schedules', link: `/${props.accessType}/assign-subjects/schedules/${props.id}`},
            {name: 'Edit Schedule', link: '#'}
        ]
    };
    const assignSubject = useAssignSubjectStore();
    const schedule = useAssignSubjectScheduleStore();

    const pageError = ref(false);
    const pageLoading = ref(false);

    const {models} = storeToRefs(schedule);

    const loading = ref(false);

    const errors = ref([] as String[]);
    const success = ref('');

    function addDayTime() {
        models.value.day_time_schedules?.push({day: '', time_from: '', time_to: ''} as ScheduleDayTime);
    }

    function removeDayTime(index: any) {
        if (index > -1) { // only splice array when item is found
            models.value.day_time_schedules?.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    function updateSchedule() {
        loading.value = true;
        models.value.assign_subject_id = props.id;
        schedule.update(props.schedule_id, models.value).then(res => {
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
                success.value = 'Successfully saved Schedule';
            }
        });

    }

    onMounted(async () => {
        await nextTick(async () => {


            pageLoading.value = true;
            schedule.show(props.schedule_id).then(res => {
                pageLoading.value = false;

                const data = res.data.value as AssignSubjectSchedule | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;
                    models.value = {
                        school_id: data.school_id,
                        section_id: data.section_id,
                        assign_subject_id: data.assign_subject_id,
                        teacher_id: data.teacher_id,
                        classroom_name: data.classroom_name,
                        day_time_schedules: []
                    }

                    data.day_time_schedules?.map(item => {
                        models.value.day_time_schedules?.push({day: item.day, time_from: item.time_from, time_to: item.time_to});
                    })
                    
                } else {
                    pageError.value = true;
                } 
            });

            assignSubject.show(props.id).then(res => {

                pageLoading.value = false;

                const data = res.data.value as AssignSubject | null

                if (data && Object.keys(data).length > 0) {
                    pageError.value = false;

                } else {
                    pageError.value = true;
                }
            });
        });
    })
</script>
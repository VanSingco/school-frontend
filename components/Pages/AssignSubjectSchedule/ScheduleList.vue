<template>
    <NuxtLayout :name="accessType">

        <Header :breadcrumbs="header.breadcrumbs" :title="`${(assignSubject.getAssignSubject && assignSubject.getAssignSubject.subject) ? assignSubject.getAssignSubject.subject.name : ''} - ${(assignSubject.getAssignSubject && assignSubject.getAssignSubject.grade_level) ? assignSubject.getAssignSubject.grade_level.name : '' } ${header.title}`">
            <nuxt-link v-if="!pageLoading" :to="`/${props.accessType}/assign-subjects/schedules/${id}/add`" class="group relative flex justify-center button-primary">
                <span class="pr-3 item-center">
                    <Icon name="bi:plus-lg" class="h-5 w-5 text-white" />
                </span>
                Add Schedule
            </nuxt-link>
        </Header>
        
        <AlertErrorSuccess  
            :success="success" 
            :errors="errors"
            @closeError="errors = []"
            @closeSuccess="success = ''"/>
            
        <PageLoading :pageLoading="pageLoading" :pageError="pageError" title="Assign Subject Not Found" :link="`/${accessType}/assign-subjects`">
           
            <TableList 
                v-slot="{row}" 
                :loading="assignSubjectSchedule_loading" 
                :bodyData="assignSubjectSchedule.getAssignSubjectScheduleData" 
                :columns="columns" 
                @selectedPage="pageSelected">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-700 sm:pl-6">{{row.teacher.first_name}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ row.section ? row.section.name : 'N/A' }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ row.classroom_name }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div v-for="day_time in row.day_time_schedules" class="capitalize mb-2">
                        {{ day_time.day }}
                    </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div v-for="day_time in row.day_time_schedules" class="mb-2">
                        {{ day_time.format_time_from }} - {{ day_time.format_time_to }}
                    </div>
                </td>
                <td class="py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
                    <Menu as="div" class="relative ml-3">
                        <div>
                            <MenuButton class="text-gray-500">
                                <Icon name="bi:three-dots-vertical" size="15" />
                            </MenuButton>
                        </div>
                        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                            <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                                
                                <MenuItem>
                                    <nuxt-link :to="`/${accessType}/assign-subjects/schedules/${id}/edit/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                        Edit Schedule
                                    </nuxt-link>
                                </MenuItem>
                                <MenuItem>
                                    <nuxt-link :to="`/${accessType}/assign-subjects/schedules/${id}/delete/${row.id}`" class="block px-4 py-2 text-sm text-gray-500">
                                        Delete Schedule
                                    </nuxt-link>
                                </MenuItem>
                            </MenuItems>
                        </transition>
                    </Menu>
                </td>
            </TableList>
            
        </PageLoading>
    </NuxtLayout>
</template>

<script setup lang="ts">
    import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { AssignSubject, useAssignSubjectStore } from '~~/stores/assignSubject';
    import { useAssignSubjectScheduleStore } from '~~/stores/assignSubjectSchedule';

    const props = defineProps({
        id: {type: String, required: true},
        accessType: {type: String, required: true, default: 'admin'}
    });

    const header = {
        title: "Schedules",
        breadcrumbs: [
            {name: 'Dashboard', link: `/${props.accessType}/dashboard`},
            {name: 'Assign Subjects', link: `/${props.accessType}/assign-subjects/`},
            {name: 'Schedules', link: `/${props.accessType}/assign-subjects/schedules/${props.id}`}, 
        ]
    };

   const loading = ref(false);

    const errors = ref([]);
    const success = ref('');

    const assignSubject = useAssignSubjectStore();
    const assignSubjectSchedule = useAssignSubjectScheduleStore();

    const route = useRoute();
    const router = useRouter();

    const pageError = ref(false);
    const pageLoading = ref(false);


    const search_loading = ref(false);
    const search = ref('');
    const orderBy = ref('DESC');
    const page = ref(1);

    const assignSubjectSchedule_loading = ref(false);
    const columns = ['Teacher', 'Section', 'Classroom Name', 'Day', 'Time', 'Actions']

    function pageSelected(url: string | null) {
        if(url) {
            const pageNumber = parseInt(url.split('=')[1]);
            page.value = pageNumber;
            fetchAssignSubjectSchedules();
        }
    }

    function searchAssignSubjectSchedule() {
        search_loading.value = true;
        fetchAssignSubjectSchedules();
    }

    function fetchAssignSubjectSchedules() {
        assignSubjectSchedule_loading.value = true;
        assignSubjectSchedule.list({search: search.value, orderBy: orderBy.value, page: page.value, paginate: true, assign_subject_id: props.id, school_id: null}).then((res) => {
            assignSubjectSchedule_loading.value = false;
            search_loading.value = false;
        });
    }



    onMounted(async () => {
        await nextTick(async () => {
            
            fetchAssignSubjectSchedules();

            pageLoading.value = true;

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
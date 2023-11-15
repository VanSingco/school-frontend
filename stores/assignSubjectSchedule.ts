import { Section } from './section';
import { Teacher } from './teacher';
import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';
import { AssignSubject } from './assignSubject';

const school = useSchoolStore();

export interface ScheduleDayTime {
    id?: string;
    school_id?: string;
    assign_subject_schedule_id?: string;
    day: string;
    time_from: string;
    time_to: string;
}

export interface AssignSubjectSchedule {
    id?: string;
    school_id?: string;
    section_id: string;
    assign_subject_id: string;
    assign_subject: AssignSubject;
    teacher_id: string;
    teacher?: Teacher;
    section?: Section;
    classroom_name?: string;
    day_time_schedules?: ScheduleDayTime[]
};

export interface AssignSubjectScheduleSearch {
    orderBy: string;
    page: number;
    search: string;
    paginate: boolean;
    assign_subject_id?: string | null;
    school_id?: string | null;
}


export const useAssignSubjectScheduleStore = defineStore('assignSubjectSchedule', {
    state: () => {
      return {
        assignSubjectSchedules: [] as AssignSubjectSchedule[],
        assignSubjectSchedule: null as AssignSubjectSchedule | null,
        assignSubjectScheduleData: {},
        models: {
            school_id: school.school ? school.school.id : null,
            section_id: '',
            assign_subject_id: '',
            teacher_id: '',
            classroom_name: '',
            day_time_schedules: [{day: '', time_from: '', time_to: ''}] as ScheduleDayTime[],
            grade_level_id: '',

        },
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},
                {key: 'section_id', type: 'select-section', hide: false, required: true, name: 'Select Section', cols: 6},
                {key: 'teacher_id', type: 'select-teacher', hide: false, required: true, name: 'Select Teacher', cols: 6},
                {key: 'classroom_name', type: 'text', hide: false, required: false, name: 'Classroom Name (Optional)', cols: 12}, 
            ];
        },
        getDayTimeFrom(state) {
            return [
                {key: 'day', type: 'select-days', hide: false, required: true, name: 'Select Days', cols: 4},
                {key: 'time_from', type: 'time', hide: false, required: true, name: 'Select Time From', cols: 4},
                {key: 'time_to', type: 'time', hide: false, required: true, name: 'Select Time to', cols: 4},
            ];
        },
        getSelect(state): any {
            let options: any = [];
            state.assignSubjectSchedules.map(item => options.push({
                value: item.id, 
                text: `${item.assign_subject ? item.assign_subject.subject?.name : ''} / ${item.assign_subject ? item.assign_subject.grade_level?.name : ''} / ${item.section ? item.section.name : ''} /  ${item.teacher ? item.teacher.first_name : ''}`}))
            return options;
        },

        getAssignSubjectSchedules(state): AssignSubjectSchedule[] {
            return state.assignSubjectSchedules;
        },

        getAssignSubjectSchedule(state): AssignSubjectSchedule | null {
            return state.assignSubjectSchedule;
        },

        getAssignSubjectScheduleData(state): any {
            return state.assignSubjectScheduleData;
        }
    },
    actions: {
        async list(searchData: AssignSubjectScheduleSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/assign-subject-schedules?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.assignSubjectSchedules = data.value.data as AssignSubjectSchedule[];
                    this.assignSubjectScheduleData = data.value;
                } else {
                    this.assignSubjectSchedules = data.value as AssignSubjectSchedule[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(assignSubjectSchedule: AssignSubjectSchedule) {
            const { data, pending, refresh, error } = await useFetchApi('/api/assign-subject-schedules', {
                method: 'POST', 
                body: assignSubjectSchedule
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, assignSubjectSchedule: AssignSubjectSchedule){
            const { data, pending, refresh, error } = await useFetchApi(`/api/assign-subject-schedules/${id}`, {
                method: 'PATCH', 
                body: assignSubjectSchedule
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/assign-subject-schedules/${id}`, {
                method: 'GET', 
            });

            this.assignSubjectSchedule = data.value as AssignSubjectSchedule;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/assign-subject-schedules/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
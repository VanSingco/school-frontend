import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface AssignSubjectSchedule {
    id?: string;
    school_id?: string;
    section_id: string;
    assign_subject_id: string;
    teacher_id: string;
    classroom_name?: string;
    day: string;
    time_from: string;
    time_to: string;
};

export interface AssignSubjectScheduleSearch {
    orderBy: string;
    page: number;
    search: string;
    paginate: boolean;
    school_id?: string | null;
}


export const useAssignSubjectScheduleStore = defineStore('assignSubject', {
    state: () => {
      return {
        assignSubjectSchedules: [] as AssignSubjectSchedule[],
        assignSubjectSchedule: null as AssignSubjectSchedule | null,
        assignSubjectScheduleData: {},
        models: {
            school_id: '',
            section_id: '',
            assign_subject_id: '',
            teacher_id: '',
            classroom_name: '',
            day: '',
            time_from: '',
            time_to: '',

        } as AssignSubjectSchedule,
      }
    },
    getters: {
        getForms(state) {
            return [
                {key: 'school_id', type: 'select-school', hide: false, required: true, name: 'Select School', cols: 12},
                {key: 'section_id', type: 'select-section', hide: false, required: true, name: 'Select Section', cols: 6},
                {key: 'teacher_id', type: 'select-teacher', hide: false, required: true, name: 'Select Teacher', cols: 6},
                {key: 'classroom_name', type: 'number', hide: false, required: false, name: 'Classroom Name (Optional)', cols: 12},
                {key: 'day', type: 'text', hide: false, required: true, name: 'Select Days', cols: 4},
                {key: 'time_from', type: 'text', hide: false, required: true, name: 'Select Time From', cols: 4},
                {key: 'time_to', type: 'text', hide: false, required: true, name: 'Select Time to', cols: 4},
                
            ];
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
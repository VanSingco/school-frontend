import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface AssignSubject {
    id?: string;
    school_id?: string;
    subject_id: string;
    grade_level_id: string;
    order: number;
};

export interface AssignSubjectSearch {
    orderBy: string;
    page: number;
    search: string;
    paginate: boolean;
    school_id?: string | null;
}


export const useAssignSubjectStore = defineStore('assignSubject', {
    state: () => {
      return {
        assignSubjects: [] as AssignSubject[],
        assignSubject: null as AssignSubject | null,
        assignSubjectData: {},
        models: {
            school_id: '',
            subject_id: '',
            grade_level_id: '',
            order: 0,
        } as AssignSubject,
      }
    },
    getters: {
        getForms(state) {
            return [
                {key: 'school_id', type: 'select-school', hide: false, required: true, name: 'Select School', cols: 12},
                {key: 'subject_id', type: 'select-subject', hide: false, required: true, name: 'Select Subject', cols: 6},
                {key: 'grade_level_id', type: 'select-gradelevel', hide: false, required: true, name: 'Select Grade Level', cols: 6},
                {key: 'order', type: 'number', hide: false, required: true, name: 'Subject order (For Report Card)', cols: 12},
                
            ];
        },
        getAssignSubjects(state): AssignSubject[] {
            return state.assignSubjects;
        },

        getAssignSubject(state): AssignSubject | null {
            return state.assignSubject;
        },

        getAssignSubjectData(state): any {
            return state.assignSubjectData;
        }
    },
    actions: {
        async list(searchData: AssignSubjectSearch) {
            
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/assign-subjects?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.assignSubjects = data.value.data as AssignSubject[];
                    this.assignSubjectData = data.value;
                } else {
                    this.assignSubjects = data.value as AssignSubject[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(assignSubject: AssignSubject) {
            const { data, pending, refresh, error } = await useFetchApi('/api/assign-subjects', {
                method: 'POST', 
                body: assignSubject
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, assignSubject: AssignSubject){
            const { data, pending, refresh, error } = await useFetchApi(`/api/assign-subjects/${id}`, {
                method: 'PATCH', 
                body: assignSubject
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/assign-subjects/${id}`, {
                method: 'GET', 
            });

            this.assignSubject = data.value as AssignSubject;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/assign-subjects/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
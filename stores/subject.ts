import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface Subject {
    id?: string;
    name: string;
    type: string;
    parent_subject_id?: string;
    ww: number;
    qa: number;
    pt: number;
};

export interface SubjectSearch {
    search: string;
    orderBy: string;
    page?: number;
    paginate: boolean;
}


export const useSubjectStore = defineStore('subject', {
    state: () => {
      return {
        subjects: [] as Subject[],
        subject: null as Subject | null,
        subjectData: {}
      }
    },
    getters: {
        getSubjects(state): Subject[] {
            return state.subjects;
        },

        getSubject(state): Subject | null {
            return state.subject;
        },

        getSubjectData(state): any {
            return state.subjectData;
        }
    },
    actions: {
        async list(searchData: SubjectSearch) {
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/subjects?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.subjects = data.value.data as Subject[];
                    this.subjectData = data.value;
                } else {
                    this.subjects = data.value as Subject[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(subject: Subject) {
            const { data, pending, refresh, error } = await useFetchApi('/api/subjects', {
                method: 'POST', 
                body: subject
            });

            return { data, pending, refresh, error };
        },

        async update(subject: Subject){
            const { data, pending, refresh, error } = await useFetchApi(`/api/subjects/${subject.id}`, {
                method: 'PATCH', 
                body: subject
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/subjects/${id}`, {
                method: 'GET', 
            });

            this.subject = data.value as Subject;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/subjects/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface Subject {
    id?: string;
    school_id?: string;
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
    school_id?: string | null;
}


export const useSubjectStore = defineStore('subject', {
    state: () => {
      return {
        subjects: [] as Subject[],
        subject: null as Subject | null,
        subjectData: {},
        models: {
            school_id: '',
            name: '',
            type: '',
            parent_subject_id:  '',
            ww: 0,
            qa: 0,
            pt: 0,
        }
      }
    },
    getters: {
        getForms(state) {
            return [
                {key: 'school_id', type: 'select-school', hide: false, required: true, name: 'Select School', cols: 12},
                {key: 'name', type: 'text', hide: false, required: true, name: 'Name', cols: 12},
                {key: 'type', type: 'select', required: true, hide: false, name: 'Type', cols: 6, options: [
                    {name: 'Major', value: 'major'},
                    {name: 'Minor', value: 'minor'}
                ]},
                {key: 'parent_subject_id', type: 'select-subject', required: false, hide: false, name: 'Select Parent Subject (Optional)', cols: 6},
    
                {key: 'ww', type: 'number', hide: false, required: true, name: 'Written Work (%):', cols: 4},
                {key: 'qa', type: 'number', hide: false, required: true, name: 'Performance Task (%):', cols: 4},
                {key: 'pt', type: 'number', hide: false, required: true, name: 'Quarterly Assisment (%):', cols: 4},
              ]
        },
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

        async update(id: string, subject: Subject){
            const { data, pending, refresh, error } = await useFetchApi(`/api/subjects/${id}`, {
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
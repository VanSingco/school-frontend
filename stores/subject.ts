import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();

export interface Subject {
    id?: string;
    school_id?: string;
    name: string;
    type: string;
    parent_subject_id?: string;
    ww: number;
    qa: number;
    pt: number;
    ww_min_task: number;
    ww_max_task: number;
    qa_min_task: number;
    qa_max_task: number;
    pt_min_task: number;
    pt_max_task: number;
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
            school_id: school.school ? school.school.id : null,
            name: '',
            type: '',
            parent_subject_id:  '',
            ww: 0,
            qa: 0,
            pt: 0,
            ww_min_task: 0,
            ww_max_task: 0,
            qa_min_task: 0,
            qa_max_task: 0,
            pt_min_task: 0,
            pt_max_task: 0,
        }
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},
                {key: 'name', type: 'text', hide: false, required: true, name: 'Name', cols: 12},
                {key: 'type', type: 'select', required: true, hide: false, name: 'Type', cols: 6, options: [
                    {name: 'Major', value: 'major'},
                    {name: 'Minor', value: 'minor'}
                ]},
                {key: 'parent_subject_id', type: 'select-subject', required: false, hide: false, name: 'Select Parent Subject (Optional)', cols: 6},
    
                {key: 'ww', type: 'number', hide: false, required: true, name: 'Written Work (%):', cols: 6},
                {key: 'ww_min_task', type: 'number', hide: false, required: true, name: 'Written Work Min Task:', cols: 3},
                {key: 'ww_max_task', type: 'number', hide: false, required: true, name: 'Written Work Max Task', cols: 3},
                {key: 'pt', type: 'number', hide: false, required: true, name: 'Performance Task (%):', cols: 6},
                {key: 'pt_min_task', type: 'number', hide: false, required: true, name: 'Performance Min Task:', cols: 3},
                {key: 'pt_max_task', type: 'number', hide: false, required: true, name: 'Performance Max Task:', cols: 3},
                {key: 'qa', type: 'number', hide: false, required: true, name: 'Quarterly Assisment (%):', cols: 6},
                {key: 'qa_min_task', type: 'number', hide: false, required: true, name: 'Quarterly Min Task:', cols: 3},
                {key: 'qa_max_task', type: 'number', hide: false, required: true, name: 'Quarterly Max Task:', cols: 3},
              ]
        },
        getSubjects(state): Subject[] {
            return state.subjects;
        },

        getSelect(state): any {
            let options: any = [];
            state.subjects.map(item => options.push({value: item.id, text: item.name}))
            return options;
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
            if (school.school) {
                searchData.school_id = school.school.id
            }
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
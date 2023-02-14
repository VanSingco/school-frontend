import { GradeLevel } from './gradeLevel';
import { Subject } from './subject';
import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';
const school = useSchoolStore();

export interface AssignSubject {
    id?: string;
    school_id?: string;
    subject_id: string;
    grade_level_id: string;
    subject?: Subject
    grade_level?: GradeLevel
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
            school_id: school.school ? school.school.id : null,
            subject_id: '',
            grade_level_id: '',
            order: 0,
        } as AssignSubject,
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;

            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},
                {key: 'subject_id', type: 'select-subject', hide: false, required: true, name: 'Select Subject', cols: 6},
                {key: 'grade_level_id', type: 'select-gradelevel', hide: false, required: true, name: 'Select Grade Level', cols: 6},
                {key: 'order', type: 'number', hide: false, required: true, name: 'Subject order (For Report Card)', cols: 12},
                
            ];
        },
        getAssignSubjects(state): AssignSubject[] {
            return state.assignSubjects;
        },

        getSelect(state): any {
            let options: any = [];
            state.assignSubjects.map(item => options.push({value: item.id, text: `${item.subject ? item.subject.name : ''} - ${item.grade_level ? item.grade_level.name : ''}`}))
            return options;
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
            if (school.school) {
                searchData.school_id = school.school.id
            }
            
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
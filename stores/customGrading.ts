import { GradeLevel } from './gradeLevel';
import { Teacher } from './teacher';
import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();

export interface CustomGradingGradeLevel {
    id?: string;
    school_id?: string;
    custom_grading_id?: string;
    grade_level_id: string;
    grade_level?: GradeLevel
};

export interface CustomGrading {
    id?: string;
    school_id?: string;
    name: string;
    type: string;
    custom_grading_grade_levels?: CustomGradingGradeLevel[]
};

export interface CustomGradingSearch {
    orderBy: string;
    page: number;
    search: string;
    paginate: boolean;
    school_id?: string | null;
}


export const useCustomGradingStore = defineStore('customGrading', {
    state: () => {
      return {
        customGradings: [] as CustomGrading[],
        customGrading: null as CustomGrading | null,
        customGradingData: {},
        models: {
            school_id: school.school ? school.school.id : null,
            name: '',
            type: '',
            grade_level_ids: [] as any,
        },
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},
                {key: 'name', type: 'text', hide: false, required: true, name: 'Name', cols: 12},
                {key: 'type', type: 'select', hide: false, required: true, name: 'Select Type', cols: 6, options: [
                    {name: 'semester', value: 'Semester'},
                    {name: 'quarter', value: 'quarter'},
                ]},
                {key: 'grade_level_ids', type: 'select-gradelevel-multiple', hide: false, required: true, name: 'Select Grade Level', cols: 6},
                
            ];
        },
        getCustomGradings(state): CustomGrading[] {
            return state.customGradings;
        },

        getSelect(state): any {
            let options: any = [];
            state.customGradings.map(item => options.push({value: item.id, text: `${item.name} - ${item.grade_level ? item.grade_level.name : ''}`}))
            return options;
        },

        getCustomGrading(state): CustomGrading | null {
            return state.customGrading;
        },

        getCustomGradingData(state): any {
            return state.customGradingData;
        }
    },
    actions: {
        async list(searchData: CustomGradingSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-gradings?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.customGradings = data.value.data as CustomGrading[];
                    this.customGradingData = data.value;
                } else {
                    this.customGradings = data.value as CustomGrading[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(customGrading: CustomGrading) {
            const { data, pending, refresh, error } = await useFetchApi('/api/custom-gradings', {
                method: 'POST', 
                body: customGrading
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, customGrading: CustomGrading){
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-gradings/${id}`, {
                method: 'PATCH', 
                body: customGrading
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-gradings/${id}`, {
                method: 'GET', 
            });

            this.customGrading = data.value as CustomGrading;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-gradings/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
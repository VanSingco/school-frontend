import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();

export interface GradeLevel {
    id?: string;
    school_id?: string;
    name: string;
};

export interface GradeLevelSearch {
    orderBy: string;
    page: number;
    paginate: boolean;
    school_id?: string | null;
}


export const useGradeLevelStore = defineStore('gradeLevel', {
    state: () => {
      return {
        gradeLevels: [] as GradeLevel[],
        gradeLevel: null as GradeLevel | null,
        gradeLevelData: {},
        models: {
            school_id: '',
            name: ''
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
            ];
        },
        getGradeLevels(state): GradeLevel[] {
            return state.gradeLevels;
        },

        getSelect(state): any {
            let options: any = [];
            state.gradeLevels.map(item => options.push({value: item.id, text: item.name}))
            return options;
        },


        getGradeLevel(state): GradeLevel | null {
            return state.gradeLevel;
        },

        getGradeLevelData(state): any {
            return state.gradeLevelData;
        }
    },
    actions: {
        async list(searchData: GradeLevelSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/grade-levels?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.gradeLevels = data.value.data as GradeLevel[];
                    this.gradeLevelData = data.value;
                } else {
                    this.gradeLevels = data.value as GradeLevel[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(gradeLevel: GradeLevel) {
            const { data, pending, refresh, error } = await useFetchApi('/api/grade-levels', {
                method: 'POST', 
                body: gradeLevel
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, gradeLevel: GradeLevel){
            const { data, pending, refresh, error } = await useFetchApi(`/api/grade-levels/${id}`, {
                method: 'PATCH', 
                body: gradeLevel
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/grade-levels/${id}`, {
                method: 'GET', 
            });

            this.gradeLevel = data.value as GradeLevel;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/grade-levels/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
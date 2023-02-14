import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();

export interface SchoolYear {
    id?: string;
    school_id?: string;
    from: string;
    to: string;
    school_year?: string;
    is_active: boolean | string;
};

export interface SchoolYearSearch {
    orderBy: string;
    page: number;
    paginate: boolean;
    school_id?: string | null;
}


export const useSchoolYearStore = defineStore('schoolYear', {
    state: () => {
      return {
        schoolYears: [] as SchoolYear[],
        schoolYear: null as SchoolYear | null,
        schoolYearData: {},
        models: {
            school_id: school.school ? school.school.id : null,
            from: '',
            to: '',
            is_active: false
        } as SchoolYear
      }
    },
    getters: {
        getForms(state){
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;

            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School:', cols: 12},
                {key: 'from', type: 'text', hide: false, required: true, name: 'From Year:', cols: 6},
                {key: 'to', type: 'text', hide: false, required: true, name: 'To Year:', cols: 6},
                {key: 'is_active', type: 'checkbox', hide: false, required: false, name: 'Is this active?', cols: 6},
            ]
        },
        getSchoolYears(state): SchoolYear[] {
            return state.schoolYears;
        },

        getSchoolYear(state): SchoolYear | null {
            return state.schoolYear;
        },

        getSelect(state): any {
            let options: any = [];
            state.schoolYears.map(item => options.push({value: item.id, text: item.school_year}))
            return options;
        },

        getSchoolYearData(state): any {
            return state.schoolYearData;
        }
    },
    actions: {
        async list(searchData: SchoolYearSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/school-years?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.schoolYears = data.value.data as SchoolYear[];
                    this.schoolYearData = data.value;
                } else {
                    this.schoolYears = data.value as SchoolYear[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(schoolYear: SchoolYear) {
            const { data, pending, refresh, error } = await useFetchApi('/api/school-years', {
                method: 'POST', 
                body: schoolYear
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, schoolYear: SchoolYear){
            const { data, pending, refresh, error } = await useFetchApi(`/api/school-years/${id}`, {
                method: 'PATCH', 
                body: schoolYear
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/school-years/${id}`, {
                method: 'GET', 
            });

            this.schoolYear = data.value as SchoolYear;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/school-years/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface SchoolYear {
    id?: string;
    from: string;
    to: string;
    school_year?: string;
    is_active: boolean | string;
};

export interface SchoolYearSearch {
    orderBy: string;
    page: number;
    paginate: boolean;
}


export const useSchoolYearStore = defineStore('schoolYear', {
    state: () => {
      return {
        schoolYears: [] as SchoolYear[],
        schoolYear: null as SchoolYear | null,
        schoolYearData: {}
      }
    },
    getters: {
        getSchoolYears(state): SchoolYear[] {
            return state.schoolYears;
        },

        getSchoolYear(state): SchoolYear | null {
            return state.schoolYear;
        },

        getSchoolYearData(state): any {
            return state.schoolYearData;
        }
    },
    actions: {
        async list(searchData: SchoolYearSearch) {
            
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

        async update(schoolYear: SchoolYear){
            const { data, pending, refresh, error } = await useFetchApi(`/api/school-years/${schoolYear.id}`, {
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
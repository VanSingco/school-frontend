import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface School {
    id?: string;
    id_number: number;
    name: string;
    email: string;
    contact_no: number;
    logo: string;
    subname: string;
    curricular_offering: string;
    classification: string;
    district: string;
    division: string;
    region: string;
    city: string;
    country: string;
    address: string;
    accredited_to_deped: string;
    description: string;
    mission: string;
    vision: string;
    status: string;
}

export interface SchoolSearch {
    orderBy: string;
    search: string;
    page: number;
    paginate: boolean;
}


export const useSchoolStore = defineStore('school', {
    state: () => {
      return {
        schools: [] as School[],
        school: null as School | null,
        schoolData: {}
      }
    },
    getters: {
        getSchools(state): School[] {
            return state.schools;
        },

        getSchool(state): School | null {
            return state.school;
        },

        getSchoolData(state): any {
            return state.schoolData;
        }
    },
    actions: {
        async list(searchData: SchoolSearch) {
            
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/schools?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.schools = data.value.data as School[];
                    this.schoolData = data.value;
                } else {
                    this.schools = data.value as School[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(school: School) {
            const { data, pending, refresh, error } = await useFetchApi('/api/schools', {
                method: 'POST', 
                body: school
            });

            return { data, pending, refresh, error };
        },

        async update(school: School){
            const { data, pending, refresh, error } = await useFetchApi(`/api/schools/${school.id}`, {
                method: 'PATCH', 
                body: school
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/schools/${id}`, {
                method: 'GET', 
            });

            this.school = data.value as School;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/schools/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
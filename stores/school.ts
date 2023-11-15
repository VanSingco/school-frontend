import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useConfigStore } from './config';
import { configSelectOptions } from '~~/utils/custom';

export interface School {
    id?: string;
    id_number: number;
    name: string;
    school_head: string;
    email: string;
    contact_no: number;
    logo: string;
    curricular_offering: string;
    classification: string;
    district: string;
    division: string;
    region: string;
    city: string;
    province: string;
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
        schoolData: {},

        models: {
            id_number: 0,
            name: "",
            school_head: "",
            email: "",
            contact_no: 0,
            logo: "",
            curricular_offering: "",
            classification: "",
            district: "",
            division: "",
            region: "",
            city: "",
            province: "",
            country: "philippines",
            address: "",
            accredited_to_deped: "",
            description: "",
            mission: "",
            vision: "",
            status: "",
        },
      }
    },
    getters: {
        getForms(): any {
            const useConfig = useConfigStore();
            const curricular_offering_options = configSelectOptions(useConfig.getConfig?.school.curricular_offering, 'array-object');
            const classification_options = configSelectOptions(useConfig.getConfig?.school.classification, 'array');
            const status_options = configSelectOptions(useConfig.getConfig?.school.status, 'array');
            return  [
                {key: 'name', type: 'text', hide: false, required: true, name: 'School Name', cols: 6},
                {key: 'id_number', type: 'number', hide: false, required: true, name: 'School ID', cols: 6},
                {key: 'school_head', type: 'text', hide: false, required: true, name: 'School Head', cols: 4},
                {key: 'email', type: 'email', hide: false, required: true, name: 'School Email', cols: 4},
                {key: 'contact_no', type: 'number', hide: false, required: true, name: 'School Contact No.', cols: 4},
                {key: 'curricular_offering', type: 'select', hide: false, required: true, name: 'Curricular Offering', cols: 12, options: curricular_offering_options},
                {key: 'classification', type: 'select', hide: false, required: true, name: 'Classification', cols: 12, options: classification_options},
                {key: 'division', type: 'text', hide: false, required: true, name: 'Division', cols: 6},
                {key: 'district', type: 'text', hide: false, required: true, name: 'District', cols: 6},
                {key: 'region', type: 'select-country', hide: false, required: true, name: 'Region', cols: 4},
                {key: 'province', type: 'select-country', hide: false, required: true, name: 'Province', cols: 4},
                {key: 'city', type: 'select-country', hide: false, required: true, name: 'City', cols: 4},
                {key: 'address', type: 'text', hide: false, required: true, name: 'Address / Barangay', cols: 6},
                {key: 'accredited_to_deped', hide: false, type: 'select', required: true, name: 'School Accredited By Deped', cols: 6, options: [
                    {name: 'Yes', value: 'yes'},
                    {name: 'No', value: 'no'}
                ]},
                {key: 'mission', type: 'textarea', hide: false, required: true, name: 'School Mission', cols: 6},
                {key: 'vision', type: 'textarea', hide: false, required: true, name: 'School Vission', cols: 6},
                {key: 'description', type: 'textarea', hide: false, required: true, name: 'School About', cols: 12},
                {key: 'status', type: 'select', hide: false, required: true, name: 'Status', cols: 12, adminOnly: true, options: status_options}
                
            ]
        },
        getSchools(state): School[] {
            return state.schools;
        },

        getSelect(state): any {
            let options: any = [];
            state.schools.map(item => options.push({value: item.id, text: item.name}))
            return options;
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
            const formData = new FormData();
            for (const key in school) {
                if (Object.prototype.hasOwnProperty.call(school, key)) {
                    formData.append(key, school[key]); 
                }
            }

            const { data, pending, refresh, error } = await useFetchApi('/api/schools', {
                method: 'POST', 
                body: formData
            });

            return { data, pending, refresh, error };
        },

        async update(id:string, school: School){
            const formData = new FormData();
            for (const key in school) {
                if (Object.prototype.hasOwnProperty.call(school, key)) {
                    formData.append(key, school[key]); 
                }
            }

            formData.append('id', id);
            formData.append('_method', 'PATCH'); 

            const { data, pending, refresh, error } = await useFetchApi(`/api/schools/${id}`, {
                method: 'POST', 
                body: formData
            });

            return { data, pending, refresh, error };
        },

        async getBySubdomain(subdomain: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/schools/subdomain/${subdomain}`, {
                method: 'GET', 
            });

            this.school = data.value as School;

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
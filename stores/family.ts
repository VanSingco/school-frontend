import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();

export interface Family {
    id?: string;
    user_id?: string;
    school_id: string;
    primary_contact_person: string;
    primary_contact_number: number;
    primary_contact_email: string;
    father_first_name: string;
    father_last_name: string;
    father_middle_name: string;
    father_suffix_name: string;
    father_contact_no: string;
    father_birth_date: string;
    father_occupation: string;
    father_highest_education_attaiment: string;
    mother_first_name: string;
    mother_last_name: string;
    mother_middle_name: string;
    mother_suffix_name: string;
    mother_contact_no: number;
    mother_birth_date: string;
    mother_occupation: string;
    mother_highest_education_attaiment: string;
    guardian_first_name: string;
    guardian_last_name: string;
    guardian_middle_name: string;
    guardian_suffix_name: string;
    guardian_contact_no: number;
    guardian_birth_date: string;
    guardian_occupation: string;
    guardian_highest_education_attaiment: string;
    is_active: boolean;
};

export interface FamilySearch {
    orderBy: string;
    page: number;
    search: string;
    paginate: boolean;
    school_id?: string | null;
}


export const useFamilyStore = defineStore('family', {
    state: () => {
      return {
        families: [] as Family[],
        family: null as Family | null,
        familyData: {},
        models: {
            school_id: school.school ? school.school.id : null,
            primary_contact_person: '',
            primary_contact_number: 0,
            primary_contact_email: '',
            father_first_name: '',
            father_last_name: '',
            father_middle_name: '',
            father_suffix_name: '',
            father_contact_no: '',
            father_birth_date: '',
            father_occupation: '',
            father_highest_education_attaiment: '',
            mother_first_name: '',
            mother_last_name: '',
            mother_middle_name: '',
            mother_suffix_name: '',
            mother_contact_no: 0,
            mother_birth_date: '',
            mother_occupation: '',
            mother_highest_education_attaiment: '',
            guardian_first_name: '',
            guardian_last_name: '',
            guardian_middle_name: '',
            guardian_suffix_name: '',
            guardian_contact_no: 0,
            guardian_birth_date: '',
            guardian_occupation: '',
            guardian_highest_education_attaiment: '',
            is_active: true,
        } as Family,
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},

                {key: 'primary_contact_person', type: 'text', hide: false, required: true, name: 'Primary Contact Person *', cols: 4},
                {key: 'primary_contact_number', type: 'number', hide: false, required: true, name: 'Primary Contact No *', cols: 4},
                {key: 'primary_contact_email', type: 'email', hide: false, required: true, name: 'Primary Email *', cols: 4},
                
                {key: 'father_first_name', type: 'text', hide: false, required: false, name: 'Father First Name', cols: 3},
                {key: 'father_last_name', type: 'text', hide: false, required: false, name: 'Father Last Name', cols: 3},
                {key: 'father_middle_name', type: 'text', hide: false, required: false, name: 'Father Middle Name', cols: 3},
                {key: 'father_suffix_name', type: 'text', hide: false, required: false, name: 'Father Suffix Name', cols: 3},
                {key: 'father_contact_no', type: 'number', hide: false, required: false, name: 'Father Contact No', cols: 6},
                {key: 'father_birth_date', type: 'date', hide: false, required: false, name: 'Father Birth Date', cols: 6},
                {key: 'father_highest_education_attaiment', hide: false, type: 'select', required: false, name: 'Father Highest Education Attaiment', options: [
                    {name: 'High School Graduate', value: 'high school graduate'},
                    {name: "Bachelor's Degree", value: "bachelor's degree"},
                    {name: "Master's Degree", value: "master's degree"},
                    {name: "Doctoral Or Profissional Degree", value: 'doctoral or profissional degree'},
                    {name: "Vocational / Technical", value: "vocational / technical"},
                    {name: "others", value: "others"},
                ], cols: 12},

                {key: 'mother_first_name', type: 'text', hide: false, required: false, name: 'Mother First Name', cols: 3},
                {key: 'mother_last_name', type: 'text', hide: false, required: false, name: 'Mother Last Name', cols: 3},
                {key: 'mother_middle_name', type: 'text', hide: false, required: false, name: 'Mother Middle Name', cols: 3},
                {key: 'mother_suffix_name', type: 'text', hide: false, required: false, name: 'Mother Suffix Name', cols: 3},
                {key: 'mother_contact_no', type: 'number', hide: false, required: false, name: 'Mother Contact No', cols: 6},
                {key: 'mother_birth_date', type: 'date', hide: false, required: false, name: 'Mother Birth Date', cols: 6},
                {key: 'mother_highest_education_attaiment', hide: false, type: 'select', required: false, name: 'Mother Highest Education Attaiment', options: [
                    {name: 'High School Graduate', value: 'high school graduate'},
                    {name: "Bachelor's Degree", value: "bachelor's degree"},
                    {name: "Master's Degree", value: "master's degree"},
                    {name: "Doctoral Or Profissional Degree", value: 'doctoral or profissional degree'},
                    {name: "Vocational / Technical", value: "vocational / technical"},
                    {name: "others", value: "others"},
                ], cols: 12},

                {key: 'guardian_first_name', type: 'text', hide: false, required: false, name: 'Guardian First Name', cols: 3},
                {key: 'guardian_last_name', type: 'text', hide: false, required: false, name: 'Guardian Last Name', cols: 3},
                {key: 'guardian_middle_name', type: 'text', hide: false, required: false, name: 'Guardian Middle Name', cols: 3},
                {key: 'guardian_suffix_name', type: 'text', hide: false, required: false, name: 'Guardian Suffix Name', cols: 3},
                {key: 'guardian_contact_no', type: 'number', hide: false, required: false, name: 'Guardian Contact No', cols: 6},
                {key: 'guardian_birth_date', type: 'date', hide: false, required: false, name: 'Guardian Birth Date', cols: 6},
                {key: 'guardian_highest_education_attaiment', hide: false, type: 'select', required: false, name: 'Guardian Highest Education Attaiment', options: [
                    {name: 'High School Graduate', value: 'high school graduate'},
                    {name: "Bachelor's Degree", value: "bachelor's degree"},
                    {name: "Master's Degree", value: "master's degree"},
                    {name: "Doctoral Or Profissional Degree", value: 'doctoral or profissional degree'},
                    {name: "Vocational / Technical", value: "vocational / technical"},
                    {name: "others", value: "others"},
                ], cols: 12},   
                
            ];
        },
        getFamilies(state): Family[] {
            return state.families;
        },

        getSelect(state): any {
            let options: any = [];
            state.families.map(item => options.push({value: item.id, text: item.primary_contact_person}))
            return options;
        },

        getFamily(state): Family | null {
            return state.family;
        },

        getFamilyData(state): any {
            return state.familyData;
        }
    },
    actions: {
        async list(searchData: FamilySearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/families?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.families = data.value.data as Family[];
                    this.familyData = data.value;
                } else {
                    this.families = data.value as Family[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(family: Family) {
            const { data, pending, refresh, error } = await useFetchApi('/api/families', {
                method: 'POST', 
                body: family
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, family: Family){
            const { data, pending, refresh, error } = await useFetchApi(`/api/families/${id}`, {
                method: 'PATCH', 
                body: family
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/families/${id}`, {
                method: 'GET', 
            });

            this.family = data.value as Family;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/families/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
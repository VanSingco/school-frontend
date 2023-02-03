import { useSchoolStore } from './school';
import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface Teacher {
    id?: string;
    user_id?: string;
    school_id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    suffix_name: string;
    contact_no: number;
    email: string;
    major: string;
    picture: string;
    gender: string;
    birth_date: Date;
    birth_place: string;
    citizenship: string;
    street_address: string;
    barangay: string;
    city: string;
    region: string;
    province: string;
    country: string; 
    highest_education_attaiment:string; 
    zipcode: number;
    is_active: boolean | string;
};

export interface TeacherSearch {
    orderBy: string;
    search: string;
    page: number;
    paginate: boolean;
    school_id?: string | null;
}



export const useTeacherStore = defineStore('teacher', {
    state: () => {
      return {
        teachers: [] as Teacher[],
        teacher: null as Teacher | null,
        teacherData: {},
        models: {
            school_id: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            suffix_name: '',
            contact_no: 0,
            email: '',
            major: 'n/a',
            picture: '',
            gender: '',
            birth_date: new Date,
            birth_place: '',
            citizenship: '',
            street_address: '',
            barangay: '',
            city: '',
            region: '',
            province: '',
            country: 'philippines',  
            zipcode: 0,
            highest_education_attaiment: '',
            is_active: true
        } as Teacher,
      }
    },
    getters: {

        getForms(state): any {
            return [
                {key: 'school_id', type: 'select-school', hide: false, required: true, name: 'Select School', cols: 12},
                {key: 'first_name', type: 'text', hide: false, required: true, name: 'First Name', cols: 6},
                {key: 'last_name', type: 'text', hide: false, required: true, name: 'Last Name', cols: 6},
                {key: 'middle_name', type: 'text', hide: false, required: true, name: 'Middle Name', cols: 6},
                {key: 'suffix_name', type: 'text', hide: false, required: false, name: 'Suffix Name', cols: 6},
                {key: 'contact_no', type: 'number', hide: false, required: true, name: 'Contact No.', cols: 12},
                {key: 'email', type: 'email', hide: false, required: true, name: 'Email Address', cols: 6},
                {key: 'major', type: 'text', hide: false, required: true, name: 'Major', cols: 6},
                {key: 'gender', type: 'select', hide: false, required: true, name: 'Gender', cols: 4, options: [
                    {name: 'Male', value: 'male'},
                    {name: 'Female', value: 'female'},
                ]},
                {key: 'birth_date', type: 'date', hide: false, required: true, name: 'Birth Date', cols: 4},
                {key: 'birth_place', type: 'text', hide: false, required: true, name: 'Birth Place', cols: 4},
                {key: 'citizenship', type: 'text', hide: false, required: true, name: 'Citizenship', cols: 12},
                {key: 'region', type: 'select-country', hide: false, required: true, name: 'Region', cols: 4, options: []},
                {key: 'province', type: 'select-country', hide: false, required: true, name: 'Province', cols: 4, options: []},
                {key: 'city', type: 'select-country', hide: false, required: true, name: 'City', cols: 4, options: []},
                {key: 'barangay', type: 'select-country', hide: false, required: true, name: 'Barangay', cols: 6, options: []},
                {key: 'street_address', type: 'text', hide: false, required: true, name: 'Street Address', cols: 6},
                {key: 'zipcode', type: 'number', hide: false, required: true, name: 'Zipcode', cols: 6},
                {key: 'highest_education_attaiment', hide: false, type: 'select', required: true, name: 'Highest Education Attaiment', options: [
                    {name: 'High School Graduate', value: 'high school graduate'},
                    {name: "Bachelor's Degree", value: "bachelor's degree"},
                    {name: "Master's Degree", value: "master's degree"},
                    {name: "Doctoral Or Profissional Degree", value: 'doctoral or profissional degree'},
                    {name: "Vocational / Technical", value: "vocational / technical"},
                    {name: "others", value: "others"},
                ], cols: 6},
                {key: 'is_active', type: 'checkbox', hide: false, required: true, name: 'Is Teacher Active', cols: 12},
            ]
        },
        
        getTeachers(state): Teacher[] {
            return state.teachers;
        },

        getTeacher(state): Teacher | null {
            return state.teacher;
        },

        getTeacherData(state): any {
            return state.teacherData;
        },
    },
    actions: {
        async list(searchData: TeacherSearch) {
            
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/teachers?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.teachers = data.value.data as Teacher[];
                    this.teacherData = data.value;
                } else {
                    this.teachers = data.value as Teacher[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(teacher: Teacher) {
            const formData = new FormData();

            for (const key in teacher) {
                if (Object.prototype.hasOwnProperty.call(teacher, key)) {
                    formData.append(key, teacher[key]); 
                }
            }

            const { data, pending, refresh, error } = await useFetchApi('/api/teachers', {
                method: 'POST', 
                body: formData,
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, teacher: Teacher){
            const formData = new FormData();
            for (const key in teacher) {
                if (Object.prototype.hasOwnProperty.call(teacher, key)) {
                    formData.append(key, teacher[key]); 
                }
            }

            formData.append('id', id);
            formData.append('_method', 'PATCH'); 

            const { data, pending, refresh, error } = await useFetchApi(`/api/teachers/${id}`, {
                method: 'POST', 
                body: formData
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/teachers/${id}`, {
                method: 'GET', 
            });

            this.teacher = data.value as Teacher;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/teachers/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
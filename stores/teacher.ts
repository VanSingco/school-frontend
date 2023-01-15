import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface Teacher {
    id?: string;
    user_id?: string;
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
    zipcode: number;
};

export interface TeacherSearch {
    orderBy: string;
    search: string;
    page: number;
    paginate: boolean;
}

export const useTeacherStore = defineStore('teacher', {
    state: () => {
      return {
        teachers: [] as Teacher[],
        teacher: null as Teacher | null,
        teacherData: {},
        models: {
            first_name: '',
            last_name: '',
            middle_name: '',
            suffix_name: '',
            contact_no: '',
            email: '',
            major: '',
            picture: '',
            gender: '',
            birth_date: '',
            birth_place: '',
            citizenship: '',
            street_address: '',
            barangay: '',
            city: '',
            region: '',
            province: '',
            country: 'philippines',  
            zipcode: '',
            highest_education_attaiment: '',
            is_active: true
        },

        forms: [
            {key: 'first_name', type: 'text', required: true, name: 'First Name', cols: 6},
            {key: 'last_name', type: 'text', required: true, name: 'Last Name', cols: 6},
            {key: 'middle_name', type: 'text', required: true, name: 'Middle Name', cols: 6},
            {key: 'suffix_name', type: 'text', required: false, name: 'Suffix Name', cols: 6},
            {key: 'contact_no', type: 'number', required: true, name: 'Contact No.', cols: 12},
            {key: 'email', type: 'email', required: true, name: 'Email Address', cols: 6},
            {key: 'major', type: 'text', required: true, name: 'Your Major', cols: 6},
            {key: 'gender', type: 'select', required: true, name: 'Gender', cols: 4, options: [
                {name: 'Male', value: 'male'},
                {name: 'Female', value: 'female'},
            ]},
            {key: 'birth_date', type: 'date', required: true, name: 'Birth Date', cols: 4},
            {key: 'birth_place', type: 'text', required: true, name: 'Birth Place', cols: 4},
            {key: 'citizenship', type: 'text', required: true, name: 'Citizenship', cols: 12},
            {key: 'region', type: 'select-country', required: true, name: 'Region', cols: 4, options: []},
            {key: 'province', type: 'select-country', required: true, name: 'Province', cols: 4, options: []},
            {key: 'city', type: 'select-country', required: true, name: 'City', cols: 4, options: []},
            {key: 'barangay', type: 'select-country', required: true, name: 'Barangay', cols: 6, options: []},
            {key: 'street_address', type: 'text', required: true, name: 'Street Address', cols: 6},
            {key: 'zipcode', type: 'number', required: true, name: 'Zipcode', cols: 6},
            {key: 'highest_education_attaiment', type: 'select', required: true, name: 'Highest Education Attaiment', options: [
                {name: 'High School Graduate', value: 'high school graduate'},
                {name: "Bachelor's Degree", value: "bachelor's degree"},
                {name: "Master's Degree", value: "master's degree"},
                {name: "Doctoral Or Profissional Degree", value: 'doctoral or profissional degree'},
                {name: "Vocational / Technical", value: "vocational / technical"},
                {name: "others", value: "others"},
            ], cols: 6},
            {key: 'is_active', type: 'checkbox', required: true, name: 'Is Teacher Active', cols: 12},
        ]
      }
    },
    getters: {
        
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

        async update(teacher: Teacher){
            const { data, pending, refresh, error } = await useFetchApi(`/api/teachers/${teacher.id}`, {
                method: 'PATCH', 
                body: teacher
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
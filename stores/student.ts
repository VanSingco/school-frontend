import { Section } from './section';
import { SchoolYear } from './schoolYear';
import { GradeLevel } from './gradeLevel';
import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';
import { useConfigStore } from './config';
import { configSelectOptions } from '~~/utils/custom';

const school = useSchoolStore();

export interface Student {
    id?: string;
    school_id: string;
    user_id?: string;
    family_id?: string;
    lrn: string;
    number?: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    suffix_name: string;
    id_picture: string;
    gender: string;
    birth_date: string;
    birth_place: string;
    citizenship: string;
    mother_tongue: string;
    religion: string;
    street_address: string;
    barangay: string;
    city: string;
    region: string;
    province: string;
    country: string;
    zipcode: string;
    status: string;
    type: string;
    payment_options: string;
    grade_level_id: string;
    last_grade_level_id: string;
    school_year_id: string;
    last_school_year_id: string;
    primary_contact_person: string;
    primary_contact_no: string;
    primary_contact_relationship: string;
    grade_level?: GradeLevel;
    last_grade_level?: GradeLevel;
    school_year?: SchoolYear;
    last_school_year?: SchoolYear;
    section?: Section;
};

export interface StudentSearch {
    search: string;
    orderBy: string;
    page: number;
    paginate: boolean;
    school_id?: string | null;
    grade_level_id?: string | null;
}


export const useStudentStore = defineStore('student', {
    state: () => {
      return {
        students: [] as Student[],
        student: null as Student | null,
        studentData: {},
        models: {
            school_id: school.school ? school.school.id : null,
            family_id: '',
            lrn: '',
            number: 0,
            first_name: '',
            last_name: '',
            middle_name: '',
            suffix_name: '',
            id_picture: '',
            gender: '',
            birth_date: '',
            birth_place: '',
            citizenship: '',
            mother_tongue: '',
            religion: '',
            street_address: '',
            barangay: '',
            city: '',
            region: '',
            province: '',
            country: 'philippines',
            zipcode: '',
            status: '',
            type: '',
            payment_options: '',
            grade_level_id: '',
            last_grade_level_id: '',
            school_year_id: '',
            last_school_year_id: '',
            primary_contact_person: '',
            primary_contact_no: '',
            primary_contact_relationship: '',
        } as Student
      }
    },
    getters: {
        getForms(state){
            const cookie_user = useCookie('user');

            const useConfig = useConfigStore();
            
            const status_options = configSelectOptions(useConfig.getConfig?.student.status, 'array');
            const type_options = configSelectOptions(useConfig.getConfig?.student.type, 'array');
            const gender_options = configSelectOptions(useConfig.getConfig?.student.gender, 'array');
            const payment_options = configSelectOptions(useConfig.getConfig?.student.payment_options, 'array');
            
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            
            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},
                {key: 'family_id', type: 'select-family', hide: false, required: false, name: 'Select Family', cols: 12},
                {key: 'lrn', type: 'text', hide: false, required: false, name: 'LRN', cols: 12},
                {key: 'first_name', type: 'text', hide: false, required: true, name: 'First Name', cols: 6},
                {key: 'last_name', type: 'text', hide: false, required: true, name: 'Last Name', cols: 6},
                {key: 'middle_name', type: 'text', hide: false, required: true, name: 'Middle Name', cols: 6},
                {key: 'suffix_name', type: 'text', hide: false, required: false, name: 'Suffix Name', cols: 6},
                {key: 'gender', type: 'select', hide: false, required: true, name: 'Gender', cols: 4, options: gender_options},
                {key: 'birth_date', type: 'date', hide: false, required: true, name: 'Birth Date', cols: 4},
                {key: 'birth_place', type: 'text', hide: false, required: true, name: 'Birth Place', cols: 4},
                {key: 'citizenship', type: 'text', hide: false, required: true, name: 'Citizenship', cols: 12},
                {key: 'mother_tongue', type: 'text', hide: false, required: true, name: 'Mother Tongue', cols: 6},
                {key: 'religion', type: 'text', hide: false, required: true, name: 'religion', cols: 6},
                {key: 'region', type: 'select-country', hide: false, required: true, name: 'Region', cols: 4, options: []},
                {key: 'province', type: 'select-country', hide: false, required: true, name: 'Province', cols: 4, options: []},
                {key: 'city', type: 'select-country', hide: false, required: true, name: 'City', cols: 4, options: []},
                {key: 'barangay', type: 'select-country', hide: false, required: true, name: 'Barangay', cols: 6, options: []},
                {key: 'street_address', type: 'text', hide: false, required: true, name: 'Street Address', cols: 6},
                {key: 'zipcode', type: 'text', hide: false, required: true, name: 'Zipcode', cols: 12},
                {key: 'status', type: 'select', hide: false, required: true, name: 'Status', cols: 6, options: status_options},
                {key: 'type', type: 'select', hide: false, required: true, name: 'Type', cols: 6, options: type_options},
                {key: 'payment_options', type: 'select', hide: false, required: true, name: 'Payment Option', cols: 12, options: payment_options},
                {key: 'grade_level_id', type: 'select-gradelevel', hide: false, required: true, name: 'Active Grade Level', cols: 6, options: []},
                {key: 'last_grade_level_id', type: 'select-gradelevel', hide: false, required: true, name: 'Last Grade Level', cols: 6, options: []},
                {key: 'school_year_id', type: 'select-schoolyear', hide: false, required: true, name: 'Active School Year', cols: 6, options: []},
                {key: 'last_school_year_id', type: 'select-schoolyear', hide: false, required: true, name: 'Last School Year', cols: 6, options: []},
                {key: 'primary_contact_person', type: 'text', hide: false, required: true, name: 'Primary Contact Person', cols: 4},
                {key: 'primary_contact_no', type: 'text', hide: false, required: true, name: 'Primary Contact Number', cols: 4},
                {key: 'primary_contact_relationship', type: 'text', hide: false, required: true, name: 'Primary Contact Relationship', cols: 4},
            ];
        },
        getStudents(state): Student[] {
            return state.students;
        },

        getSelect(state): any {
            let options: any = [];
            state.students.map(item => options.push({value: item.id, text: `${item.first_name} ${item.middle_name} ${item.last_name}`}))
            return options;
        },

        getStudent(state): Student | null {
            return state.student;
        },

        getStudentData(state): any {
            return state.studentData;
        }
    },
    actions: {
        async list(searchData: StudentSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/students?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.students = data.value.data as Student[];
                    this.studentData = data.value;
                } else {
                    this.students = data.value as Student[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(student: Student) {
            const formData = new FormData();

            for (const key in student) {
                if (Object.prototype.hasOwnProperty.call(student, key)) {
                    formData.append(key, student[key]); 
                }
            }
            const { data, pending, refresh, error } = await useFetchApi('/api/students', {
                method: 'POST', 
                body: formData
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, student: Student){
            const formData = new FormData();
            for (const key in student) {
                if (Object.prototype.hasOwnProperty.call(student, key)) {
                    formData.append(key, student[key]); 
                }
            }

            formData.append('id', id);
            formData.append('_method', 'PATCH'); 
            const { data, pending, refresh, error } = await useFetchApi(`/api/students/${id}`, {
                method: 'POST', 
                body: formData
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/students/${id}`, {
                method: 'GET', 
            });

            this.student = data.value as Student;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/students/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
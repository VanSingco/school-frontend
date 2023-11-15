import { defineStore } from 'pinia';
import { Family } from './family';
import { Student } from './student';
import { useConfigStore } from './config';
import { configSelectOptions } from '~~/utils/custom';


interface Application {
    id?: string,
    email: string,
    tracking_code: string,
    status: string,
    school_year_id: string,
    notes: string
}

export const default_student = {
    school_id: '',
    lrn: '',
    number: 0,
    first_name: '',
    last_name: '',
    middle_name: '',
    suffix_name: '',
    id_picture: '',
    image_url: '',
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
};

export const useApplicationStore = defineStore('applications', {
    state: () => {
        return {
            application: {
                email: '',
                tracking_code: '',
                status: '',
                notes: '',
            } as Application,
            family: {
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
            } as Family,
            students: [default_student],

        }
    },
    getters: {
        getFamilyForms(state) {
            const cookie_user = useCookie('user');
            
            const useConfig = useConfigStore();
            const education_attaiment_options = configSelectOptions(useConfig.getConfig?.family.education_attaiment, 'array');

            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            
            return [
                {key: 'school_id', type: 'select-school', hide: true, required: false, name: 'Select School', cols: 12},

                {key: 'primary_contact_person', type: 'text', hide: false, required: true, name: 'Primary Contact Person *', cols: 4},
                {key: 'primary_contact_number', type: 'number', hide: false, required: true, name: 'Primary Contact No *', cols: 4},
                {key: 'primary_contact_email', type: 'email', hide: false, required: true, name: 'Primary Email *', cols: 4},
                
                {key: 'father_first_name', type: 'text', hide: false, required: false, name: 'Father First Name', cols: 3},
                {key: 'father_last_name', type: 'text', hide: false, required: false, name: 'Father Last Name', cols: 3},
                {key: 'father_middle_name', type: 'text', hide: false, required: false, name: 'Father Middle Name', cols: 3},
                {key: 'father_suffix_name', type: 'text', hide: false, required: false, name: 'Father Suffix Name', cols: 3},
                {key: 'father_contact_no', type: 'number', hide: false, required: false, name: 'Father Contact No', cols: 6},
                {key: 'father_birth_date', type: 'date', hide: false, required: false, name: 'Father Birth Date', cols: 6},
                {key: 'father_highest_education_attaiment', hide: false, type: 'select', required: false, name: 'Father Highest Education Attaiment', options: education_attaiment_options, cols: 12},

                {key: 'mother_first_name', type: 'text', hide: false, required: false, name: 'Mother First Name', cols: 3},
                {key: 'mother_last_name', type: 'text', hide: false, required: false, name: 'Mother Last Name', cols: 3},
                {key: 'mother_middle_name', type: 'text', hide: false, required: false, name: 'Mother Middle Name', cols: 3},
                {key: 'mother_suffix_name', type: 'text', hide: false, required: false, name: 'Mother Suffix Name', cols: 3},
                {key: 'mother_contact_no', type: 'number', hide: false, required: false, name:  'Mother Contact No', cols: 6},
                {key: 'mother_birth_date', type: 'date', hide: false, required: false, name: 'Mother Birth Date', cols: 6},
                {key: 'mother_highest_education_attaiment', hide: false, type: 'select', required: false, name: 'Mother Highest Education Attaiment', options: education_attaiment_options, cols: 12},

                {key: 'guardian_first_name', type: 'text', hide: false, required: false, name: 'Guardian First Name (Optional)', cols: 3},
                {key: 'guardian_last_name', type: 'text', hide: false, required: false, name: 'Guardian Last Name (Optional)', cols: 3},
                {key: 'guardian_middle_name', type: 'text', hide: false, required: false, name: 'Guardian Middle Name (Optional)', cols: 3},
                {key: 'guardian_suffix_name', type: 'text', hide: false, required: false, name: 'Guardian Suffix Name (Optional)', cols: 3},
                {key: 'guardian_contact_no', type: 'number', hide: false, required: false, name: 'Guardian Contact No (Optional)', cols: 6},
                {key: 'guardian_birth_date', type: 'date', hide: false, required: false, name: 'Guardian Birth Date (Optional)', cols: 6},
                {key: 'guardian_highest_education_attaiment', hide: false, type: 'select', required: false, name: 'Guardian Highest Education Attaiment (Optional)', options: education_attaiment_options, cols: 12},   
                
            ];
        },
        getStudentForms(state){
            const cookie_user = useCookie('user');

            const useConfig = useConfigStore();
            
            const status_options = configSelectOptions(useConfig.getConfig?.student.status, 'array');
            const type_options = configSelectOptions(useConfig.getConfig?.student.type, 'array');
            const gender_options = configSelectOptions(useConfig.getConfig?.student.gender, 'array');
            const payment_options = configSelectOptions(useConfig.getConfig?.student.payment_options, 'array');
            
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            
            return [
              
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
    },
    actions: {
        addStudent(){
            this.students.push(default_student);
        },
        removeStudent(index: number) {
            this.students.splice(index, 1);
        }
    }
});
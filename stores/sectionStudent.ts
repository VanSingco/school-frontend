import { Section } from './section';
import { Student } from './student';
import { GradeLevel } from './gradeLevel';
import { Teacher } from './teacher';
import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();

export interface SectionStudent {
    id?: string;
    school_id?: string;
    section_id: string;
    student_id: string;
    student?: Student;
    section?: Section;
};

export interface SectionStudentSearch {
    orderBy: string;
    page: number;
    search: string;
    paginate: boolean;
    school_id?: string | null;
    id?: string | null;
}


export const useSectionStudentStore = defineStore('section-student', {
    state: () => {
      return {
        sectionStudents: [] as SectionStudent[],
        sectionStudent: null as SectionStudent | null,
        sectionStudentData: {},
        models: {
            school_id: school.school ? school.school.id : null,
            section_id: '',
            grade_level_id: '',
            student_ids: [] as string[],
            student_id: [] as string[],
        },
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},
                {key: 'student_ids', type: 'select-student-multiple', hide: false, required: true, name: '', cols: 12},
            ];
        },
        getSectionStudents(state): SectionStudent[] {
            return state.sectionStudents;
        },

        getSelect(state): any {
            let options: any = [];
            state.sectionStudents.map(item => options.push({value: item.id, text: `${item.student ? item.student.first_name : ''} - ${item.section ? item.section.name : ''}`}))
            return options;
        },

        getSectionStudent(state): SectionStudent | null {
            return state.sectionStudent;
        },

        getSectionStudentData(state): any {
            return state.sectionStudentData;
        }
    },
    actions: {
        async list(searchData: SectionStudentSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/section-students?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.sectionStudents = data.value.data as SectionStudent[];
                    this.sectionStudentData = data.value;
                } else {
                    this.sectionStudents = data.value as SectionStudent[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(sectionStudent: any) {
            const { data, pending, refresh, error } = await useFetchApi('/api/section-students', {
                method: 'POST', 
                body: sectionStudent
            });

            return { data, pending, refresh, error };
        },


        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/section-students/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
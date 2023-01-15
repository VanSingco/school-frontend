import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface Student {
    id?: string;
    from: string;
    to: string;
    school_year?: string;
    is_active: boolean | string;
};

export interface StudentSearch {
    orderBy: string;
    page: number;
    paginate: boolean;
}


export const useStudentStore = defineStore('student', {
    state: () => {
      return {
        students: [] as Student[],
        student: null as Student | null,
        studentData: {}
      }
    },
    getters: {
        getStudents(state): Student[] {
            return state.students;
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
            const { data, pending, refresh, error } = await useFetchApi('/api/students', {
                method: 'POST', 
                body: student
            });

            return { data, pending, refresh, error };
        },

        async update(student: Student){
            const { data, pending, refresh, error } = await useFetchApi(`/api/students/${student.id}`, {
                method: 'PATCH', 
                body: student
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
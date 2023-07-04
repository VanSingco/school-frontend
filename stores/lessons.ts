import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';
import { AssignSubjectSchedule } from './assignSubjectSchedule';

const school = useSchoolStore();

export interface Lesson {
    id?: string;
    school_id?: string;
    assign_subject_schedule_id: string,
    assign_subject_schedule?: AssignSubjectSchedule,
    description: string,
};

export interface LessonSearch {
    orderBy: string;
    page: number;
    paginate: boolean;
    school_id?: string | null;
}


export const useLessonStore = defineStore('lesson', {
    state: () => {
      return {
        lessons: [] as Lesson[],
        lesson: null as Lesson | null,
        lessonData: {},
        models: {
            school_id: '',
            assign_subject_schedule_id: '',
            description: '',
        },
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},
                {key: 'assign_subject_schedule_id', type: 'select-assign-subject-schedule', hide: false, required: true, name: 'Select assign subject schedule', cols: 12},
                {key: 'description', type: 'textarea', hide: false, required: true, name: 'Description', cols: 12},
            ];
        },
        getLessons(state): Lesson[] {
            return state.lessons;
        },

        // getSelect(state): any {
        //     let options: any = [];
        //     state.lessons.map(item => options.push({value: item.id, text: item.title}))
        //     return options;
        // },


        getLesson(state): Lesson | null {
            return state.lesson;
        },

        getLessonData(state): any {
            return state.lessonData;
        }
    },
    actions: {
        async list(searchData: any) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error }: any = await useFetchApi(`/api/lessons?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.lessons = data.value.data as Lesson[];
                    this.lessonData = data.value;
                } else {
                    this.lessons = data.value as Lesson[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(lesson: Lesson) {
            const { data, pending, refresh, error } = await useFetchApi('/api/lessons', {
                method: 'POST', 
                body: lesson
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, lesson: Lesson){
            const { data, pending, refresh, error } = await useFetchApi(`/api/lessons/${id}`, {
                method: 'PATCH', 
                body: lesson
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/lessons/${id}`, {
                method: 'GET', 
            });

            this.lesson = data.value as Lesson;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/lessons/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
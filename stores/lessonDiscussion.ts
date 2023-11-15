import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';
import { AssignSubjectSchedule } from './assignSubjectSchedule';

const school = useSchoolStore();

export interface LessonDiscussion {
    id?: string;
    school_id?: string;
    lesson_id?: string,
    title: string,
    description: string,
    quarter: number,
    start_date: Date | String,
    end_date: Date | String,
    is_active: boolean,
    has_exam: boolean,
    exam_attempt: number,
    exam_time: string,
    files?: File[] | string[]
};

export interface LessonDiscussionSearch {
    orderBy: string;
    page: number;
    paginate: boolean;
    school_id?: string | null;
}

export interface LessonDiscussionModel {
    title: string,
    description: string,
    quarter: number,
    start_date: Date,
    end_date: Date,
    is_active: boolean,
    has_exam: boolean,
    exam_attempt: number,
    exam_time: string,
    files: File[]
}


export const useLessonDiscussionStore = defineStore('lessonDiscussion', {
    state: () => {
      return {
        lessonDiscussions: {},
        lessonDiscussion: null as LessonDiscussion | null,
        lessonDiscussionData: {},
        models: {
            title: '',
            description: '',
            quarter: 1,
            start_date: new Date(),
            end_date: new Date(),
            is_active: true,
            has_exam: false,
            exam_attempt: 1,
            exam_time: '',
            files: []
        } as LessonDiscussionModel,
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            return [
                {key: 'title', type: 'text', hide: false, required: true, name: 'Title', cols: 12},
                {key: 'description', type: 'textarea', hide: false, required: true, name: 'Description', cols: 12},
                {key: 'quarter', type: 'select', hide: false, required: true, name: 'Select Quarter', cols: 4, options: [
                    {name: '1st Quarter', value: 1},
                    {name: '2nd Quarter', value: 2},
                    {name: '3rd Quarter', value: 3},
                    {name: '4th Quarter', value: 4},
                ]},
                {key: 'start_date', type: 'date', hide: false, required: true, name: 'Start Date', cols: 4},
                {key: 'end_date', type: 'date', hide: false, required: true, name: 'End Date', cols: 4},
                {key: 'is_active', type: 'checkbox', hide: false, required: false, name: 'Is this an active discussion', cols: 4},
                {key: 'has_exam', type: 'checkbox', hide: false, required: false, name: 'Has Exam or Quiz', cols: 4},
                {key: 'exam_attempt', type: 'number', hide: state.models.has_exam ? false : true, required: true, name: 'How many times students can attempt the exam/quiz?', cols: 6},
                {key: 'exam_time', type: 'number', hide: state.models.has_exam ? false : true, required: true, name: 'What is the duration of this exam? (Hour)', cols: 6},
                {key: 'files', type: 'file', hide: false, required: false, name: 'Upload Files (Optional)', cols: 12},
            ];
        },
        getLessonDiscussions(state) {
            return state.lessonDiscussions;
        },

        // getSelect(state): any {
        //     let options: any = [];
        //     state.lessonDiscussions.map(item => options.push({value: item.id, text: item.title}))
        //     return options;
        // },


        getLessonDiscussion(state): LessonDiscussion | null {
            return state.lessonDiscussion;
        },

        getLessonDiscussionData(state): any {
            return state.lessonDiscussionData;
        }
    },
    actions: {
        async list(lesson_id: string) {
            
            const queryParams = new URLSearchParams({lesson_id}).toString()
            const { data, pending, refresh, error }: any = await useFetchApi(`/api/lesson-discussions?${queryParams}`, {method: 'GET'});

            if (data.value) {
                this.lessonDiscussions = data.value;
            }

            return { data, pending, refresh, error };
        },

        async store(lessonDiscussion: any) {

            const formData = new FormData();

            for (const key in lessonDiscussion) {
                if (Object.prototype.hasOwnProperty.call(lessonDiscussion, key)) {
                    if (key == 'files' && lessonDiscussion.files?.length > 0) {
                        for (const key in lessonDiscussion.files) {
                            if (Object.prototype.hasOwnProperty.call(lessonDiscussion.files, key)) {
                                const file = lessonDiscussion.files[key];
                                formData.append(`files[]`, file)
                            }
                        }
                    } else {
                        formData.append(key, lessonDiscussion[key]);  
                    }
                    
                }
            }
            const { data, pending, refresh, error } = await useFetchApi('/api/lesson-discussions', {
                method: 'POST', 
                body: formData
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, lessonDiscussion: any){
            
            const formData = new FormData();

            for (const key in lessonDiscussion) {
                if (Object.prototype.hasOwnProperty.call(lessonDiscussion, key)) {
                    if (key == 'files' && lessonDiscussion.files?.length > 0) {
                        for (const key in lessonDiscussion.files) {
                            if (Object.prototype.hasOwnProperty.call(lessonDiscussion.files, key)) {
                                const file = lessonDiscussion.files[key];
                                formData.append(`files[]`, file)
                            }
                        }
                    } else {
                        formData.append(key, lessonDiscussion[key]);  
                    }
                    
                }
            }
            const { data, pending, refresh, error } = await useFetchApi(`/api/lesson-discussions/${id}`, {
                method: 'PATCH', 
                body: lessonDiscussion
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/lesson-discussions/${id}`, {
                method: 'GET', 
            });

            this.lessonDiscussion = data.value as LessonDiscussion;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/lesson-discussions/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
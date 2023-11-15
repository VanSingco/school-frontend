import { GradeLevel } from './gradeLevel';
import { Teacher } from './teacher';
import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();

export interface Section {
    id?: string;
    school_id?: string;
    name: string;
    teacher_id: string;
    teacher?: Teacher;
    grade_level?: GradeLevel;
    grade_level_id: string;
};

export interface SectionSearch {
    orderBy: string;
    page: number;
    search: string;
    paginate: boolean;
    school_id?: string | null;
    grade_level_id?: string | null;
}


export const useSectionStore = defineStore('section', {
    state: () => {
      return {
        sections: [] as Section[],
        section: null as Section | null,
        sectionData: {},
        models: {
            school_id: school.school ? school.school.id : null,
            name: '',
            teacher_id: '',
            grade_level_id: '',
        },
      }
    },
    getters: {
        getForms(state) {
            const cookie_user = useCookie('user');
            const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
            return [
                {key: 'school_id', type: 'select-school', hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, required: true, name: 'Select School', cols: 12},
                {key: 'name', type: 'text', hide: false, required: true, name: 'Name', cols: 12},
                {key: 'teacher_id', type: 'select-teacher', hide: false, required: true, name: 'Select Teacher', cols: 6},
                {key: 'grade_level_id', type: 'select-gradelevel', hide: false, required: true, name: 'Select Grade Level', cols: 6},
                
            ];
        },
        getSections(state): Section[] {
            return state.sections;
        },

        getSelect(state): any {
            let options: any = [];
            state.sections.map(item => options.push({value: item.id, text: `${item.name} - ${item.grade_level ? item.grade_level.name : ''}`}))
            return options;
        },

        getSection(state): Section | null {
            return state.section;
        },

        getSectionData(state): any {
            return state.sectionData;
        }
    },
    actions: {
        async list(searchData: SectionSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/sections?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.sections = data.value.data as Section[];
                    this.sectionData = data.value;
                } else {
                    this.sections = data.value as Section[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(section: Section) {
            const { data, pending, refresh, error } = await useFetchApi('/api/sections', {
                method: 'POST', 
                body: section
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, section: Section){
            const { data, pending, refresh, error } = await useFetchApi(`/api/sections/${id}`, {
                method: 'PATCH', 
                body: section
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/sections/${id}`, {
                method: 'GET', 
            });

            this.section = data.value as Section;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/sections/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
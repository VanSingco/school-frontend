import { GradeLevel } from './gradeLevel';
import { Teacher } from './teacher';
import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();


export interface CustomGradingOption {
    id?: string;
    school_id?: string | null;
    custom_grading_id: string;
    name: string;
    description: string;
 
};


export interface CustomGradingOptionSearch {
    orderBy: string;
    page: number;
    search: string;
    paginate: boolean;
    school_id?: string | null;
    custom_grading_id?: string | null;
}


export const useCustomGradingOptionStore = defineStore('customGradingOption', {
    state: () => {
      return {
        customGradingOptions: [] as CustomGradingOption[],
        customGradingOption: null as CustomGradingOption | null,
        customGradingOptionData: {},
        option_models: {
            school_id: school.school ? school.school.id : null,
            custom_grading_id: '',
            name: '',
            description: '',
        },
      }
    },
    getters: {
        getForms(state) {
            return [
                {key: 'name', type: 'text', hide: false, required: true, name: 'Title', cols: 12},
                {key: 'description', type: 'textarea', hide: false, required: true, name: 'Description', cols: 12},
                
            ];
        },
        getCustomGradingOptions(state): CustomGradingOption[] {
            return state.customGradingOptions;
        },

        getSelect(state): any {
            let options: any = [];
            state.customGradingOptions.map(item => options.push({value: item.id, text: `${item.name}`}))
            return options;
        },

        getCustomGradingOption(state): CustomGradingOption | null {
            return state.customGradingOption;
        },

        getCustomGradingOptionData(state): any {
            return state.customGradingOptionData;
        }
    },
    actions: {
        async list(searchData: CustomGradingOptionSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-grading-options?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.customGradingOptions = data.value.data as CustomGradingOption[];
                    this.customGradingOptionData = data.value;
                } else {
                    this.customGradingOptions = data.value as CustomGradingOption[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(customGradingOption: CustomGradingOption) {
            const { data, pending, refresh, error } = await useFetchApi('/api/custom-grading-options', {
                method: 'POST', 
                body: customGradingOption
            });

            return { data, pending, refresh, error };
        },

        async update(id: string, customGradingOption: CustomGradingOption){
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-grading-options/${id}`, {
                method: 'PATCH', 
                body: customGradingOption
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-grading-options/${id}`, {
                method: 'GET', 
            });

            this.customGradingOption = data.value as CustomGradingOption;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-grading-options/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
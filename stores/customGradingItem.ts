import { GradeLevel } from './gradeLevel';
import { Teacher } from './teacher';
import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();


export interface CustomGradingItem {
    id?: string;
    school_id?: string | null | undefined;
    custom_grading_id?: string;
    parent_custom_grading_item_id: string;
    title: string;
    is_heading: boolean;
    order: number;
};

export interface CustomGradingItemSearch {
    custom_grading_id: string | undefined;
    school_id?: string | null | undefined;
}


export const useCustomGradingItemStore = defineStore('customGradingItem', {
    state: () => {
      return {
        customGradingItems: [] as CustomGradingItem[],
        customGradingItem: null as CustomGradingItem | null,
        models: {
            school_id: school.school ? school.school.id : null,
            custom_grading_id: '',
            parent_custom_grading_item_id: '',
            title: '',
            is_heading: false,
            order: 0
        },
      }
    },
    getters: {
        getForms(state) {
            return [
                {key: 'title', type: 'text', hide: false, required: true, name: 'Title', cols: 12},
                {key: 'parent_custom_grading_item_id', type: 'select-custom-grading-item', hide: false, required: false, name: 'Is This ', cols: 12},
                {key: 'is_heading', type: 'checkbox', hide: false, required: false, name: 'For Heading', cols: 12},
            ];
        },
        getCustomGradingItems(state): CustomGradingItem[] {
            return state.customGradingItems;
        },

        getSelect(state): any {
            let options: any = [];
            state.customGradingItems.map(item => options.push({value: item.id, text: `${item.title}`}))
            return options;
        },

        getCustomGradingItem(state): CustomGradingItem | null {
            return state.customGradingItem;
        },

        // getCustomGradingItemData(state): any {
        //     return state.customGradingItemData;
        // }
    },
    actions: {
        async list(searchData: CustomGradingItemSearch) {
            if (school.school) {
                searchData.school_id = school.school.id
            }
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-grading-items?${queryParams}`, {method: 'GET'});

            if (data.value) {
                this.customGradingItems = data.value as CustomGradingItem[];
            }

            return { data, pending, refresh, error };
        },

        async store(customGradingItem: CustomGradingItem) {
            const { data, pending, refresh, error } = await useFetchApi('/api/custom-grading-items', {
                method: 'POST', 
                body: customGradingItem
            });

            if (data.value) {
                this.customGradingItems.push(data.value);
            }

            return { data, pending, refresh, error };
        },

        async update(id: string, customGradingItem: CustomGradingItem){
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-grading-items/${id}`, {
                method: 'PATCH', 
                body: customGradingItem
            });

            if (data.value) {
                this.customGradingItems = this.customGradingItems.map(item => item.id == data.value.id ? data.value : item);
            }

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-grading-items/${id}`, {
                method: 'GET', 
            });

            this.customGradingItem = data.value as CustomGradingItem;

            return { data, pending, refresh, error };

        },

        async changeOrder(body:any) {
            const { data, pending, refresh, error } = await useFetchApi('/api/custom-grading-items/change-order', {
                method: 'POST', 
                body
            });

            if (data.value) {
                this.customGradingItems = data.value as CustomGradingItem[];
            }

            return { data, pending, refresh, error };
        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/custom-grading-items/${id}`, {
                method: 'DELETE',
            });
            if (data.value) {
                this.customGradingItems = this.customGradingItems.filter(item => item.id !== id);
            }
            return { data, pending, refresh, error };
        }
    }
});
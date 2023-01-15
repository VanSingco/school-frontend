import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';

export interface GradeLevel {
    id?: string;
    name: string;
};

export interface GradeLevelSearch {
    orderBy: string;
    page: number;
    paginate: boolean;
}


export const useGradeLevelStore = defineStore('gradeLevel', {
    state: () => {
      return {
        gradeLevels: [] as GradeLevel[],
        gradeLevel: null as GradeLevel | null,
        gradeLevelData: {}
      }
    },
    getters: {
        getGradeLevels(state): GradeLevel[] {
            return state.gradeLevels;
        },

        getGradeLevel(state): GradeLevel | null {
            return state.gradeLevel;
        },

        getGradeLevelData(state): any {
            return state.gradeLevelData;
        }
    },
    actions: {
        async list(searchData: GradeLevelSearch) {
            
            const queryParams = new URLSearchParams(searchData).toString()
            const { data, pending, refresh, error } = await useFetchApi(`/api/grade-levels?${queryParams}`, {method: 'GET'});

            if (data.value) {
                if (searchData.paginate) {
                    this.gradeLevels = data.value.data as GradeLevel[];
                    this.gradeLevelData = data.value;
                } else {
                    this.gradeLevels = data.value as GradeLevel[];
                }
            }

            return { data, pending, refresh, error };
        },

        async store(gradeLevel: GradeLevel) {
            const { data, pending, refresh, error } = await useFetchApi('/api/grade-levels', {
                method: 'POST', 
                body: gradeLevel
            });

            return { data, pending, refresh, error };
        },

        async update(gradeLevel: GradeLevel){
            const { data, pending, refresh, error } = await useFetchApi(`/api/grade-levels/${gradeLevel.id}`, {
                method: 'PATCH', 
                body: gradeLevel
            });

            return { data, pending, refresh, error };
        },

        async show(id: string){
            const { data, pending, refresh, error } = await useFetchApi(`/api/grade-levels/${id}`, {
                method: 'GET', 
            });

            this.gradeLevel = data.value as GradeLevel;

            return { data, pending, refresh, error };

        },

        async delete(id: string) {
            const { data, pending, refresh, error } = await useFetchApi(`/api/grade-levels/${id}`, {
                method: 'DELETE',
            });

            return { data, pending, refresh, error };
        }
    }
});
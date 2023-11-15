import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';


export const useConfigStore = defineStore('config', {
    state: () => {
      return {
        config: null,
      }
    },
    getters: {
        getConfig(state) {
            return state.config;
        },

    },
    actions: {
        async configList() {
            const { data, pending, refresh, error } = await useFetchApi(`/api/fetch-all-configurations`, {method: 'GET'});
            if (data.value) {
                this.config = data.value as any;
            }
            return { data, pending, refresh, error };
        },
    }
});
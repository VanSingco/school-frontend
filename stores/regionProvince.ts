import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';



export const useRegionProvinceStore = defineStore('country-province', {
    state: () => {
      return {
        regionProvinceCityBrgy: null,
      }
    },
    getters: {
        getRegionProvinceCityBrgy(state) {
            return state.regionProvinceCityBrgy;
        },

    },
    actions: {
        async regionProvinceCityBrgyList() {
            const { data, pending, refresh, error } = await useFetchApi(`/api/country-data/region-province-city-brgy`, {method: 'GET'});
            if (data.value) {
                this.regionProvinceCityBrgy = data.value as any;
            }
            return { data, pending, refresh, error };
        },
    }
});
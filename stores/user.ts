import { useFetchApi } from './../composable/fetch';
import { defineStore } from 'pinia';


export interface UserInfo {
    id: string;
    name: string;
    email: string;
    school_id?: string;
    user_type: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export const useUserStore = defineStore('user', {
    state: () => {
      return {
        user: null as UserInfo | null,
      }
    },

    getters: {
      getUser(state): UserInfo | null {
        return state.user;
      }
    },

    actions: {
        async loginUser(loginData: LoginUser) {
          const { data, pending, refresh, error } = await useFetchApi('/api/auth/login', {
            method: 'POST', 
            body: loginData
          });

          this.user = data.value as UserInfo | null;

          const user = useCookie('user');
          user.value = encodeURIComponent(JSON.stringify(this.user));

          return { data, pending, refresh, error };
         
        },

        async loginSuperAdminUser(loginData: LoginUser) {
          const { data, pending, refresh, error } = await useFetchApi('/api/auth/super-admin-login', {
            method: 'POST', 
            body: loginData
          });

          this.user = data.value as UserInfo | null;
          const user = useCookie('user');
          user.value = encodeURIComponent(JSON.stringify(this.user));

          return { data, pending, refresh, error };
         
        },

        async logoutUser() {
          await useFetchApi('/api/auth/logout', {method: 'POST'});
          const user = useCookie('user');
          user.value = null;
        },

        async authUser(): Promise<UserInfo | null> {
          const { data, pending, refresh, error } = await useFetchApi('/api/auth/user', {method: 'GET'});
          this.user = data.value as UserInfo | null;
          const user = useCookie('user');
          user.value = encodeURIComponent(JSON.stringify(data.value as UserInfo));

          return this.user;
        }
    },
})
  
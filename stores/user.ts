import { useFetchApi } from './../utils/fetch';
import { defineStore } from 'pinia';
import { useSchoolStore } from './school';

const school = useSchoolStore();

export interface UserInfo {
    id?: string;
    name: string;
    email: string;
    school_id?: string;
    password?: string;
    user_type: string;
}

export interface LoginUser {
  email?: string;
  user_type?: string;
  student_number?: number;
  password: string;
  subdomain?: string
}

export interface UserSearch {
  search: string;
  user_type: string;
  orderBy: string;
  paginate: boolean;
  page: number;
}

export const useUserStore = defineStore('user', {
    state: () => {
      return {
        user: null as UserInfo | null,
        users: [] as UserInfo[],
        userData: {},
        models: {
          name: "",
          email: "",
          school_id: school.school ? school.school.id : null,
          password: "",
          user_type: school.school ? "admin" : "super-admin",
        },
      }
    },

    getters: {
      getUser(state): UserInfo | null {
        return state.user;
      },

      getForms(state): any {
        const cookie_user = useCookie('user');
        const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;

        return [
          {key: 'name', type: 'text', hide: false, required: true, name: 'Name', cols: 6,},
          {key: 'email', type: 'email', required: true, hide: false, name: 'Email', cols: 6},
          {key: 'user_type', type: 'select', required: true, hide: (auth_user && auth_user.user_type != 'super-admin') ? true : false, name: 'Select User Type', cols: 12, options: [
            {name: 'Super Admin', value: 'super-admin'},
            {name: 'Admin', value: 'admin'}
          ]},
          {key: 'school_id', type: 'select-school', hide: state.models.user_type == 'admin' ? false : true, required: true, name: 'Select School', cols: 12},
          {key: 'password', type: 'password', hide: false, required: true, name: 'Password', cols: 12},
        ]
      },

      getUsers(state):UserInfo[] {
        return state.users;
      },

      getSelect(state): any {
        let options: any = [];
        state.users.map(item => options.push({value: item.id, text: item.name}))
        return options;
      },

      getUserData(state): any {
          return state.userData;
      }
    },

    actions: {
        async list(searchData: UserSearch) {
          const queryParams = new URLSearchParams(searchData).toString()
          const { data, pending, refresh, error } = await useFetchApi(`/api/users?${queryParams}`, {method: 'GET'});

          if (data.value) {
              if (searchData.paginate) {
                  this.users = data.value.data as UserInfo[];
                  this.userData = data.value;
              } else {
                  this.users = data.value as UserInfo[];
              }
          }

          return { data, pending, refresh, error };
        },

        async store(user: UserInfo) {
          const { data, pending, refresh, error } = await useFetchApi('/api/users', {
              method: 'POST', 
              body: user
          });

          return { data, pending, refresh, error };
        },

        async update(id: string, user: UserInfo){
          const { data, pending, refresh, error } = await useFetchApi(`/api/users/${id}`, {
              method: 'PATCH', 
              body: user
          });

          return { data, pending, refresh, error };
        },

        async show(id: string){
          const { data, pending, refresh, error } = await useFetchApi(`/api/users/${id}`, {
              method: 'GET', 
          });

          this.user = data.value as UserInfo;

          return { data, pending, refresh, error };
        },

        async delete(id: string) {
          const { data, pending, refresh, error } = await useFetchApi(`/api/users/${id}`, {
              method: 'DELETE',
          });

          return { data, pending, refresh, error };
        },

        async loginUser(loginData: LoginUser) {
          const { data, pending, refresh, error } = await useFetchApi('/api/auth/login', {
            method: 'POST', 
            body: loginData
          });

          if (data.value) {
            this.user = data.value.user as UserInfo | null;
            const user = useCookie('user');

            const access_token = useCookie('access_token');
            access_token.value = data.value.token as string;
            
            user.value = encodeURIComponent(JSON.stringify(this.user));
          }

          return { data, pending, refresh, error };
         
        },

        async loginSuperAdminUser(loginData: LoginUser) {
          const { data, pending, refresh, error } = await useFetchApi('/api/auth/super-admin-login', {
            method: 'POST', 
            body: loginData
          });

          console.log('data.value', data.value);

          if (data.value) {
            this.user = data.value.user as UserInfo | null;
            const user = useCookie('user');

            const access_token = useCookie('access_token');
            access_token.value = data.value.token as string;

            user.value = encodeURIComponent(JSON.stringify(this.user));
          }
         

          return { data, pending, refresh, error };
         
        },

        async logoutUser() {
          await useFetchApi('/api/auth/logout', {method: 'POST'});
          const user = useCookie('user');
          const access_token = useCookie('access_token');
          access_token.value = null;
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
  
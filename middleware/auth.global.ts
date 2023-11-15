import { useSchoolStore } from './../stores/school';
import { getSubDomain } from "~~/utils/custom";
import { useConfigStore } from '~~/stores/config';
import { useUserStore } from "~~/stores/user";


function removePath(pathName: string, pathList: string[]): string[] {
    const index = pathList.indexOf(pathName);
    if (index > -1) pathList.splice(index, 1);
    return pathList;
}

export default defineNuxtRouteMiddleware(async (to, from) =>{
    // get user from cookie
    const cookie_user = useCookie('user');
    // get configuration from frontend this will find in nuxt.config.ts
    const config = useRuntimeConfig();
    // get auth users from cookie
    const auth_user: any = cookie_user.value ? cookie_user.value : null;
    // initialize school store
    const school = useSchoolStore();
    // initialize config store 
    const useConfig = useConfigStore();
    // fitch config data to backend via api
    useConfig.configList();
    // list of auth pages
    const list_auth_pages = ['teacher', 'student', 'family', 'admin', 'super-admin'];
    // list of login pages
    const list_login_pages = ['/login', '/super-admin/login', '/forgot-password'];

    const path_name = to.fullPath.split('/')[1];

    // Get Domain name from url path
    const subdomain = getSubDomain();

    if (school && subdomain !== config.public.domainName) {
        await school.getBySubdomain(subdomain);
    }
    
    if (auth_user) {
        /**
         * this will remove the path in list of auth pages
         */
        const path_list = removePath(auth_user.user_type, list_auth_pages);
        
        if (auth_user.user_type === 'admin') {
            /**
             * redirect to admin dashboard
             */
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/admin/dashboard');
            }
        } else if (auth_user.user_type === 'teacher') {
            /**
             * redirect to teacher dashboard
             */
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/teacher/dashboard');
            }
        } else if (auth_user.user_type === 'student') {
            /**
             * redirect to student dashboard
             */
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/student/dashboard');
            }
        }else if (auth_user.user_type === 'family') {
            /**
             * redirect to family dashboard
             */
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/family/dashboard');
            }
        } else if (auth_user.user_type == 'super-admin') {
            /**
             * redirect to super admin dashboard
             */
            if (subdomain == config.public.domainName) {
                if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                    return navigateTo('/super-admin/dashboard');
                }
            }
        }
    } else {
        if (list_auth_pages.includes(path_name)) {

            if (subdomain != config.public.domainName) {
                /**
                 * redirect to 404 or login page
                 */
                if (path_name == 'super-admin') {
                    return navigateTo('/404');
                } else {
                    return navigateTo('/login');
                }
            } else if (subdomain == config.public.domainName) {
                /**
                 * if login as super admin want to go to 
                 * login page this will redirect back to super admin dashboard
                 */
                if (path_name == 'super-admin') {
                    if (to.fullPath !== '/super-admin/login') {
                        return navigateTo('/super-admin/login');
                    }
                }
            }
        }
    }
})

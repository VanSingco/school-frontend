import { useSchoolStore } from './../stores/school';
import { getSubDomain } from "~~/composable/custom";
import { useUserStore } from "~~/stores/user";


function removePath(pathName: string, pathList: string[]): string[] {
    const index = pathList.indexOf(pathName);
    if (index > -1) pathList.splice(index, 1);
    return pathList;
}

export default defineNuxtRouteMiddleware(async (to, from) =>{
    // get user from cookie
    const cookie_user = useCookie('user');
    const config = useRuntimeConfig();
    const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;
    const school = useSchoolStore();
    const list_auth_pages = ['teacher', 'student', 'family', 'admin', 'super-admin'];
    const list_login_pages = ['/login', '/super-admin/login', '/forgot-password'];
    const path_name = to.fullPath.split('/')[1];
    // Get Domain name from url path
    const subdomain = getSubDomain();

    if (subdomain !== config.public.domainName) {
        await school.getBySubdomain(subdomain);
    }
    
    if (auth_user) {
        
        const path_list = removePath(auth_user.user_type, list_auth_pages);
        
        if (auth_user.user_type === 'admin') {
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/admin/dashboard');
            }
        } else if (auth_user.user_type === 'teacher') {
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/teacher/dashboard');
            }
        } else if (auth_user.user_type === 'student') {
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/student/dashboard');
            }
        }else if (auth_user.user_type === 'family') {
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/family/dashboard');
            }
        } else if (auth_user.user_type == 'super-admin') {
            if (subdomain == config.public.domainName) {
                if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                    return navigateTo('/super-admin/dashboard');
                }
            }
        }
    } else {
        if (list_auth_pages.includes(path_name)) {
            console.log(subdomain, config.public.domainName);
            if (subdomain != config.public.domainName) {
                if (path_name == 'super-admin') {
                    return navigateTo('/404');
                } else {
                    return navigateTo('/login');
                }
            } else if (subdomain == config.public.domainName) {
                if (path_name == 'super-admin') {
                    if (to.fullPath !== '/super-admin/login') {
                        return navigateTo('/super-admin/login');
                    }
                }
            }
            
            
        }
    }
})

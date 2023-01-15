import { useUserStore } from "~~/stores/user";


function removePath(pathName: string, pathList: string[]): string[] {
    const index = pathList.indexOf(pathName);
    if (index > -1) pathList.splice(index, 1);
    return pathList;
}

export default defineNuxtRouteMiddleware((to, from) =>{
    // get user from cookie
    const cookie_user = useCookie('user');
    const auth_user = cookie_user.value ? JSON.parse(decodeURIComponent(cookie_user.value as string)) : null;

    const list_auth_pages = ['teacher', 'student', 'admin'];
    const list_login_pages = ['/login', '/forgot-password'];
    const path_name = to.fullPath.split('/')[1];

    if (auth_user) {
        
        const path_list = removePath(auth_user.user_type, list_auth_pages);

        if (auth_user.user_type === 'admin') {
            if (path_list.includes(path_name) || list_login_pages.includes(to.fullPath)) {
                return navigateTo('/admin/dashboard');
            }
        } else if (auth_user.user_type === 'teacher' || list_login_pages.includes(to.fullPath)) {
            if (path_list.includes(path_name)) {
                return navigateTo('/teacher/dashboard');
            }
        } else if (auth_user.user_type === 'student' || list_login_pages.includes(to.fullPath)) {
            if (path_list.includes(path_name)) {
                return navigateTo('/student/dashboard');
            }
        }
    } else {
        if (list_auth_pages.includes(path_name)) {
            return navigateTo('/login');
        }
    }
})

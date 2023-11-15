/**
 * THIS WILL RETURN THE FILE EXTENSION
 * OF THE FILE
 */
export function getExtension (filename: string) {
    let parts = filename.split('.');
    const ext = parts[parts.length - 1];
    return ext.toLowerCase();
}
/**
 * CHECKS IF THE FILES CONTAINED THE SPECIFIED FILE
 * EXTENSION THIS WILL RETURN BOOLEAN
 */
export function isFile(filename: string) {
    const ext = getExtension(filename);
    switch (ext) {
      case 'jpg':
      case 'png':
        return true;
    }
    return false;
}
/**
 * CHECK IF THE FILE IS EXIST TO THE LIMIT OF 2MB
 */
export function uploadFile(file: File){

    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        if (file.size > 2066848) {
            reject('The file is too large');
        } else if (!isFile(file.name)) {
            reject('The file is not supported.');
        } else {
            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror = reject;

            reader.readAsDataURL(file);
        } 
    })
   
}
/**
 * THIS WILL GET THE SUBDOMAIN OF URL ASSIGNED TO THE SCHOOL
 * THIS WILL HELP TO IDENTIFY THE SCHOOL NAME.
 */
export function getSubDomain() {
    const nuxtApp = useNuxtApp();
    const config = useRuntimeConfig();
    
    let host: string | undefined;
    let subdomain = config.public.domainName;
    if(process.server) {
        host = nuxtApp.ssrContext ? nuxtApp.ssrContext.event.node.req.headers.host : ''
    } else {
        host = window.location.host
    }

    if (host) {
        subdomain = host.split('.')[0].split(':')[0];
    }

    return subdomain;
}
/**
 * THIS IS TRUNCATE THE TEXT AND RETURN SHORT VERSION OF THE TEXT WITH ...
 */
export function truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
}
/**
 * THIS WILL GENERATE ARRY OF OBJECT TO 
 * SELECT OPTION FROM BACKEND CONFIGURATION
 */
export const configSelectOptions = (data: any, type: string) => {
    let options = [];
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (type == 'array-object') {
                options.push({name: data[key].name, value: data[key].value});
            } else {
                options.push({name: data[key], value: data[key]});
            }
        }
    } 

    return options;
}
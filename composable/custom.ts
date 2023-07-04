export function getExtension (filename: string) {
    let parts = filename.split('.');
    const ext = parts[parts.length - 1];
    return ext.toLowerCase();
}

export function isFile(filename: string) {
    const ext = getExtension(filename);
    switch (ext) {
      case 'jpg':
      case 'png':
        return true;
    }
    return false;
}

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


export function truncateString(str: string, num: number) {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
}
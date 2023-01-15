export function getExtension (filename) {
    let parts = filename.split('.');
    const ext = parts[parts.length - 1];
    return ext.toLowerCase();
}

export function isFile(filename) {
    const ext = getExtension(filename);
    switch (ext) {
      case 'jpg':
      case 'png':
        return true;
    }
    return false;
}


export function uploadFile(file){

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
export const getFileExtension = (filename: string): string => {
    const parts = filename.split('.');
    if (parts.length > 1) {
        return parts[parts.length - 1];
    } else {
        return '';
    }
}

export const getFileLink = (path: string): string => {
    return 
}


export const getAssetPath = (fileName: string): string => {
    const baseUrl = import.meta.url;
    const basePath = baseUrl.substring(0, baseUrl.lastIndexOf('/'));
    return `${basePath}/../../assets/${fileName}`;
};
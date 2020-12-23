export declare const exp: {
    isEasyMobilePhone: (value: any) => boolean,
    isMobilePhone: (value: any) => boolean,
    isTelephone: (value: any) => boolean,
    isIdCard: (value: any) => boolean,
    isIpV4: (value: any) => boolean,
    isHex: (value: any) => boolean,
    isQQ: (value: any) => boolean,
    isWX: (value: any) => boolean,
    isIncludeCN: (value: any) => boolean,
    isOnlyCN: (value: any) => boolean,
    isURL: (value: any) => boolean,
    isHTTP: (value: any) => boolean,
    isHTTPS: (value: any) => boolean,
    isPostalCode: (value: any) => boolean,
    isEmail: (value: any) => boolean,
};
export declare const md5: {
    md5Hex: (str: string) => string,
    md5B64: (str: string) => string,
    md5Str: (str: string) => string,
};
export declare const tools: {
    uniq: (arr: Array<any>) => Array<any>,
    max: (arr: Array<any>) => Array<any>,
    min: (arr: Array<any>) => Array<any>,
    sortBy: (arr: Array<any>, attr: string, order: 'asc' | 'desc') => Array<any>,
    formatTree: (arr: Array<any>, rootId: string | null, idKey: string, pidKey: string) => Array<any>,
    formatDate: (time: number | Date, fmt: string) => string,
    random: (min: number, max: number) => number,
    curring: (fn: Function, ...args: Array<any>) => Function,
    download: (blob: File | Blob, fileName: string) => void,
    imgLoad: (imgElement: HTMLImageElement) => Promise<any>,
    compressImage: (imgFile: File, scale?: number) => Promise<any>,
    compressImageSize: (imgFile: File, maxSize?: number, isFixSize?: boolean) => Promise<any>,
    convertBase64ToFile: (base64: string, fileName: string) => File,
    convertFileToBase64: (file: File) => Promise<string>,
    debounce: (method: Function, delay: number) => Function,
    throttle: (method: Function, mustRunDelay: number) => Function,
    setSession: (key: string, value: any) => void,
    getSession: (key: string) => any,
    setLocal: (key: string, value: any) => void,
    getLocal: (key: string) => any,
};
export declare const vuePlugin: any;
export declare function reactPlugin(): any;
export declare const axios: {
    getData: (url: string, params?: any, config?: any) => Promise<any>,
    deleteData: (url: string, params?: any, config?: any) => Promise<any>,
    headData: (url: string, params?: any, config?: any) => Promise<any>,
    getBlob: (url: string, params?: any, config?: any) => Promise<any>,
    postData: (url: string, params?: any, config?: any) => Promise<any>,
    putData: (url: string, params?: any, config?: any) => Promise<any>,
    postJSON: (url: string, params?: any, config?: any) => Promise<any>,
    putJSON: (url: string, params?: any, config?: any) => Promise<any>,
    postMultipart: (url: string, params?: any, config?: any) => Promise<any>,
    setBaseUrl: (baseUrl: string) => void,
    setTimeout: (timeout: number) => void,
    addHeader: (key: string, value: string) => void,
    removeHeader: (key: string) => void,
    setHeadersExcept: (urls: string[]) => void,
    changeIsWithCredentials: (withCredentials: boolean) => void,
    setResultCodeHandler: (codeHandler: Function) => void,
};
export declare const vueRouterUtils: {
  compose: (routes?: any[]) => any[]
};


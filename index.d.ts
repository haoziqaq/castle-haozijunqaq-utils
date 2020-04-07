export declare const exp: any;
export declare const formatter: any;
export declare const md5: any;
export declare const tools: any;
export declare const vuePlugin: any;
export declare function reactPlugin(): any;
export declare const axios: {
    getData: (url: string, params?: any, config?: any) => Promise<any>,
    getBlob: (url: string, params?: any, config?: any) => Promise<any>,
    postData: (url: string, params?: any, config?: any) => Promise<any>,
    postJSON: (url: string, params?: any, config?: any) => Promise<any>,
    postMultipart: (url: string, params?: any, config?: any) => Promise<any>,
    setBaseUrl: (baseUrl: string) => void,
    setTimeout: (timeout: number) => void,
    addHeader: (key: string, value: string) => void,
    setHeadersExcept: (urls: string[]) => void,
    changeIsWithCredentials: (withCredentials: boolean) => void,
    setResultCodeHandler: (codeHandler: Function) => void,
};
export declare const vueRouterUtils: {
  compose: (routes?: any[]) => any[]
};


import axios from '../axios'
import exp from '../exp'
import tools from '../tools'
import * as md5 from '../md5'

export default {
    install(Vue, options) {
        Object.keys(tools).forEach(key => {
            Vue.filter(`${key}`, tools[key]);
            Vue.prototype[`${key}`] = tools[key]
        });

        Object.keys(exp).forEach(key => {
            Vue.prototype[`${key}`] = exp[key]
        });

        Object.keys(tools).forEach(key => {
            Vue.prototype[`${key}`] = tools[key]
        });

        Object.keys(md5).forEach(key => {
            Vue.prototype[`${key}`] = md5[key]
        });

        Vue.prototype.$axios = axios;
    }
}

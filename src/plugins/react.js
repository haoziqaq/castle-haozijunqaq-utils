import axios from '../axios'
import exp from '../exp'
import formatter from '../formatter'
import tools from '../tools'
import * as md5 from '../md5'

export default function (React) {
    return class ReactInjectClass extends React.Component {
        constructor(props) {
            super(props);
            this.$axios = axios;
            Object.keys(exp).forEach(key => {
                this[`${key}`] = exp[key];
            });
            Object.keys(formatter).forEach(key => {
                this[`${key}`] = formatter[key];
            });
            Object.keys(tools).forEach(key => {
                this[`${key}`] = tools[key];
            });
            Object.keys(md5).forEach(key => {
                this[`${key}`] = md5[key];
            });
        }
    }
}









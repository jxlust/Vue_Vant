import axios from 'axios'
import QS from 'qs'
import store from '../store'
import router from '../router'
import { Toast } from 'vant'

axios.defaults.baseURL ='';
axios.defaults.timeout=10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const env = process.env.NODE_ENV;
console.log(process.env);
if(env == 'development'){ //开发环境用本地mock或者线上的mock模拟数据仓库
    axios.defaults.baseURL='https://www.easy-mock.com/mock/5b7a8280bf95d870586e7a86/music';
    // axios.defaults.baseURL='';
}else if(env == 'debug'){
    axios.defaults.baseURL='https://www.easy-mock.com/mock/5b7a8280bf95d870586e7a86/music';
}else if(env == 'production'){
    axios.defaults.baseURL='http://www.production.com'
}

// 设置请求拦截器
axios.interceptors.request.use(
    config =>{
        // 每次发送请求之前判断vuex是否存在token
        // 如果存在，则统一在http请求的header上加上token,这样后台根据token判断你的登录情况
        // 即使本地存在token,也有可能token过期，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error)
    }
)

// 设置响应拦截器
axios.interceptors.response.use(
    response =>{
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据，否则抛出错误信息
        if(response.status===200){
            return Promise.resolve(response);
        }else{
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是2开头的情况下对不同状态码进行不同操作
    error=> {
        if (error.response.status) {
            switch (error.response.status) {
                // 401：未登录
                //跳转到登录页面携带当前页面路径
                //在登录成功后返回当前页面，这一步需要在登录页面操作
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    break;
                //  403 token过期
                // 登录过期对用户进行提示
                //清除本地token和vuex中的token
                // 跳转登录页面
                case 403:
                    Toast({
                        message: '登录过期，请重新登录',
                        duration: 1000,
                        forbidClick: true
                    });
                    //清除token
                    localStorage.removeItem('token');
                    store.commit('loginSuccess', null);
                    //跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        })
                    }, 1000);
                    break;
                //404请求不存在
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    })
            }
            return Promise.reject(error.response);
        }
    }
)
/**
 * get方法，get请求
 * @param url [请求地址]
 * @param params [请求参数]
 */
export function get(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{
            params:params
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        })
    })
}

/**
 * post方法 对应post请求
 * @param url [请求路径]
 * @param params [请求参数]
 */
export function post(url,params){
    return new Promise((resolve,reject)=>{
        axios.post(url,QS.stringify(params))
            .then(res=>{
                resolve(res.data);
            })
            .catch(err=>{
                reject(err.data);
            })
    });
}

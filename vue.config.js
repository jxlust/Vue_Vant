const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
    lintOnSave: true,
    devServer: {
        host: "localhost",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        // proxy: 'http://localhost:8080/',// 配置跨域处理,只有一个代理
        proxy: {
            "/api": {
                target: "https://www.easy-mock.com/mock/5b7a8280bf95d870586e7a86/music", // 要请求的后台地址
                ws: false, // 启用websockets
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    "^/api": "/" // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
                }
            },
        }
    },

    // 多页面打包
    /* pages: {
        page1: {
            // 应用入口配置，相当于单页面应用的main.js，必需项
            entry: 'src/modules/page1/page1.js',

            // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
            template: 'public/page1.html',

            // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
            filename: 'page1.html',

            // 标题，可选项，一般情况不使用，通常是在路由切换时设置title
            // 需要注意的是使用title属性template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'jxl page1 test',
            // 包含的模块，可选项
            // chunks: ['console']
        },
        index:{
            entry: 'src/main.js',
            template: 'public/index.html',
        }
        // 只有entry属性时，直接用字符串表示模块入口
        // client: 'src/modules/client/client.js'
    }, */

    css: {
        // modules: true,
        // sourceMap: false,
        loaderOptions: {
            // css: {
            //     // 这里的选项会传递给 css-loader
            //     importLoaders: 1,
            // },
            // sass: {
            //     // data: `@import "@/assets/reset.scss";`
            //     importLoaders: 1,
            // },
            postcss: {
                plugins: [
                    require('autoprefixer'),
                    require('postcss-plugin-px2rem')({
                        rootValue: 75,
                        // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                        // propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing'],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                        // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
                        // propBlackList: ['font', 'font-size', 'line-height', 'letter-spacing'], //黑名单
                        exclude: /(node_module)/,
                        // selectorBlackList: [], //要忽略并保留为px的选择器
                        // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                        // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                        mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
                        minPixelValue: 1 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                    }),

                    /** viewport适配方法二 */
                    /**
                    require('postcss-px-to-viewport')({
                        // 需要转换的单位，默认为"px"
                        unitToConvert: 'px',
                        // 设计稿的视口宽度, 将根据视口做比例换算
                        viewportWidth: 750,
                        // 转化精度，转换后保留位数
                        unitPrecision: 2,
                        // // 能转化为vw的属性列表
                        // propList: [],
                        // 希望使用的视口单位
                        viewportUnit: 'vw',
                        // 字体使用的视口单位
                        fontViewportUnit: 'vw',
                        // 需要忽略的CSS选择器
                        selectorBlackList: [],
                        // 最小的转换数值
                        minPixelValue: 1,
                        // 媒体查询里的单位是否需要转换单位
                        mediaQuery: true,
                        // 转换后是否添加备用单位
                        replace: true,
                        // 忽略文件目录
                        exclude: /(node_module)/,
                        // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
                        landscape: false,
                        // 横屏时使用的单位
                        landscapeUnit: 'vh',
                        // 横屏时使用的视口宽度
                        landscapeWidth: 1334
                    })
                    */
                ]
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {
                limit: 10240
            }))
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            .set('_conf', resolve('config'))
    }
}
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

const IS_PROD = ['production'].includes(process.env.NODE_ENV)
const filenameHashing = true
const productionSourceMap = !IS_PROD
const assetsDir = ''
const resolve = dir => path.join(__dirname, dir);
function getAssetPath (assetsDir, filePath) {
return assetsDir
? path.posix.join(assetsDir, filePath)
: filePath
}
module.exports = {
publicPath: './',
//生产环境构建文件的目录，默认是dist
outputDir: 'userGuide',
//生产的sourceMap开关
productionSourceMap: false,
lintOnSave: false,

//webpack-dev-server配置
devServer: {
	disableHostCheck: true,
	open: true, //浏览器自动打开页面
	port: 8088,
	https: false,
	hotOnly: false, //热更新（webpack已实现了，这里false即可）
	proxy: {
		//配置跨域
		'/api': {
			target: "http://public-redpacket-mics.sit.sf-express.com",
			ws: true,
			changOrigin: true,
			pathRewrite: {
				'^/api': '/'
			}
		},
	}
},
//第三方插件配置，插件可以作为`options.plugionOptions.xxx访问选项
pluginOptions: {},
transpileDependencies: [

],
css: {
	// modules: false,
	// extract: IS_PROD,
	// sourceMap: false,
	loaderOptions: {
		sass: {
			// 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
			prependData: `
       @import "@/assets/style/global.scss";
       `
		},
		postcss: {
			plugins: [
				require('autoprefixer'),
				require('postcss-plugin-px2rem')({
					rootValue: 37.5,
					// unitPrecision: 5, //允许REM单位增长到的十进制数字。
					// propWhiteList: ['font', 'font-size', 'line-height', 'letter-spacing'],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
					// propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
					// propBlackList: ['font', 'font-size', 'line-height', 'letter-spacing'], //黑名单
					// exclude: /(toast)/,
					// selectorBlackList: ['.van-toast__text','.van-toast--html','.van-toast--text','.van-toast'], //要忽略并保留为px的选择器
					// ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
					// replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
					mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
					minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
				}),
			]
		}
	}
},
//对webpack配置进行更细粒度的修改
chainWebpack: config => {

	//修复HMR
	config.resolve.symlinks(true);

	config.resolve.alias
		.set('@', resolve('src'))
		.set('assets', resolve('src/assets'))
		.set('components', resolve('src/components'))
		.set('static', resolve('src/static'))

	// 制定环境打包js路径
	if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'sit') {
		const isLegacyBundle = process.env.VUE_CLI_MODERN_MODE && !process.env.VUE_CLI_MODERN_BUILD
		const filename = getAssetPath(
			assetsDir,
			`js/[name]${isLegacyBundle ? `-legacy` : ``}${filenameHashing ? '.[hash:8]' : ''}.js`
		)
		config.mode('production').devtool(productionSourceMap ? 'source-map' : false).output.filename(filename).chunkFilename(filename)
	}

	return config
},
//config参数为修改配置
configureWebpack: config => {
	//运行时从外部获取拓展依赖,而bundle中不添加
	// config.externals ={
	//   'Vue': 'vue',
	//   'axios':'axios',
	//   'vue-router':''
	// },
	config.module.rules.push({
		test: /\.js$/,
		use: [{
			loader: 'babel-loader',
			options: {
				presets: []
			}
		}],
		exclude: /node_modules/
})

// if (process.env.NODE_ENV === 'production') {
//   // 为生产环境修改配置...
//   // config.mode = 'production'
//   // 打包去掉注释以及console
//   config.plugins = config.plugins.concat(
//     [
//       new UglifyJsPlugin({
//         uglifyOptions: {
//           compress: {
//             warnings: false,
//             drop_debugger: true,
//             drop_console: true
//           }
//         }
//       })
//     ]
//   )
//   // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖
//   // config.externals = {
//   //   'vue': 'Vue',
//   //   'element-ui': 'ELEMENT',
//   //   'vue-router': 'VueRouter',
//   //   'vuex': 'Vuex',
//   //   'axios': 'axios'
//   // }
// } else {
//   // 为开发环境修改配置...
//   config.mode = 'development'
// }
	//config.entry.app = ['babel-polyfill','./src/main.js'];
	
	// if(IS_PROD){
	//   config.plugins = [
	//     ...config.plugins,
	//     ...plugins
	//   ];
	// }
}

var http = require('http');
var url = require('url');
var fs = require('fs');
var mymodule = require('./mymodule.js');


var comments = [{
		name: '张三1',
		message: '今天天气不错！',
		dateTime: '2015-10-16'
	},
	{
		name: '张三2',
		message: '今天天气不错！',
		dateTime: '2015-10-16'
	},
	{
		name: '张三3',
		message: '今天天气不错！',
		dateTime: '2015-10-16'
	},
	{
		name: '张三4',
		message: '今天天气不错！',
		dateTime: '2015-10-16'
	},
	{
		name: '张三5',
		message: '今天天气不错！',
		dateTime: '2015-10-16'
	}
]

const server = http.createServer(function (req, res) {
	// console.log(req.url);
	var parseObj = url.parse(req.url, true);
	//const {pathname: myurl,query} = url.parse(req.url,true);
	var pathname = parseObj.pathname;
	// var query = parseObj.query;
	console.log("pathname:" + pathname);
	if (pathname === '/favicon.ico') {
		return;
		//return res.end('404 not found..');
	}

	if (pathname === '/') {
		// console.log('front..');
		fs.readFile('../dist/index.html', (err, data) => {
			if (err) {
				console.log(err);
				return res.end('404 not found...');
			}
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			return res.end(data);
		});
	} else if (pathname.indexOf('/js') === 0 || pathname.indexOf('/css') === 0) {
		//访问公开资源文件
		fs.readFile('../dist' + pathname, (err, data) => {
			if (err) {
				return res.end("404 文件没找到");
			}
			return res.end(data);
		})

	} else if (pathname === '/add') {
		fs.readFile('../views/add.html', (err, data) => {
			if (err) {
				return res.end('404 not found');
			}
			res.setHeader('Content-Type', 'text/html;charset=utf-8');
			return res.end(data);
		});
	}
});

server.on('connect', (req, sltSocket, head) => {
	console.log('连接到服务器...');
})

server.listen('8089', () => {
	console.log('runing...');
});
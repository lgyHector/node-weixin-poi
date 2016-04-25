#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

# node-weixin-poi
此模块为微信门店api接口开发，依赖[node-weixin](https://github.com/node-weixin)项目下的工具子项目

node-form-validator

node-weixin-request

node-weixin-util

##Install
```sh
npm install --save node-weixin-poi
```

##Usage

```js

var settings = require('node-weixin-settings');
var poi = require('node-weixin-poi');

var app = {
    id: process.env.APP_ID,
    secret: process.env.APP_SECRET,
    token: process.env.APP_TOKEN
};

poi.getpoilist(app, 0, 10, function(err, resp){
    //TODO: todo sth
});

poi.getpoi(app, '404516217', function(err, resp){
    //TODO: todo sth
});

poi.addpoi(app, poi_data, function(err, resp){
    //TODO: todo sth
});

poi.delpoi(app, '404516217', function(err, resp){
    //TODO: todo sth
});


```


## License

MIT © [lgyhitler]

[npm-image]: https://badge.fury.io/js/node-weixin-poi.svg
[npm-url]: https://badge.fury.io/js/node-weixin-poi
[travis-image]: https://travis-ci.org/lgyhitler/node-weixin-poi.svg?branch=master
[travis-url]: https://travis-ci.org/lgyhitler/node-weixin-poi

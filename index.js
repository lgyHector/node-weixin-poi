'use strict'
var request = require("node-weixin-request");
var settings = require('node-weixin-settings');
var util = require("node-weixin-util");

var baseUrl = 'http://api.weixin.qq.com/cgi-bin/poi/'

function _send(app, url, params, cb){
    settings.get(app.id, 'auth', function(authData){
        var fullUrl = url + '?' + util.toParam({
                access_token: authData.accessToken
            });
        request.json(fullUrl, params, cb);
    })
}

function _arrange_category(resp, cb){
    if(!resp.category_list)
        return cb(null, resp)
    var category_list = resp.category_list;
    var map = {};
    category_list.forEach(function(ca){
        var split = ca.split(',');
        var cate = split[0], sub_cate = split[1] || '';
        if(map[cate]){
            if(sub_cate && map[cate].indexOf(sub_cate) < 0)
                map[cate].push(sub_cate)
        }else{
            map[cate] = [];
            if(sub_cate) map[cate].push(sub_cate)
        }
    })
    cb(null, map);
}

module.exports = {
    addpoi: function(app, params, cb){
        _send(app, baseUrl + 'addpoi', params, cb);
    },
    getpoi: function(app, poi_id, cb){
        _send(app, baseUrl + 'getpoi', {poi_id: poi_id}, cb);
    },
    getpoilist: function(app, begin, limit, cb){
        _send(app, baseUrl + 'getpoilist', {
            begin: begin || 0,
            limit: limit || 10
        }, cb);
    },
    updatepoi: function(app, params, cb){
        _send(app, baseUrl + 'updatepoi', params, cb);
    },
    delpoi: function(app, poi_id, cb){
        _send(app, baseUrl + 'delpoi', {poi_id: poi_id}, cb);
    },
    categorylist: function(app, cb){
        _send(app, baseUrl + 'getwxcategory', {}, function(err, resp){
            if(err) cb(err, resp);
            _arrange_category(resp, cb);
        });
    },
}
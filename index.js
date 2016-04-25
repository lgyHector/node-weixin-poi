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
    }
}
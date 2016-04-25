'use strict';
var assert = require('assert');
var settings = require('node-weixin-settings');
var poi = require('../index');

var app = {
    id: process.env.APP_ID,
    secret: process.env.APP_SECRET,
    token: process.env.APP_TOKEN
};
var poi_data = require('./poi_data.json');
var first_poi_id = '';
describe('node-weixin-poi node module', function () {
    before('set access_token', function(done){
        settings.set(app.id, 'auth', {
            accessToken: 'D40ogpkJgBYxxf0EAIoaLleOTd-Lpp0_o9jChjr9LUYxiJ2BYm_AqyTqMT24j0gg-UWyK32Umgnh2yK5Ko8n9LzVyKqFU9CRLt0Q5etx-qd9T1iqb04dhP5JNZ2i8vkpKVJeAGAPAO'
        });
        done();
    })
    it('should list pois', function(done){
        poi.getpoilist(app, 0, 10, function(err, resp){
            //console.log(err, JSON.stringify(resp));
            assert.equal(true, !err);
            assert.equal(true, resp.errcode === 0);
            assert.equal(true, resp.total_count >= 0);
            first_poi_id = resp.business_list[0].base_info.poi_id;
            done();
        })
    })
    it('should get a poi', function(done){
        poi.getpoi(app, first_poi_id, function(err, resp){
            //console.log(err, resp);
            assert.equal(true, !err);
            assert.equal(true, resp.errcode === 0);
            done();
        })
    })
    /*it('should add a poi', function(done){
        poi.addpoi(app, poi_data, function(err, resp){
            console.log(err, resp);
            done();
        })
    })*/
    it('should delete a poi with id 404516217', function(done){
        poi.delpoi(app, '404516217', function(err, resp){
            assert.equal(true, !err);
            assert.equal(true, resp.errcode === 0 || resp.errcode === 65107);
            done();
        })
    })
})
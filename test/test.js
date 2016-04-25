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
            accessToken: 'Ybv_Kat5k_vL364mjtAmC1dvqz0lFHxMeg0_Di6l7trP1oinmveRm_995T43cHQdFcC4Kc_8rqktMIuwEEmGFJ5DPOp6zp4uhJi3iPn-iS9US2tWtLfqvyLBnePnLh4xNPCgACABDQ'
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
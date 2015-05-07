var assert = require("chai").assert; // node.js core module

describe('redis',function(){

    var seneca = require('seneca')();
    seneca.use('..');

    describe('info',function(){
        it('should connect and get info from server',function(done){
            seneca.act( {lpi:'redis', cmd:'info', redis:{host:'localhost',port:6379}}, function(err,result){
                console.log( '%j', result );
                assert.isObject(result,'result is an object');
                done();
            });
        })
    });

    describe('about',function(){
        it('should return integration properties',function(done){
            seneca.act( {lpi:'redis', cmd:'about'}, function(err,result){
                console.log( '%j', result );
                assert.isObject(result,'result is an object');
                assert.equal(result.name,'redis','name is redis');
                done();
            });
        })
    });


    describe('list',function(){
        it('should return a command\'s json schema',function(done){
            seneca.act({lpi:'redis',cmd:'list'}, function(err,list){
                console.log('%j',list);
                assert.isObject(list,'list is object');
                done();
            });
        });
    });
});






var redis = require("redis");
var schemas = require('./commands');
var plugin = "redis";

var service = {
    "name": "redis",
    "label": "Redis",
    "description": "Redis Integration",
    "version": "0.0.1",
    "main": "redis.js",
    "private": true,
    "form_options": null,
    "is_oauth": false,
    "logo": "//linchpin-web-assets.s3.amazonaws.com/v1/integrations/redis/redis-logo.png",
    "server_integration": true,
    "frontend_integration": true,
    "supports_webhook": false
};

module.exports = function(options) {
    var lpis = this;

    options = lpis.util.deepextend({
    },options);

    lpis.add({lpi:'redis',cmd:'info'},info);
    lpis.add({lpi:'redis',cmd:'about'},about);
    lpis.add({lpi:'redis',cmd:'list'},list);
    lpis.add({lpi:'redis',cmd:'llen'},llen);

    return {
        name:plugin
    };

    function info( args, done ){
        onConnect( args, function(client){
            var data = client.server_info;
            client.quit();
            done(null, data);
        });

    }

    function llen ( args, done ){

        var key = args.redis.key;
        var result = {};

        onConnect( args, function(client){
            client.llen(key,function(err,llen){
                if (err) return console.log(err);

                client.quit();
                result[key] = llen;
                done(null,result);
            });
        });
    }

    function about (args, done ){
      return done(null,service);
    }

    function list (args, done){
        return done(null, schemas);
    }

    function onConnect( args, func ){
        var port = args.redis.port || 6379;
        var host = args.redis.host || "localhost";
        var db = 0;

        if(args.redis.hasOwnProperty('db')){
            db = args.redis.db;
        }

        var client = redis.createClient(port, host, {});
        client.on("ready", function(){
            func(client);
        });
    }
};
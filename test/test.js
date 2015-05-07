
var seneca = require('seneca')();

seneca.use('..')
    .listen();

seneca.act( {lpi:'redis', cmd:'info', redis:{host:'localhost',port:6379}}, function(err,result){
    console.log( '%j', result );
});

seneca.act({lpi:'redis',cmd:'list'}, function(err,result){
    console.log('%j',result);
});
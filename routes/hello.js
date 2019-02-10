var express = require('express');
var router = express.Router();

var http = require('https'); 
var parseString = require('xml2js').parseString;
var fs = require('fs');

router.get('/',(req, res, next) => {
    var opt = {
        key: fs.readFileSync('key.pem'),
	    cert: fs.readFileSync('cert.pem'),
        host:'yume100kairi.hatenablog.com',
        port:443,
        path: '/rss'
    };
    console.log('opt:', opt);
    http.get(opt, (res2) => {
        var body = '';
        res2.on('data', (data) => {     
            body += data;
        });
    console.log('body:', body);
    res2.on('end', () => {
        parseString(body.trim(), (err, result) => {
            var data = {
                title: 'hello!',
                content: result.rss.channel[0].item
            };
        res.render('hello', data);
        });
    })
});
});
module.exports = router;

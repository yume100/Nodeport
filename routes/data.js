var express = require('express');
var router = express.Router();

var mysql = require('mysql'); 

//mysqlの設定情報
var mysql_setting = {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'my-nodeapp-db'
};

//GETアクセスの処理
router.get('/',(req, res, next) => {
    //コネクションの用意
var connection = mysql.createConnection(mysql_setting);

    //データベースに接続
connection.connect();

   //データを取り出す
connection.query('select * from mydata', function(error, results, fields) {
    //データベースアクセス完了時の処理
    if (error == null){
        var data = {title:'会員一覧', 
        content : results,
        link:{href: '/data/add', text:'新規登録はこちら'}
    };
        console.log(data);
        res.render('data/index', data);
    }
});

//接続を解除
connection.end();
    });

//新規作成ページへのアクセス
router.get('/add', (req, res, next) => {
    var data = {
        title: '新規登録',
        content:'入力欄'
    }
    res.render('data/add', data);
});

//新規作成フォーム送信の処理
router.post('/add', (req, res, next) => {
    var name = req.body.name;
    var mail = req.body.mail;
    var bd   = req.body.BirthDay;
    var data = {'name':name, 'mail':mail, 'BirthDay':bd};

//データベースの設定情報
var connection = mysql.createConnection(mysql_setting);

//データベースに接続
connection.connect();

//データを取り出す
connection.query('insert into mydata set ?', data,
        function (error, results, fields) {
            res.redirect('/data/end');
        });
//接続を解除
connection.end();
});

//登録確認画面

router.get('/end',(req, res, next) => {

        var data = {title:'完了画面', 
        content : '登録が完了しました',
        link:{href: '/data', text:'一覧に戻る'}
    };
        res.render('data/end', data);
});

module.exports = router;

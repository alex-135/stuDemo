var express = require('express');
// 导入userDao
var userDao = require('./dao/userDao');

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 获取用户列表
app.get('/getUserList', function (req, res) {
    // 去操作数据库接口，获取用户列表
    userDao.getUserList(function (result) {
        // console.log(result); 
        res.send(result);
    });
    
});

// 新增用户
app.get('/addUser', function (req, res) {
    // 去操作数据库接口，添加用户
    userDao.addUser([req.query.name, req.query.age], function (result) {
        // 1表示成功，-1表示失败
        if (result) {
            res.send({status: 1});
        } else {
            res.send({status: -1});
            console.log('insert err...');
        }
    });
});

// 更新用户
app.get('/modifyUserById', function (req, res) {
    userDao.modifyUserById([req.query.name, req.query.age, req.query.id], 
        function (result) {
            if (result) {
                res.send({status: 1});
            } else {
                res.send({status: -1});
            }
    });
});



app.listen(8888, function () {
    console.log('用户管理后台服务启动成功...');
})
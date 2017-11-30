// 这个文件用来操作和user相关的操作数据库接口
// 导入数据库配置
var dbConfig = require('../db/dbConfig');
// 导入mysql模块
var mysql = require('mysql');

// 编写数据接口
// 1、获取所有用户列表
function getUserList(callback) {
    // 创建连接对象
    var connection = mysql.createConnection(dbConfig.mysql);
    // 开始连接
    connection.connect();
    // 编写sql语句
    var sql = "select * from user order by age";

    // 进行查询
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[ SELECT - ERROR ] ', err.message);
            return;
        }

        // console.log(result);
        // return result;
        // 通过回调函数把结果传回去
        callback(result);
    });

    // 这里少一个关闭数据库链接
    connection.end();
}

// 新增用户
function addUser (params, callback) {
    // 创建连接对象
    var connection = mysql.createConnection(dbConfig.mysql);
    // 开始连接
    connection.connect();

    // 这里使用 ? 来占位
    var sql = "insert into user (name, age) values (?, ?)";

    // params是一个数组
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[ INSERT ERROR ]', err.message);
            return;
        }
        // console.log(result);
        callback(result);

        connection.end();
    });
}

// 根据用户ID更新用户信息
function modifyUserById (params, callback) {
    // 创建连接对象
    var connection = mysql.createConnection(dbConfig.mysql);
    // 开始连接
    connection.connect();

    var sql = "update user set name = ?, age = ? where id = ?";

    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log('[ UPDATE ERROR ]', err.message);
            return;
        }

        callback(result);

        connection.end();
    });
}


module.exports = {
    getUserList: getUserList,
    addUser: addUser,
    modifyUserById: modifyUserById
}

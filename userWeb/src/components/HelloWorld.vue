<template>
  <div class="container">
      <h1>用户管理</h1>
      <hr />
      <table class="table table-striped">
          <tr>
              <th>编辑</th>
              <th>姓名</th>
              <th>年龄</th>
              <th>删除</th>
          </tr>
          <!-- <tr>
              <td>
                  <button class="btn">
                      <span class="glyphicon glyphicon-edit"></span>
                      编辑
                  </button>
              </td>
              <td>刘升升</td>
              <td>28</td>
              <td>
                  <span class="glyphicon glyphicon-remove"></span>
              </td>
          </tr> -->
          <tr v-for="(user, index) in userList" :key="index">
              <td>
                  <button class="btn" @click="editUser(index)">
                      <span class="glyphicon glyphicon-edit"></span>
                      编辑
                  </button>
              </td>
              <td>{{ user.name }} -- {{ user.id }}</td>
              <td>{{ user.age }}</td>
              <td>
                  <span class="glyphicon glyphicon-remove"></span>
              </td>
          </tr>
      </table>
      <button class="btn btn-success" @click="addUser">
          <span class="glyphicon glyphicon-user"></span>
          添加新用户
      </button>
      <hr />
      <h2>{{ title }}</h2>
      <form class="form-horizontal">
          <div class="form-group">
              <label for="inputEmail3" class="col-sm-2 control-label">姓名</label>
              <div class="col-sm-10">
              <input type="text" class="form-control" id="inputEmail3" 
                placeholder="姓名" v-model="userModel.name">
              </div>
          </div>
          <div class="form-group">
              <label for="inputPassword3" class="col-sm-2 control-label">年龄</label>
              <div class="col-sm-10">
              <input type="text" class="form-control" id="inputPassword3" 
                placeholder="年龄" v-model="userModel.age">
              </div>
          </div>
          <!-- 注意这里：阻止默认事件 -->
          <button class="btn btn-success" @click.prevent="saveUser">
              <span class="glyphicon glyphicon-download-alt"></span>
              保存
          </button>
      </form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      userList: [],
      // 和输入框绑定的model
      userModel: {
        name: '',
        age: ''
      },
      // 标题
      title: '添加新用户',
      // 存储编辑索引
      editIndex: 0
    }
  },
  methods: {
    updateData() {
      this.axios.get('http://127.0.0.1:8888/getUserList').then(res => {
      // console.log(res);
        this.userList = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    // 点击添加按钮触发逻辑
    addUser() {
      // 修改按钮标题
      this.title = '添加新用户';

      // 清空输入框内容
      this.userModel.name = '';
      this.userModel.age = '';
    },
    // 点击编辑按钮触发逻辑
    editUser(index) {
      // 修改标题
      this.title = '编辑用户';

      // 把编辑的index存储起来
      this.editIndex = index;

      // 更新model
      this.userModel.name = this.userList[index].name;
      this.userModel.age = this.userList[index].age;
    },
    // 保存用户（新增 or 编辑）
    saveUser() {
      if (this.title == '添加新用户') {
        this.axios.get('http://127.0.0.1:8888/addUser?name=' + this.userModel.name + '&age=' + this.userModel.age)
          .then(res => {
            if (res.data.status == 1) {
              alert('插入成功');
              // this.userList.push({
              //   name: this.userModel.name,
              //   age: this.userModel.age
              // });
              this.updateData();
              // 每次新增完用户，清空信息
              this.userModel.name = '';
              this.userModel.age = '';
            } else {
              alert('插入失败');
            }
          }).catch(err => {
            console.log(err);
          })
      } else {
        this.axios.get('http://127.0.0.1:8888/modifyUserById?name=' + this.userModel.name + '&age=' + this.userModel.age + '&id=' + this.userList[this.editIndex].id)
          .then(res => { 
            if (res.data.status == 1) {
              alert('更新成功！！');
              // 更新所编辑的用户
              this.userList[this.editIndex].name = this.userModel.name;
              this.userList[this.editIndex].age = this.userModel.age;
            } else {
              alert('更新失败！！');
            }
          }).catch(err => {
            console.log(err);
          })
        
      }
    }
  },
  created() {
    // 在这个钩子函数里 请求数据（暂时写假的）
    // this.userList = [
    //   {name: '小黑', age: 18},
    //   {name: '小白', age: 20}
    // ]
    this.axios.get('http://127.0.0.1:8888/getUserList').then(res => {
      // console.log(res);
      this.userList = res.data;
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

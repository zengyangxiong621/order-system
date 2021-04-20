<template>
  <div id="login">
    <Tabs v-model="active" swipeable class="form" animated swipeable @change="tabChange()">
      <Tab title="登录">
        <Form @submit="login">
          <Field v-model="loginName" name="用户名" label="用户名" placeholder="用户名"/>
          <Field v-model="loginPwd" type="password" name="密码" label="密码" placeholder="密码"/>
          <div style="margin: 16px;">
            <Button round block type="info" native-type="submit">提交</Button>
          </div>
        </Form>
      </Tab>
      <Tab title="注册">
        <Form @submit="register">
          <Field v-model="registerName" name="用户名" label="用户名" placeholder="用户名"/>
          <Field v-model="registerPwd" type="password" name="密码" label="密码" placeholder="密码"/>
          <div style="margin: 16px;">
            <Button round block type="info" native-type="submit">提交</Button>
          </div>
        </Form>
      </Tab>
    </Tabs>

  </div>
</template>

<script>
import { Form, Field, Button, Tabs, Tab, Toast, Notify } from 'vant';
import { userLogin, userRegister } from '@/network/admin';

export default {
  name: 'login',
  data() {
    return {
      active: 0,
      loginName: '',
      loginPwd: '',
      registerName: '',
      registerPwd: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await userLogin('http://123.56.31.41/admin/login', {
          username: this.loginName,
          password: this.loginPwd
        });
        console.log(res);
        Notify({
          type: 'success',
          message: '登录成功',
          duration: 1000
        });
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('username', res.data.user.username);
        sessionStorage.setItem('id', res.data.user._id);
        // console.log(sessionStorage);
        // console.log(sessionStorage);
        this.loginName = '';
        this.loginPwd = '';
        await this.$router.push('/menu');

      } catch (error) {
        let statusCode = error.message.replace(/[^\d]/g, '');
        if (statusCode == 422) {
          Notify({
            type: 'warning',
            message: '用户不存在，请注册',
            duration: 1000
          });
        }
        if (statusCode == 421) {
          Notify({
            type: 'warning',
            message: '账号密码错误',
            duration: 1000
          });
        }
        // console.log(error.message);
      }
    },
    async register() {
      try {
        const newUser = await userRegister({
          username: this.registerName.trim(),
          password: this.registerPwd.trim()
        });
        // console.log(newUser);
        Notify({
          type: 'success',
          message: '注册成功',
          duration: 1000
        });
        this.active = 0;
      } catch (error) {
        let statusCode = error.message.replace(/[^\d]/g, '');
        if (statusCode == 423) {
          Notify({
            type: 'warning',
            message: '用户已存在',
            duration: 1000
          });
        }
        if (statusCode == 424) {
          Notify({
            type: 'warning',
            message: '账号密码不能为空',
            duration: 1000
          });
        }
      }
    },
    tabChange() {
      this.loginName = '';
      this.loginPwd = '';
      this.registerName = '';
      this.registerPwd = '';
    }
  },
  mounted() {

  },
  components: {
    Form,
    Field,
    Button,
    Tabs,
    Tab,
    Toast,
    Notify
  }
};
</script>

<style scoped lang="less">
#login {
  height: 100%;
  width: 100%;
  background-color: #f7f8fa;
  z-index: 999;
  position: relative;

  .form {
    width: 100%;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);

  }
}
</style>

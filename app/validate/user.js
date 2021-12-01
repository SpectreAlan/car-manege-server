'use strict';
module.exports = app => {

  const { validator } = app;
  validator.addRule('username', (rule, value) => {
    if (!value.match(/^1[3|4|5|7|8]\d{9}$/)) {
      return '手机号格式错误';
    }
  });
  validator.addRule('password', (rule, value) => {
    if (!value.match(/[0-9a-zA-Z]{32}$/)) {
      return '密码格式错误';
    }
  });
  validator.addRule('captcha', (rule, value) => {
    if (!value.match(/[0-9a-zA-Z]{4}/)) {
      return '验证码格式错误';
    }
  });
};

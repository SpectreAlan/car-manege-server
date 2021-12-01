'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /**
      ---------------------------后台管理API--------------------------------
 */
  // 登录
  router.get('/', controller.home.index);
  router.get('/user/captcha', controller.user.captcha);
  router.post('/user/login', controller.user.login);
  router.post('/user/logout', controller.user.logout);
  router.post('/user/info', controller.user.userInfo);
  router.post('/user/theme', controller.admin.user.edit);
  // 报表
  router.post('/report/orders', controller.report.orders);
  router.post('/report/spending', controller.report.spending);
  router.post('/report/salary', controller.report.salary);
  // 用户管理
  router.post('/users/search', controller.admin.user.search);
  router.post('/users/add', controller.admin.user.add);
  router.post('/users/del', controller.admin.user.delete);
  router.post('/users/edit', controller.admin.user.edit);
  router.post('/users/roles', controller.admin.user.roles);
  // 菜单管理
  router.post('/menu/search', controller.admin.menu.search);
  router.post('/menu/add', controller.admin.menu.add);
  router.post('/menu/del', controller.admin.menu.delete);
  router.post('/menu/edit', controller.admin.menu.edit);
  // 角色管理
  router.post('/role/search', controller.admin.role.search);
  router.post('/role/add', controller.admin.role.add);
  router.post('/role/del', controller.admin.role.delete);
  router.post('/role/edit', controller.admin.role.edit);
  // 车辆管理
  router.post('/cars/search', controller.system.cars.search);
  router.post('/cars/add', controller.system.cars.add);
  router.post('/cars/edit', controller.system.cars.edit);
  router.post('/cars/del', controller.system.cars.delete);
  router.post('/cars/all', controller.system.cars.carsTypes);
  // 司机管理
  router.post('/drivers/search', controller.system.drivers.search);
  router.post('/drivers/add', controller.system.drivers.add);
  router.post('/drivers/edit', controller.system.drivers.edit);
  router.post('/drivers/del', controller.system.drivers.delete);
  router.post('/drivers/all', controller.system.drivers.all);
  // 发货单位
  router.post('/delivery/search', controller.system.delivery.search);
  router.post('/delivery/add', controller.system.delivery.add);
  router.post('/delivery/edit', controller.system.delivery.edit);
  router.post('/delivery/del', controller.system.delivery.delete);
  // 订单管理
  router.post('/orders/search', controller.ordersSystem.orders.search);
  router.post('/orders/add', controller.ordersSystem.orders.add);
  router.post('/orders/edit', controller.ordersSystem.orders.edit);
  router.post('/orders/del', controller.ordersSystem.orders.delete);
  router.post('/orders/types', controller.ordersSystem.orders.searchTypes);
  // 维保信息
  router.post('/maintenance/search', controller.maintenance.search);
  router.post('/maintenance/add', controller.maintenance.add);
  router.post('/maintenance/edit', controller.maintenance.edit);
  router.post('/maintenance/del', controller.maintenance.delete);
  // 员工工资
  router.post('/salary/search', controller.salary.search);
  router.post('/salary/add', controller.salary.add);
  router.post('/salary/edit', controller.salary.edit);
  router.post('/salary/del', controller.salary.delete);
};

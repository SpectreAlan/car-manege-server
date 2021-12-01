'use strict';

const Controller = require('../base_controller');

class OrdersController extends Controller {
  async search() {
    const { service, ctx, app } = this;
    const {delivery_time,delivery, car, limit, page} = ctx.request.body;
    let total = 0;
    let list = []
    if(!delivery_time){
      total = await service.sql.selectCount('orders')
      list = await service.sql.select({
        table: 'orders',
        columns: [ 'id', 'delivery', 'delivery_time', 'car', 'driver_name', 'goods', 'count', 'price' ,'upAddress', 'downAddress', 'status', 'paid', 'update_time', 'remark']
      });
    }else {
      const l = 'select id,delivery,car,count,price,delivery_time,goods,driver_name,upAddress,downAddress, paid,status,update_time from orders where delivery_time >= ';
      const str = `'${delivery_time[0]}' and delivery_time <= '${delivery_time[1]}'`;
      const totalSql = 'select count(id) from  orders where delivery_time >=  ' + str
      list = await app.mysql.query(l + str);
      const totalObj = await app.mysql.query(totalSql);
      total = totalObj[0]['count(id)']
    }
    this.success({ result: { total, list } });
  }
  async searchTypes() {
    const { service } = this;
    const delivery = await service.sql.select({ table: 'delivery', columns: ['delivery', 'id'] ,selectAll: true});
    const cars = await service.sql.select({ table: 'cars', columns: ['car_num', 'id'] ,selectAll: true });
    const drivers = await service.sql.select({ table: 'drivers', columns: ['driver_name', 'id'] ,selectAll: true});
    this.success({ result: {delivery, cars, drivers} });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'orders', param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = await service.sql.update({ table: 'orders', param });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'orders' });
    this.success({ result, type: '删除' });
  }
}

module.exports = OrdersController;

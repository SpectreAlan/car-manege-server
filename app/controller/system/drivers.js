'use strict';

const Controller = require('../base_controller');

class DriversController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('drivers');
    const list = await service.sql.select({ table: 'drivers', columns: [ 'id', 'driver_name', 'join_time', 'phone', 'update_time', 'remark', 'status', 'salary', 'leave_time'] });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service,ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'drivers',param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service } = this;
    const result = await service.sql.update({ table: 'drivers' });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'drivers' });
    this.success({ result, type: '删除' });
  }
  async all() {
    const result = await this.service.sql.select({ table: 'drivers', columns: ['driver_name', 'id'] ,selectAll: true });
    this.success({ result});
  }
}

module.exports = DriversController;

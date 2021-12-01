'use strict';

const Controller = require('./base_controller');

class MaintenanceController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('maintenance');
    const list = await service.sql.select({
      table: 'maintenance',
      columns: [ 'id', 'create_time', 'company', 'money', 'content', 'type', 'remark', 'car', 'update_time']
    });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'maintenance', param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service, ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = await service.sql.update({ table: 'maintenance', param });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'maintenance' });
    this.success({ result, type: '删除' });
  }
}

module.exports = MaintenanceController;

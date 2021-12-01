'use strict';

const Controller = require('./base_controller');

class SalaryController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('salary');
    const list = await service.sql.select({ table: 'salary', columns: [ 'id', 'driver', 'type', 'update_time', 'remark', 'month', 'paid'] });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service,ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'salary',param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service } = this;
    const result = await service.sql.update({ table: 'salary' });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'salary' });
    this.success({ result, type: '删除' });
  }
}

module.exports = SalaryController;

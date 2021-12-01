'use strict';

const Controller = require('../base_controller');

class DeliveryController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('delivery');
    const list = await service.sql.select({ table: 'delivery', columns: [ 'id', 'delivery', 'contact', 'phone', 'update_time', 'remark'] });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service,ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'delivery',param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service } = this;
    const result = await service.sql.update({ table: 'delivery' });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'delivery' });
    this.success({ result, type: '删除' });
  }
}

module.exports = DeliveryController;

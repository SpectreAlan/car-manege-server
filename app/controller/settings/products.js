'use strict';

const Controller = require('../base_controller');

class ProductsController extends Controller {
  async search() {
    const { service } = this;
    const result = await service.sql.selectAll({ table: 'products' });
    this.success({ result });
  }
  async add() {
    const { service,ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'products',param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service } = this;
    const result = await service.sql.update({ table: 'products' });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'products' });
    this.success({ result, type: '删除' });
  }
}

module.exports = ProductsController;

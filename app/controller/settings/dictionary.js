'use strict';

const Controller = require('../base_controller');

class DictionaryController extends Controller {
  async search() {
    const { service } = this;
    const result = await service.sql.selectAll({ table: 'dictionary' });
    this.success({ result });
  }
  async add() {
    const { service } = this;
    const result = service.sql.insert({ table: 'dictionary' });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service } = this;
    const result = await service.sql.update({ table: 'dictionary' });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'dictionary' });
    this.success({ result, type: '删除' });
  }
  async types() {
    const { service,ctx } = this;
    const result = await service.sql.select({
      table: 'dictionary',
      columns: [ 'id', 'dic_title', 'dic_key', 'dic_val', 'update_time', 'remark', 'dic_type'],
      where: ctx.request.body
    });
    this.success({ result });
  }
}

module.exports = DictionaryController;


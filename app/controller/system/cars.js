'use strict';

const Controller = require('../base_controller');

class CarsController extends Controller {
  async search() {
    const { service } = this;
    const total = await service.sql.selectCount('cars');
    const list = await service.sql.select({ table: 'cars', columns: [ 'id', 'car_type', 'car_num', 'buy_time', 'update_time', 'remark', 'insurance_time'] });
    this.success({ result: { total, list } });
  }
  async add() {
    const { service,ctx } = this;
    const param = { ...ctx.request.body };
    param.update_time = service.tools.time();
    const result = service.sql.insert({ table: 'cars',param });
    this.success({ result, type: '添加' });
  }
  async edit() {
    const { service } = this;
    const result = await service.sql.update({ table: 'cars' });
    this.success({ result, type: '编辑' });
  }
  async delete() {
    const result = await this.service.sql.delete({ table: 'cars' });
    this.success({ result, type: '删除' });
  }
  async carsTypes() {
    const result = await this.service.sql.select({ table: 'cars', columns: ['car_num', 'id'] ,selectAll: true });
    this.success({ result});
  }
}

module.exports = CarsController;

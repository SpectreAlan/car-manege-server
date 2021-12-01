'use strict';

const Controller = require('./base_controller');

class ReportController extends Controller {
  async orders() {
    const { ctx, app, service } = this;
    const {type,time} = ctx.request.body;
    const carList = await service.sql.select({ table: 'cars', columns: ['car_num', 'id'] ,selectAll: true, where: {} });
    const cartypes = {}
    for (let i=0;i<carList.length;i++){
      cartypes[carList[i].id] = carList[i].car_num
    }
    const l = 'select car,count,price,delivery_time,driver_name,paid from orders where delivery_time >= ';
    const str = type ? `'${time}-01-01' and delivery_time <= '${time}-12-31'` : `'${time}-01' and delivery_time <= '${time}-31'`;
    const list = await app.mysql.query(l + str);
    let xAxis = []
    const carsMoney = {}
    const carsCount = {}
    let orderMoney = 0
    let orderCount = 0
    if (type){
      for (let i=1;i<13;i++) {
        xAxis.push(time + '-' + i)
      }
      for (let i=0;i<list.length;i++) {
        const {car, delivery_time, price, count} = list[i]
        const carId = cartypes[car]
        if (!carsMoney[carId]) {
          carsMoney[carId] = new Array(12).fill(0)
          carsCount[carId] = new Array(12).fill(0)
        }
        const index = new Date(delivery_time).getMonth()
        const money = Number((price * count).toFixed(2))
        carsMoney[carId][index] += money
        orderMoney += money
        carsCount[carId][index] += 1
        orderCount += 1
      }
    }else {
      const t = time.split('-')
      const lastDay = new Date(t[0],t[1],0).getDate() + 1
      for (let i=1;i<lastDay;i++) {
        xAxis.push(i)
      }
      for (let i=0;i<list.length;i++) {
        const {car, delivery_time, price, count} = list[i]
        const carId = cartypes[car]
        if (!carsMoney[carId]) {
          carsMoney[carId] = new Array(lastDay).fill(0)
          carsCount[carId] = new Array(lastDay).fill(0)
        }
        const index = new Date(delivery_time).getDate() - 1
        const money = Number((price * count).toFixed(2))
        carsMoney[carId][index] += money
        carsCount[carId][index] += 1
        orderMoney += money
        orderCount += 1
      }
    }
    this.success({ result: {xAxis, carsMoney, carsCount, orderMoney, orderCount} });
  }
  async spending() {
    const { ctx, app, service } = this;
    const {type,time} = ctx.request.body;
    const carList = await service.sql.select({ table: 'cars', columns: ['car_num', 'id'] ,selectAll: true, where: {} });
    const cartypes = {}
    for (let i=0;i<carList.length;i++){
      cartypes[carList[i].id] = carList[i].car_num
    }
    const l = 'select car,type,money,create_time from maintenance where create_time >= ';
    const str = type ? `'${time}-01-01' and create_time <= '${time}-12-31'` : `'${time}-01' and create_time <= '${time}-31'`;
    const list = await app.mysql.query(l + str);
    const types = { 0: '车辆加油', 1: '更换轮胎', 2: '车辆修理', 3: '购置车险' }
    let xAxis = []
    const carsMoney = {}
    const typesMoney = {}
    let totalSpending = 0
    if (type){
      for (let i=1;i<13;i++) {
        xAxis.push(time + '-' + i)
      }
      for (let i=0;i<list.length;i++) {
        const {car, create_time, type, money} = list[i]
        const typeNmae = types[type]
        const carId = cartypes[car]
        if (!carsMoney[carId]) {
          carsMoney[carId] = new Array(12).fill(0)
        }
        if (!typesMoney[typeNmae]) {
          typesMoney[typeNmae] = new Array(12).fill(0)
        }
        const index = new Date(create_time).getMonth()
        carsMoney[carId][index] += Number(money)
        totalSpending += Number(money)
        typesMoney[typeNmae][index] += Number(money)
      }
    }else {
      const t = time.split('-')
      const lastDay = new Date(t[0],t[1],0).getDate() + 1
      for (let i=1;i<lastDay;i++) {
        xAxis.push(i)
      }
      for (let i=0;i<list.length;i++) {
        const {car, create_time, type, money} = list[i]
        const typeNmae = types[type]
        const carId = cartypes[car]
        if (!carsMoney[carId]) {
          carsMoney[carId] = new Array(lastDay).fill(0)
        }
        if (!typesMoney[typeNmae]) {
          typesMoney[typeNmae] = new Array(lastDay).fill(0)
        }
        const index = new Date(create_time).getDate() - 1
        carsMoney[carId][index] += Number(money)
        typesMoney[typeNmae][index] += Number(money)
        totalSpending += Number(money)
      }
    }
    this.success({ result: {xAxis, typesMoney, carsMoney, totalSpending } });
  }
  async salary() {
    const { ctx, app, service } = this;
    const {type, time} = ctx.request.body;
    const year = type ? time : new Date(time).getUTCFullYear()
    const drivers = await service.sql.select({ table: 'drivers', columns: ['driver_name', 'id'] ,selectAll: true, where: {} });
    const driversTypes = {}
    for (let i=0;i<drivers.length;i++){
      driversTypes[drivers[i].id] = drivers[i].driver_name
    }
    const l = 'select driver,paid,month from salary where month >= ';
    const str = `'${year}-01' and month <= '${year}-12'`;
    const list = await app.mysql.query(l + str);
    let xAxis = []
    const salaryTypes = {}
    let totalSalary = 0
    for (let i=1;i<13;i++) {
      xAxis.push(time + '-' + i)
    }
    const moneyType = {
      0: '预支工资',
      1: '工资发放',
      2: '工资补发',
      3: '奖金',
      4: '员工罚款'
    }
    for (let i=0;i<list.length;i++) {
      const {driver, month, paid, type} = list[i]
      const driverName = driversTypes[driver]
      if (!salaryTypes[driverName]) {
        salaryTypes[driverName] = new Array(12).fill(0)
      }
      const index = new Date(month).getMonth()
      if (type === '4') {
        salaryTypes[driverName][index] -= Number(paid)
        totalSalary -= Number(paid)
      }else{
        salaryTypes[driverName][index] += Number(paid)
        totalSalary += Number(paid)
      }
    }
    this.success({ result: {xAxis, salaryTypes, totalSalary } });
  }
}

module.exports = ReportController;


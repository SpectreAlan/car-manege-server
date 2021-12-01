// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBaseController = require('../../../app/controller/base_controller');
import ExportHome = require('../../../app/controller/home');
import ExportMaintenance = require('../../../app/controller/maintenance');
import ExportReport = require('../../../app/controller/report');
import ExportSalary = require('../../../app/controller/salary');
import ExportUpload = require('../../../app/controller/upload');
import ExportUser = require('../../../app/controller/user');
import ExportAdminMenu = require('../../../app/controller/admin/menu');
import ExportAdminRole = require('../../../app/controller/admin/role');
import ExportAdminUser = require('../../../app/controller/admin/user');
import ExportOrdersSystemOrders = require('../../../app/controller/ordersSystem/orders');
import ExportSettingsDictionary = require('../../../app/controller/settings/dictionary');
import ExportSettingsProducts = require('../../../app/controller/settings/products');
import ExportSystemCars = require('../../../app/controller/system/cars');
import ExportSystemDelivery = require('../../../app/controller/system/delivery');
import ExportSystemDrivers = require('../../../app/controller/system/drivers');

declare module 'egg' {
  interface IController {
    baseController: ExportBaseController;
    home: ExportHome;
    maintenance: ExportMaintenance;
    report: ExportReport;
    salary: ExportSalary;
    upload: ExportUpload;
    user: ExportUser;
    admin: {
      menu: ExportAdminMenu;
      role: ExportAdminRole;
      user: ExportAdminUser;
    }
    ordersSystem: {
      orders: ExportOrdersSystemOrders;
    }
    settings: {
      dictionary: ExportSettingsDictionary;
      products: ExportSettingsProducts;
    }
    system: {
      cars: ExportSystemCars;
      delivery: ExportSystemDelivery;
      drivers: ExportSystemDrivers;
    }
  }
}

// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAliyun = require('../../../app/service/aliyun');
import ExportGithub = require('../../../app/service/github');
import ExportSql = require('../../../app/service/sql');
import ExportTools = require('../../../app/service/tools');
import ExportApiUser = require('../../../app/service/api/user');

declare module 'egg' {
  interface IService {
    aliyun: AutoInstanceType<typeof ExportAliyun>;
    github: AutoInstanceType<typeof ExportGithub>;
    sql: AutoInstanceType<typeof ExportSql>;
    tools: AutoInstanceType<typeof ExportTools>;
    api: {
      user: AutoInstanceType<typeof ExportApiUser>;
    }
  }
}

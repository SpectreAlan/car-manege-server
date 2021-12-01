// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthority = require('../../../app/middleware/authority');
import ExportErrorHandler = require('../../../app/middleware/error_handler');

declare module 'egg' {
  interface IMiddleware {
    authority: typeof ExportAuthority;
    errorHandler: typeof ExportErrorHandler;
  }
}

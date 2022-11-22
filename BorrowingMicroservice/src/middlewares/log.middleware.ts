import {Request, Response, NextFunction} from 'express';

const logMiddleware = (request :Request , response :Response, next :NextFunction) => {
  const { method, url } = request;
  const time = new Date().getTime();
  console.log(`[ExpressJs LOG] - ${method}: ${url} [${time}]`);
  next();
};
export default logMiddleware;
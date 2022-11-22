import {Request, Response} from 'express';

const notFoundMiddleware = (request: Request, response: Response) => {
  return response.status(404).json({
    "message": "Resource not found"
  });
};

export default notFoundMiddleware;
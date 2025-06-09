import httpCounterMiddleware from './httpCounterMiddleware';
import { requestCounter, responseCounter } from '../utils/metrics';
import { Request, Response, NextFunction } from 'express';

describe('httpCounterMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { method: 'POST', url: '/api/test', originalUrl: '/api/test' };
    res = {
      statusCode: 201,
      statusMessage: 'Created',
      on: jest.fn((event, cb) => {
        if (event === 'finish') cb();
        return res as Response;
      }),
    };
    next = jest.fn();
    jest.spyOn(requestCounter, 'inc').mockClear();
    jest.spyOn(responseCounter, 'inc').mockClear();
  });

  it('should increment requestCounter with method and endpoint', () => {
    httpCounterMiddleware(req as Request, res as Response, next as NextFunction);
    expect(requestCounter.inc).toHaveBeenCalledWith({ method: 'POST', endpoint: '/api/test' });
  });

  it('should increment responseCounter with method, endpoint, status_code, and status_message on finish', () => {
    httpCounterMiddleware(req as Request, res as Response, next as NextFunction);
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    expect(responseCounter.inc).toHaveBeenCalledWith({
      method: 'POST',
      endpoint: '/api/test',
      status_code: 201,
      status_message: 'Created',
    });
  });

  it('should call next()', () => {
    httpCounterMiddleware(req as Request, res as Response, next as NextFunction);
    expect(next).toHaveBeenCalled();
  });
});

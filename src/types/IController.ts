import { IAPIResponse } from "./IAPIResponse";
import { RequestHandler } from "express";

export interface IController {
  create: RequestHandler<unknown, IAPIV1Response>;
  getAll: RequestHandler<unknown, IAPIV1Response>;
  getById: RequestHandler<unknown, IAPIV1Response>;
  update: RequestHandler<unknown, IAPIV1Response>;
  delete: RequestHandler<unknown, IAPIV1Response>;
}

export interface IAPIV1Response<D = object[] | object> extends IAPIResponse<D> {
  version: "v1",
}



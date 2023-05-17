import { IAPIV1Response, IController } from "../../../types/IController";
import { RequestHandler } from "express";
import { SuccessMessages } from "../../../errors/errorsMessages";
import { Locale } from "../../../types/locale";

class UserController implements IController {
  create: RequestHandler<unknown, IAPIV1Response> = (req, res) => {
    res.json({
      locale: Locale.enIN,
      version: "v1",
      success: true,
      message: SuccessMessages.created
    })
  };
  delete: RequestHandler<unknown, IAPIV1Response> = (req, res) => {
    res.json({
      locale: Locale.enIN,
      version: "v1",
      success: true,
      message: SuccessMessages.deleted
    })
  }
  getAll: RequestHandler<unknown, IAPIV1Response> = (req, res) => {
    res.json({
      locale: Locale.enIN,
      version: "v1",
      success: true,
      data: []
    })
  }
  getById: RequestHandler<unknown, IAPIV1Response> = (req, res) => {
    res.json({
      locale: Locale.enIN,
      version: "v1",
      success: true,
      data: []
    })
  }
  update: RequestHandler<unknown, IAPIV1Response> = (req, res) => {
    res.json({
      locale: Locale.enIN,
      version: "v1",
      success: true,
      message: SuccessMessages.updated,
    })
  }
}

const userController = Object.freeze(new UserController());

export default userController;

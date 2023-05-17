import { RequestHandler } from "express";
import { IAPIV1Response } from "../../../types/IController";
import { Locale } from "../../../types/locale";
import axios from "axios";
import userRepository from "../../../repository/UserRepository";
import { NotAuthorizedError } from "../../../errors/NotAuthorizedError";
import { SuccessMessages } from "../../../errors/errorsMessages";

declare module "express-session" {
  interface SessionData {
    email: string;
  }
}

export const handshake: RequestHandler<unknown, IAPIV1Response> = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  try {
    const { data } = await axios.get(
      'https://pro-app.us.auth0.com/userinfo',
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        }
      }
    )

    const user = {
      ...data,
      locale: Locale.enIN,
    }

    await userRepository.createOrUpdate(user)

    req.session.email = user.email;
    req.session.save();
    res.json({
      success: true,
      version: "v1",
      locale: Locale.enIN,
      message: SuccessMessages.handshake,
    })

  } catch (e) {
    throw new NotAuthorizedError();
  }
}


export const logout: RequestHandler<unknown, IAPIV1Response> = async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  try {
    req.session.email = undefined;

    res.json({
      success: true,
      version: "v1",
      locale: Locale.enIN,
      message: SuccessMessages.logout
    })

  } catch (e) {
    throw new NotAuthorizedError();
  }
}

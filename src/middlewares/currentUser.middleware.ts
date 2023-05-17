import { RequestHandler } from "express"
import { IUser } from "../types/types";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import userRepository from "../repository/UserRepository";
import mongoose from "mongoose";

export const currentUserMiddleware: RequestHandler = async (req, res, next) => {
  const email = req.session.email
  if (!email) {
    throw new NotAuthorizedError();
  }
  try {
    const user = await userRepository.getByEmail(email)

    if (!user) {
      throw new NotAuthorizedError();
    }

    req.currentUser = user as IUser & { _id: mongoose.Types.ObjectId };

    next();
  } catch (e) {
    throw new NotAuthorizedError();
  }
}

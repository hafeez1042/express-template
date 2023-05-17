import { Repository } from "./Repository";
import { IUser } from "../types/types";
import { IUserDoc, UserModel } from "../models/userModel";

class UserRepository extends Repository<IUser, IUserDoc> {
  constructor() {
    super(UserModel);

  }

  public createOrUpdate = async (data: IUser) => {
    const user: unknown = await this.model.updateOne({ email: data.email }, { data }, { upsert: true, new: true })

    return this.accessor(user as IUserDoc)
  }

  public getByEmail = async (email: string) => {
    const user = await this.model.findOne({ email })

    return this.accessor(user as IUserDoc)
  }

  mutator(data: IUser): Omit<IUser, "_id"> {
    return {
      given_name: data.given_name,
      family_name: data.family_name,
      nickname: data.nickname,
      name: data.name,
      picture: data.picture,
      locale: data.locale,
      updated_at: data.updated_at,
      email: data.email,
      email_verified: data.email_verified,
      sub: data.sub,
      organization: data.organization,
    };
  }

  public accessor = (data: IUserDoc): IUser => {
    return {
      _id: data._id,
      given_name: data.given_name,
      family_name: data.family_name,
      nickname: data.nickname,
      name: data.name,
      picture: data.picture,
      locale: data.locale,
      updated_at: data.updated_at,
      email: data.email,
      email_verified: data.email_verified,
      sub: data.sub,
      organization: data.organization,
    };
  }
}

const userRepository = Object.freeze(new UserRepository());

export default userRepository;

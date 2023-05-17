import * as mongoose from "mongoose";
import { IUser } from "../types/types";

export interface IUserDoc extends IUser, mongoose.Document<mongoose.Types.ObjectId> {
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUser): IUserDoc;
}

const userSchema = new mongoose.Schema<IUserDoc>(
  {
    given_name: String,
    family_name: String,
    nickname: String,
    name: String,
    picture: String,
    locale: String,
    updated_at: String,
    email: String,
    email_verified: Boolean,
    sub: String,
    organization: [{
      organizationId: mongoose.Types.ObjectId,
      role: String,
    }],
  }, {
    timestamps: true,
  }
)


const UserModel = mongoose.model<IUserDoc, IUserModel>('users', userSchema);

userSchema.statics.build = (attrs: IUser) => {
  return new UserModel(attrs);
};

export { UserModel }

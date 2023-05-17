import { Model } from "mongoose";

export const seedDB = async (model: Model<any>, data: any[]) => {
  await model.deleteMany({});
  await model.insertMany(data);
}

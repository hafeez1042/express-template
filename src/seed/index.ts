#!/usr/bin/env -S ts-node --files

import mongoose from "mongoose";
import { seedDB } from "./helpers";
import { DayPlanModel } from "../models/dayPlanModel";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel";
import { users } from "./users";
import { dayPlans } from "./dayPlans";
import { OrganizationModel } from "../models/organizationModel";
import { organizations } from "./organizations";

dotenv.config();

console.log("MongoURL update123123", process.env.MONGO_URL)

if (!process.env.MONGO_URL) {
  throw new Error("Database not defined!...")
}
try {
  await mongoose.connect(process.env.MONGO_URL)
  console.log("Connected to MongoDB...")
} catch (e) {
  throw new Error("Failed connecting to MongoDB!")
}

await seedDB(OrganizationModel, organizations);
await seedDB(UserModel, users);
await seedDB(DayPlanModel, dayPlans);

await mongoose.disconnect()


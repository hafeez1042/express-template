import { IUser, OrganizationRole } from "../types/types";
import mongoose from "mongoose";
import { organizations } from "./organizations";
import { Locale } from "../types/locale";

export const users: (IUser & { _id: mongoose.Types.ObjectId })[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    given_name: "Hafeez",
    family_name: "Hamza",
    nickname: "Hafeez",
    name: "Hafeez Hamza",
    locale: Locale.enIN,
    updated_at: new Date().toISOString(),
    email: "hafeez1042@gmail.com",
    email_verified: true,
    organization: [{
      organizationId: organizations[0]._id,
      role: OrganizationRole.Member,
    }, {
      organizationId: organizations[1]._id,
      role: OrganizationRole.Admin,
    }],
  },
]

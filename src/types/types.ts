import { TimeZones } from "./timeZones";
import mongoose from "mongoose";
import { Locale } from "./locale";

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUser & { _id: mongoose.Types.ObjectId };
    }
  }
}

export interface IUser {
  _id?: mongoose.Types.ObjectId,
  given_name: string,
  family_name: string,
  nickname: string,
  name: string,
  picture?: string,
  locale: Locale,
  updated_at: string,
  email: string,
  email_verified: boolean,
  sub?: string
  organization: {
    organizationId: mongoose.Types.ObjectId,
    role: OrganizationRole
  }[],
}


export enum WorkTypes {
  Focus = "Focus",
  Break = "Break",
  Tea = "Tea",
  Lunch = "Lunch",
  Breakfast = "Breakfast",
  Meeting = "Meeting",
}

export enum Priority {
  high = 1,
  medium,
  low

}

export enum Statuses {
  NotStarted,
  Active,
  OnHold,
  Completed,
}

export interface Time {
  hour: number;
  minute: number;
  timeZone: TimeZones;
}

export enum Frequency {
  Once = "Once",
  EveryDay = "EveryDay",
  EveryWeek = "EveryWeek",
  EveryMonthDate = "EveryMonthDate",
  EveryMonthDay = "EveryMonthDay",
  SpecificDates = "SpecificDates",
}

export enum Days {
  sunday,
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
}

export interface IEveryMonthDay {
  weekNo: number,
  day: Days
}

interface IOnceFrequency {
  type: Frequency.Once,
  value: Date,
}

interface IEveryDayFrequency {
  type: Frequency.EveryDay,
  startDate: Date,
  endDate: Date,
}

interface IEveryWeekFrequency {
  type: Frequency.EveryWeek,
  value: Days[],
  startDate: Date,
  endDate: Date,
}

interface IEveryMonthDateFrequency {
  type: Frequency.EveryMonthDate,
  value: number[],
  startDate: Date,
  endDate: Date,
}

interface IEveryMonthDayFrequency {
  type: Frequency.EveryMonthDay,
  value: IEveryMonthDay[],
  startDate: Date,
  endDate: Date,
}

interface ISpecificDatesFrequency {
  type: Frequency.SpecificDates,
  value: Date[],
}

export type FrequencyType =
  IOnceFrequency
  | IEveryDayFrequency
  | IEveryWeekFrequency
  | IEveryMonthDateFrequency
  | ISpecificDatesFrequency
  | IEveryMonthDayFrequency;

export enum OrganizationRole {
  Member = "member",
  Admin = "Admin",
}

export enum DayPlanStatus {
  Inactive,
  Active,
  Draft,
}

export enum TimeLogStatus {
  InProgress = 1,
  Completed = 2,
  Cancelled = 3,
}

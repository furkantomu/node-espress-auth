import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export const createUser = async (
  input: DocumentDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<UserDocument>) =>{
  return UserModel.findOne(query).lean();
}

import { Request, Response } from "express";
import config from "config";

import { signJwt } from "../utils/jwt.utils";
import { validatePassword } from "../services/user.service";
import {
  createSession,
  findSessions,
  updateAllSessions,
  updateSession,
} from "../services/session.service";

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  // create a session
  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTtl") }
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    "refreshTokenPrivateKey",
    { expiresIn: config.get("refreshTokenTtl") }
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });



  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}



export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;


  await updateSession({ _id: sessionId }, { valid: false });

  res.clearCookie("accessToken", {
    httpOnly: true,
    domain: "localhost",
    path: "/",

  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    domain: "localhost",
    path: "/",
  });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export const deleteAllSessionsHandler = async (req: Request, res: Response) => {

  await updateAllSessions({ valid: false });

  res.clearCookie("accessToken", {
    httpOnly: true,
    domain: "localhost",
    path: "/",

  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    domain: "localhost",
    path: "/",
  });

  return res.send({
    messager:"all sessions are closed"
  });
}


import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import "dotenv/config";
import { userService } from "../services/user.services.js";

const verifyToken = async (jwt_payload, done) => {
  if (!jwt_payload)
    return done(null, false, { messages: "User doesn't exists" });
  return done(null, jwt_payload);
};

const verifyResetToken = async (jwt_payload, done) => {
  try {
    if (!jwt_payload)
      return done(null, false, { messages: "Invalid or expired token" });

    const user = await userService.getUserByEmail(jwt_payload.email);
    if (!user) return done(null, false, { messages: "User not found" });

    return done(null, jwt_payload);
  } catch (error) {
    return done(error);
  }
};

const cookieExtractor = (req) => {
  return req.cookies.token;
};

const resetTokenExtractor = (req) => {
  return req.cookies.resetToken;
};

const strategyCookiesConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.SECRET_KEY,
};

const resetTokenStrategyConfig = {
  jwtFromRequest: ExtractJwt.fromExtractors([resetTokenExtractor]),
  secretOrKey: process.env.SECRET_KEY,
};

passport.use("current", new JwtStrategy(strategyCookiesConfig, verifyToken));

passport.use(
  "reset",
  new JwtStrategy(resetTokenStrategyConfig, verifyResetToken)
);

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});

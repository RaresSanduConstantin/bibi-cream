import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserGoogle from "../models/googleUser.js";

const passportGoogle = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserGoogle.findById(id, (err, user) => done(err, user));
  });
};

export default passportGoogle;

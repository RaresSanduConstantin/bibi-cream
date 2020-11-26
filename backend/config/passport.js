import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserGoogle from "../models/googleUser.js";

const passportGoogle = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUserGoogle = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        console.log(profile);
        try {
          let userGoogle = await UserGoogle.findOne({ googleId: profile.id });

          if (userGoogle) {
            done(null, userGoogle);
          } else {
            userGoogle = await UserGoogle.create(newUserGoogle);
            done(null, userGoogle);
          }
        } catch (err) {
          console.error(err);
        }
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

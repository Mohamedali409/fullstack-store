import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../modules/users/user.model.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,

          password: profile.id + process.env.GOOGLE_CLIENT_SECRET,
          confirmPassword: profile.id + process.env.GOOGLE_CLIENT_SECRET,
        });

        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

// For session
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

export default passport;

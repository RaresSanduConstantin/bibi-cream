import express from "express";
import passport from "passport";
const router = express.Router();

//@desc Auth with Google
//@route Get/auth/google

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

//@desc Google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.DOMENIU}/login`,
  }),
  (req, res) => {
    res.redirect(`${process.env.DOMENIU}/`);
  }
);

// @desc Logout user
// @route /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(`${process.env.DOMENIU}/`);
});

export default router;

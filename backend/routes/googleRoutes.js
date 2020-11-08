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
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

// @desc Logout user
// @route /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000/");
});

export default router;

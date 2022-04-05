import { authenticate } from "../api/middleware/auth.middleware";
import User from "../api/model/user.model";
export const routesInit = (app, passport) => {
  // just as a parameter....after in app.js the arguments will be passed
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" , successRedirect: "/user"}),
    (req, res) => {
      console.log("user succceessfully authenticated 🛑🛑");
    }
  );


  app.get('/test', authenticate, (req,res) => {
      res.send("<h3>User is authenticated ✅✅✅</h3>")
  })
};

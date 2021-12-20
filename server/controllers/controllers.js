import User from "../models/user.js";
import passport from "passport";
import bcrypt from "bcrypt";

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("no user");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("success");
        console.log(user);
      });
    }
  })(req, res, next);
};

export const register = (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (doc) {
      res.status(409).json("User exists");
    }
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).send("boom");
    }
  });
};

export const getUser = async (req, res) => {
  res.json(req.user);
  console.log(req.user);
};

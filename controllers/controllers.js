import User from "../models/user.js";
import passport from "passport";
import bcrypt from "bcrypt";

export const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    res.status(200).json(user);
  } catch {}
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch {}
};

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(401).send("no user");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.send("success");
      });
    }
  })(req, res, next);
};

export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.send("Success");
  });
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
      res.status(201).send("Success");
    }
  });
};

export const getUser = async (req, res) => {
  res.json(req.user);
};

export const postFavorite = async (req, res) => {
  const newFavorite = {
    movie_id: req.params.movie_id,
    movie_title: req.params.movie_title,
    movie_poster: req.params.movie_poster,
  };
  User.findOneAndUpdate(
    {
      username: req.params.username,
      "favorites.movie_id": req.params.movie_id,
    },
    { $pull: { favorites: { movie_id: req.params.movie_id } } },
    { new: true },
    (err, doc) => {
      if (err) throw err;
      if (doc) {
        console.log(doc);
        res.status(200).send("Success remove");
      }
      if (!doc) {
        User.findOneAndUpdate(
          {
            username: req.params.username,
          },
          { $push: { favorites: newFavorite } },
          { new: true },
          (err, doc) => {
            if (err) throw err;
            if (doc) {
              console.log(doc);
              res.status(200).send("Success new");
            }
            if (!doc) {
              console.log("knas");
            }
          }
        );
      }
    }
  );
};

export const postFollowers = async () => {};

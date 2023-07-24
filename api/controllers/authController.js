// const Comment = require("../models/comment");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Admin = require("../models/admin");
const { issueJWT } = require("../utils/issueJWT");
const { validatePassword } = require("../utils/validatePassword");

// Handle register.
exports.register_post = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) return next(err);

    const admin = new Admin({
      name: req.body.name,
      password: hashedPassword,
    });

    const newAdmin = await admin.save();
    const jwt = issueJWT(newAdmin);
    res.json({
      success: true,
      admin: newAdmin,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  });
});

// Handle login.
exports.login_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("name must be specified."),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("password must be longer than 4 characters."),

  asyncHandler(async (req, res, next) => {
    // Extract errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Rerender with value and errors
      res.json({
        name: req.body.name,
        errors: errors.array(),
      });
      return;
    } else {
      // Validate user
      const admin = await Admin.findOne({ name: req.body.name });
      if (!admin) {
        res.status(401).json({ success: false, msg: "could not find admin" });
      }
      // Validate password
      const isValid = await validatePassword(req.body.password, admin.password);
      console.log(isValid);
      if (isValid === true) {
        const jwt = issueJWT(admin);
        res.status(200).json({
          success: true,
          admin: admin,
          token: jwt.token,
          expiresIn: jwt.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" });
      }
    }
  }),
];

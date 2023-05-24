const loginDb = require("../models/LoginModel");

exports.getLoginInfo = (req, res, next) => {
  loginDb
    .find()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(400).json({ error: `${err}` });
    });
};

exports.createLoginInfo = async (req, res, next) => {
  const { mail, password } = req.body;
  if (!mail || !password)
    res.status(400).json({ error: "Provide the needed fields" });
  else {
    const newLoginInfo = await new loginDb({ mail, password });
    newLoginInfo
      .save()
      .then((item) => {
        res.status(200).json({
          message: "sucesfully created",
          mail: item.mail,
          password: item.password,
        });
      })
      .catch((err) => {
        res.status(400).json({ error: `${err}` });
      });
  }
};

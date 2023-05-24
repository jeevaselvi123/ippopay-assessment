const mongoose = require("mongoose");

const schema = mongoose.Schema;

const loginModel = new schema(
  {
    mail: { type: String, required: true },
    password: { type: String, required: true },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("login", loginModel);

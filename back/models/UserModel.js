import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    lastName: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        number: String,
        street: String,
        city: String,
        zipcode: String,
        location: String,
      }
    ],
    photo: String,
    phone: String,
    role: String,
    sitter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sitter",
      required: false,
    },
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// HACHAGE DU MOT DE PASSE
// Ce hook va se déclencher avant que la fonction save (User.save()) soit déclenché
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

//faire un index basé sur l'email des users pour faciliter les recherches
userSchema.index({ email: 1 }, { unique: true });

let User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";

let bookingSchema = mongoose.Schema(
  {
    address: [
      {
        number: Number,
        street: String,
        complement: String,
        zipcode: String,
      },
    ],
    start_date: [
      {
        type: DateTime,
        required: true,
      }
      ],
    end_date: [
      {
        type: DateTime,
        required: true,
      }
      ],
    pet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      }
    ],
    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    conversation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: false },
 
  addresses: [
    {
      name: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: "India" }
    }
 
  ],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Saree" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  role: { type: String, enum: ["customer", "admin"], default: "customer" }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);

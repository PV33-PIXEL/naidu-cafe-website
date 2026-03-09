import mongoose from 'mongoose';

// ─── Menu ───
const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Milkshakes', 'Thickshakes', 'Mocktails', 'Fresh Juices'], required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  popular: { type: Boolean, default: false },
}, { timestamps: true });

// ─── Specials ───
const SpecialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number },
  image: { type: String },
  badge: { type: String, default: "Today's Special" },
}, { timestamps: true });

// ─── Offers ───
const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true },
  drinks: [{ type: String }],
  discount: { type: Number },
  originalPrice: { type: Number },
  offerPrice: { type: Number },
  image: { type: String },
  badge: { type: String },
}, { timestamps: true });

// ─── Messages ───
const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// ─── Admin ───
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Menu = mongoose.models.Menu || mongoose.model('Menu', MenuSchema);
export const Special = mongoose.models.Special || mongoose.model('Special', SpecialSchema);
export const Offer = mongoose.models.Offer || mongoose.model('Offer', OfferSchema);
export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue' },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  guestCount: { type: Number, required: true },
  budget: { type: Number },
  status: { type: String, enum: ['New', 'Contacted', 'Booked', 'Cancelled'], default: 'New' },
  message: { type: String },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', LeadSchema);

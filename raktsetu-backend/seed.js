import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import BloodRequest from './src/models/BloodRequest.js';
import BloodBank from './src/models/BloodBank.js';

dotenv.config({ path: './.env' });

const DB = process.env.MONGO_URI;

const banks = [
  { name: 'City Central Blood Bank', state: 'Maharashtra', district: 'Mumbai', phone: '022-12345678', bloodGroups: { 'A+': 20, 'B+': 15, 'O+': 10 } },
  { name: 'Apollo Blood Centre', state: 'Maharashtra', district: 'Pune', phone: '020-87654321', bloodGroups: { 'AB+': 5, 'O-': 8 } },
  { name: 'Govt Blood Bank', state: 'Karnataka', district: 'Bangalore Urban', phone: '080-12345678', bloodGroups: { 'A-': 4, 'B-': 2 } },
  { name: 'Red Cross Society', state: 'Delhi', district: 'Central Delhi', phone: '011-23456789', bloodGroups: { 'O+': 30, 'AB-': 6 } },
  { name: 'Lifeline Blood Bank', state: 'Tamil Nadu', district: 'Chennai', phone: '044-11223344', bloodGroups: { 'A+': 12, 'B+': 18 } },
  { name: 'Jeevan Rakta Kendra', state: 'Rajasthan', district: 'Jaipur', phone: '0141-55556666', bloodGroups: { 'O+': 22, 'O-': 9 } },
  { name: 'Swasthya Blood Bank', state: 'West Bengal', district: 'Kolkata', phone: '033-66778899', bloodGroups: { 'AB+': 7, 'A+': 15 } },
];

const donors = [
  { fullName: 'Priya Sharma', email: 'priya@test.com', password: 'password123', phone: '9876543210', bloodGroup: 'O+', state: 'Maharashtra', district: 'Mumbai', availabilityStatus: true, gender: 'female', weight: 55, dob: new Date('1998-05-12') },
  { fullName: 'Rahul Verma', email: 'rahul@test.com', password: 'password123', phone: '8765432109', bloodGroup: 'A+', state: 'Karnataka', district: 'Bangalore Urban', availabilityStatus: true, gender: 'male', weight: 65, dob: new Date('1995-08-22') },
  { fullName: 'Anjali Patil', email: 'anjali@test.com', password: 'password123', phone: '7654321098', bloodGroup: 'B+', state: 'Delhi', district: 'Central Delhi', availabilityStatus: true, gender: 'female', weight: 60, dob: new Date('2000-11-30') },
  { fullName: 'Vikram Singh', email: 'vikram@test.com', password: 'password123', phone: '6543210987', bloodGroup: 'AB-', state: 'Rajasthan', district: 'Jaipur', availabilityStatus: true, gender: 'male', weight: 70, dob: new Date('1992-02-14') },
];

const seed = async () => {
  await mongoose.connect(DB);
  console.log('Connected to MongoDB...');

  // Clear existing data
  await BloodBank.deleteMany({});
  await User.deleteMany({});
  await BloodRequest.deleteMany({});

  // Insert banks
  await BloodBank.insertMany(banks);
  console.log(`${banks.length} blood banks inserted.`);

  // Insert donors (User model has pre-save hook for password hashing)
  // We need to use a create method that triggers hooks, so use User.create()
  for (const donor of donors) {
    await User.create({
      ...donor,
      role: 'donor',
      isVerified: true,
    });
  }
  console.log(`${donors.length} donors inserted.`);

  // Create an admin if not exists
  const adminExists = await User.findOne({ email: 'admin@raktasetu.com' });
  if (!adminExists) {
    await User.create({
      fullName: 'Admin',
      email: 'admin@raktasetu.com',
      password: 'admin123',
      phone: '9999999999',
      bloodGroup: 'A+',
      state: 'Maharashtra',
      district: 'Mumbai',
      role: 'admin',
      isVerified: true,
    });
    console.log('Admin user created (admin@raktasetu.com / admin123).');
  }

  console.log('Seed complete!');
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

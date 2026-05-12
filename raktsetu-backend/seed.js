import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import BloodRequest from './src/models/BloodRequest.js';
import BloodBank from './src/models/BloodBank.js';

dotenv.config({ path: './.env' });

const DB = process.env.MONGO_URI;

const banks = [
  // Previous Pan-India Data
  { name: 'King George Hospital', state: 'Andhra Pradesh', district: 'Visakhapatnam', phone: '0891-2564891', bloodGroups: { 'A+': 45, 'B+': 32, 'O+': 55, 'AB+': 12, 'O-': 5 } },
  { name: 'State Hospital Blood Bank', state: 'Arunachal Pradesh', district: 'Itanagar', phone: '0360-2244248', bloodGroups: { 'A+': 15, 'B+': 10, 'O+': 20, 'O-': 2 } },
  { name: 'Gauhati Medical College', state: 'Assam', district: 'Guwahati', phone: '0361-2326051', bloodGroups: { 'A+': 30, 'B+': 25, 'O+': 40, 'AB+': 10, 'O-': 4 } },
  { name: 'AIIMS Raipur Blood Bank', state: 'Chhattisgarh', district: 'Raipur', phone: '0771-2970630', bloodGroups: { 'A+': 50, 'B+': 45, 'O+': 60, 'AB+': 20, 'O-': 8 } },
  { name: 'Goa Medical College', state: 'Goa', district: 'North Goa', phone: '0832-2495000', bloodGroups: { 'A+': 18, 'B+': 15, 'O+': 25, 'AB+': 5, 'O-': 2 } },
  { name: 'Civil Hospital Blood Centre', state: 'Gujarat', district: 'Ahmedabad', phone: '079-22683721', bloodGroups: { 'A+': 65, 'B+': 55, 'O+': 80, 'AB+': 25, 'O-': 12 } },
  { name: 'PGIMS Blood Bank', state: 'Haryana', district: 'Rohtak', phone: '01262-281307', bloodGroups: { 'A+': 40, 'B+': 35, 'O+': 50, 'AB+': 15, 'O-': 6 } },
  { name: 'IGMC Shimla', state: 'Himachal Pradesh', district: 'Shimla', phone: '0177-2804251', bloodGroups: { 'A+': 22, 'B+': 18, 'O+': 30, 'AB+': 8, 'O-': 3 } },
  { name: 'RIMS Blood Bank', state: 'Jharkhand', district: 'Ranchi', phone: '0651-2541533', bloodGroups: { 'A+': 35, 'B+': 28, 'O+': 45, 'AB+': 12, 'O-': 5 } },
  { name: 'NIMHANS Blood Centre', state: 'Karnataka', district: 'Bangalore Urban', phone: '080-26995000', bloodGroups: { 'A+': 85, 'B+': 70, 'O+': 95, 'AB+': 30, 'O-': 15 } },
  { name: 'KR Hospital', state: 'Karnataka', district: 'Mysore', phone: '0821-2420151', bloodGroups: { 'A+': 25, 'B+': 20, 'O+': 35, 'AB+': 10, 'O-': 4 } },
  { name: 'RCC Blood Bank', state: 'Kerala', district: 'Thiruvananthapuram', phone: '0471-2442541', bloodGroups: { 'A+': 45, 'B+': 40, 'O+': 55, 'AB+': 18, 'O-': 7 } },
  { name: 'AIIMS Bhopal', state: 'Madhya Pradesh', district: 'Bhopal', phone: '0755-2672322', bloodGroups: { 'A+': 60, 'B+': 50, 'O+': 75, 'AB+': 22, 'O-': 10 } },
  { name: 'KEM Hospital Blood Bank', state: 'Maharashtra', district: 'Mumbai', phone: '022-24107000', bloodGroups: { 'A+': 120, 'B+': 95, 'O+': 150, 'AB+': 40, 'O-': 25 } },
  { name: 'Sassoon Hospital', state: 'Maharashtra', district: 'Pune', phone: '020-26128000', bloodGroups: { 'A+': 75, 'B+': 65, 'O+': 90, 'AB+': 25, 'O-': 12 } },
  { name: 'RIMS Imphal', state: 'Manipur', district: 'Imphal West', phone: '0385-2414629', bloodGroups: { 'A+': 20, 'B+': 15, 'O+': 25, 'AB+': 6, 'O-': 2 } },
  { name: 'Civil Hospital Shillong', state: 'Meghalaya', district: 'East Khasi Hills', phone: '0364-2224100', bloodGroups: { 'A+': 18, 'B+': 12, 'O+': 22, 'AB+': 5, 'O-': 2 } },
  { name: 'Civil Hospital Aizawl', state: 'Mizoram', district: 'Aizawl', phone: '0389-2322318', bloodGroups: { 'A+': 15, 'B+': 10, 'O+': 20, 'AB+': 4, 'O-': 1 } },
  { name: 'Naga Hospital', state: 'Nagaland', district: 'Kohima', phone: '0370-2222916', bloodGroups: { 'A+': 12, 'B+': 8, 'O+': 18, 'AB+': 3, 'O-': 1 } },
  { name: 'SCB Medical College', state: 'Odisha', district: 'Cuttack', phone: '0671-2414355', bloodGroups: { 'A+': 45, 'B+': 38, 'O+': 55, 'AB+': 15, 'O-': 6 } },
  { name: 'Government Medical College', state: 'Punjab', district: 'Amritsar', phone: '0183-2225243', bloodGroups: { 'A+': 50, 'B+': 45, 'O+': 60, 'AB+': 18, 'O-': 8 } },
  { name: 'SMS Hospital', state: 'Rajasthan', district: 'Jaipur', phone: '0141-2560291', bloodGroups: { 'A+': 70, 'B+': 60, 'O+': 85, 'AB+': 25, 'O-': 10 } },
  { name: 'STNM Hospital', state: 'Sikkim', district: 'Gangtok', phone: '03592-202944', bloodGroups: { 'A+': 10, 'B+': 8, 'O+': 15, 'AB+': 3, 'O-': 1 } },
  { name: 'Rajiv Gandhi General Hospital', state: 'Tamil Nadu', district: 'Chennai', phone: '044-25305000', bloodGroups: { 'A+': 90, 'B+': 80, 'O+': 110, 'AB+': 35, 'O-': 18 } },
  { name: 'Osmania General Hospital', state: 'Telangana', district: 'Hyderabad', phone: '040-24600146', bloodGroups: { 'A+': 85, 'B+': 75, 'O+': 100, 'AB+': 30, 'O-': 15 } },
  { name: 'AGMC Blood Bank', state: 'Tripura', district: 'West Tripura', phone: '0381-2325001', bloodGroups: { 'A+': 20, 'B+': 15, 'O+': 25, 'AB+': 8, 'O-': 3 } },
  { name: 'KGMU Blood Bank', state: 'Uttar Pradesh', district: 'Lucknow', phone: '0522-2257540', bloodGroups: { 'A+': 110, 'B+': 95, 'O+': 130, 'AB+': 40, 'O-': 20 } },
  { name: 'Doon Hospital', state: 'Uttarakhand', district: 'Dehradun', phone: '0135-2652544', bloodGroups: { 'A+': 35, 'B+': 28, 'O+': 45, 'AB+': 12, 'O-': 5 } },
  { name: 'SSKM Hospital', state: 'West Bengal', district: 'Kolkata', phone: '033-22041100', bloodGroups: { 'A+': 95, 'B+': 85, 'O+': 120, 'AB+': 35, 'O-': 18 } },
  { name: 'AIIMS New Delhi', state: 'Delhi', district: 'New Delhi', phone: '011-26588500', bloodGroups: { 'A+': 150, 'B+': 130, 'O+': 180, 'AB+': 50, 'O-': 30 } },
  { name: 'PGIMER Blood Bank', state: 'Chandigarh', district: 'Chandigarh', phone: '0172-2747585', bloodGroups: { 'A+': 65, 'B+': 55, 'O+': 75, 'AB+': 25, 'O-': 12 } },
  { name: 'SMHS Hospital', state: 'Jammu and Kashmir', district: 'Srinagar', phone: '0194-2504812', bloodGroups: { 'A+': 40, 'B+': 35, 'O+': 50, 'AB+': 15, 'O-': 6 } },

  // ALL 38 DISTRICTS OF BIHAR
  { name: 'PMCH Blood Bank', state: 'Bihar', district: 'Patna', phone: '0612-2300080', bloodGroups: { 'A+': 45, 'B+': 52, 'O+': 85, 'AB+': 18, 'O-': 5 } },
  { name: 'Maa Blood Centre', state: 'Bihar', district: 'Gaya', phone: '0631-2222222', bloodGroups: { 'B+': 20, 'O+': 25, 'A+': 15, 'A-': 3 } },
  { name: 'JLNMC Hospital', state: 'Bihar', district: 'Bhagalpur', phone: '0641-2401078', bloodGroups: { 'A+': 30, 'B+': 25, 'O+': 40, 'AB+': 8, 'O-': 2 } },
  { name: 'SKMCH Blood Bank', state: 'Bihar', district: 'Muzaffarpur', phone: '0621-2265001', bloodGroups: { 'A+': 28, 'B+': 35, 'O+': 42, 'AB+': 10, 'A-': 1 } },
  { name: 'Sadar Hospital Blood Centre', state: 'Bihar', district: 'Purnia', phone: '06454-242220', bloodGroups: { 'A+': 15, 'B+': 18, 'O+': 22, 'AB+': 5 } },
  { name: 'DMCH Blood Bank', state: 'Bihar', district: 'Darbhanga', phone: '06272-233333', bloodGroups: { 'A+': 35, 'B+': 40, 'O+': 50, 'AB+': 12, 'O-': 4 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Araria', phone: '06453-222221', bloodGroups: { 'A+': 10, 'B+': 12, 'O+': 15 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Arwal', phone: '06337-222221', bloodGroups: { 'A+': 8, 'B+': 5, 'O+': 10 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Aurangabad', phone: '06186-222221', bloodGroups: { 'A+': 12, 'B+': 15, 'O+': 18, 'AB+': 2 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Banka', phone: '06424-222221', bloodGroups: { 'A+': 5, 'B+': 8, 'O+': 12 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Begusarai', phone: '06243-222221', bloodGroups: { 'A+': 22, 'B+': 25, 'O+': 30, 'AB+': 5 } },
  { name: 'Sadar Hospital Ara', state: 'Bihar', district: 'Bhojpur', phone: '06182-222221', bloodGroups: { 'A+': 18, 'B+': 20, 'O+': 25, 'O-': 2 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Buxar', phone: '06183-222221', bloodGroups: { 'A+': 10, 'B+': 12, 'O+': 15 } },
  { name: 'Sadar Hospital Motihari', state: 'Bihar', district: 'East Champaran', phone: '06252-222221', bloodGroups: { 'A+': 20, 'B+': 22, 'O+': 28, 'AB+': 4 } },
  { name: 'GMCH Bettiah', state: 'Bihar', district: 'West Champaran', phone: '06254-222221', bloodGroups: { 'A+': 25, 'B+': 20, 'O+': 32, 'O-': 3 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Gopalganj', phone: '06156-222221', bloodGroups: { 'A+': 15, 'B+': 18, 'O+': 20 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Jamui', phone: '06451-222221', bloodGroups: { 'A+': 8, 'B+': 10, 'O+': 12 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Jehanabad', phone: '06114-222221', bloodGroups: { 'A+': 12, 'B+': 14, 'O+': 18 } },
  { name: 'Sadar Hospital Bhabua', state: 'Bihar', district: 'Kaimur', phone: '06189-222221', bloodGroups: { 'A+': 10, 'B+': 12, 'O+': 15 } },
  { name: 'Katihar Medical College', state: 'Bihar', district: 'Katihar', phone: '06452-239202', bloodGroups: { 'A+': 30, 'B+': 25, 'O+': 40, 'AB+': 8 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Khagaria', phone: '06244-222221', bloodGroups: { 'A+': 10, 'B+': 12, 'O+': 15 } },
  { name: 'MGM Medical College', state: 'Bihar', district: 'Kishanganj', phone: '06456-222824', bloodGroups: { 'A+': 22, 'B+': 20, 'O+': 28, 'AB+': 5 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Lakhisarai', phone: '06111-222221', bloodGroups: { 'A+': 8, 'B+': 10, 'O+': 12 } },
  { name: 'JNKTMCH Blood Bank', state: 'Bihar', district: 'Madhepura', phone: '06476-222221', bloodGroups: { 'A+': 18, 'B+': 15, 'O+': 20 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Madhubani', phone: '06276-222221', bloodGroups: { 'A+': 20, 'B+': 22, 'O+': 25, 'AB+': 3 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Munger', phone: '06344-222221', bloodGroups: { 'A+': 15, 'B+': 18, 'O+': 20 } },
  { name: 'VIMS Pawapuri', state: 'Bihar', district: 'Nalanda', phone: '06112-231102', bloodGroups: { 'A+': 25, 'B+': 22, 'O+': 30, 'O-': 2 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Nawada', phone: '06324-222221', bloodGroups: { 'A+': 12, 'B+': 15, 'O+': 18 } },
  { name: 'Sadar Hospital Sasaram', state: 'Bihar', district: 'Rohtas', phone: '06184-222221', bloodGroups: { 'A+': 18, 'B+': 20, 'O+': 25 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Saharsa', phone: '06478-222221', bloodGroups: { 'A+': 15, 'B+': 12, 'O+': 18 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Samastipur', phone: '06274-222221', bloodGroups: { 'A+': 22, 'B+': 25, 'O+': 30, 'AB+': 4 } },
  { name: 'Sadar Hospital Chapra', state: 'Bihar', district: 'Saran', phone: '06152-222221', bloodGroups: { 'A+': 20, 'B+': 18, 'O+': 25 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Sheikhpura', phone: '06341-222221', bloodGroups: { 'A+': 8, 'B+': 5, 'O+': 10 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Sheohar', phone: '06222-222221', bloodGroups: { 'A+': 5, 'B+': 6, 'O+': 8 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Sitamarhi', phone: '06226-222221', bloodGroups: { 'A+': 15, 'B+': 18, 'O+': 20 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Siwan', phone: '06154-222221', bloodGroups: { 'A+': 18, 'B+': 20, 'O+': 25, 'AB+': 3 } },
  { name: 'Sadar Hospital', state: 'Bihar', district: 'Supaul', phone: '06473-222221', bloodGroups: { 'A+': 12, 'B+': 15, 'O+': 18 } },
  { name: 'Sadar Hospital Hajipur', state: 'Bihar', district: 'Vaishali', phone: '06224-222221', bloodGroups: { 'A+': 20, 'B+': 25, 'O+': 30, 'AB+': 5 } },
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

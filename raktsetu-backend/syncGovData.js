import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import BloodBank from './src/models/BloodBank.js';

// Load environment variables for MongoDB URI
dotenv.config({ path: './.env' });

// ==========================================
// CONFIGURATION
// ==========================================
// The API key provided by the user
const API_KEY = '579b464db66ec23bdd0000014cf24708bc5f4dc85fc12b24c1207bf5';

// NOTE: data.gov.in requires a specific "Resource ID" for the blood bank dataset.
const RESOURCE_ID = 'fced6df9-a360-4e08-8ca0-f283fc74ce15';

const DB = process.env.MONGO_URI;

// Helper to generate random blood stock since the directory only provides locations
const generateRandomStock = () => {
    return {
        'A+': Math.floor(Math.random() * 50) + 10,
        'A-': Math.floor(Math.random() * 10),
        'B+': Math.floor(Math.random() * 40) + 10,
        'B-': Math.floor(Math.random() * 8),
        'O+': Math.floor(Math.random() * 60) + 15,
        'O-': Math.floor(Math.random() * 5),
        'AB+': Math.floor(Math.random() * 20) + 5,
        'AB-': Math.floor(Math.random() * 5)
    };
};

const syncGovData = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(DB);
        console.log('Connected to MongoDB successfully.');

        console.log('Fetching data from data.gov.in API...');
        const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=1000`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'error' || data.message === 'Meta not found') {
            console.error('API Error:', data.message || 'Invalid Resource ID or API Key');
            process.exit(1);
        }

        if (!data.records || data.records.length === 0) {
            console.log('No records found in the API response.');
            process.exit(0);
        }

        console.log(`Successfully fetched ${data.records.length} blood banks from API.`);

        // Transform the government data to match our MongoDB Schema
        const banksToInsert = data.records.map(record => {
            // The API field names usually have underscores based on the response
            const name = record._blood_bank_name || record.blood_bank_name || record.h_name || 'Government Blood Bank';
            const state = record._state || record.state || 'Unknown';
            const district = record._district || record.district || 'Unknown';
            const phone = record._contact_no || record._mobile || record.contact_no || 'N/A';

            return {
                name,
                state,
                district,
                phone,
                bloodGroups: generateRandomStock()
            };
        });

        // Uncomment to clear old data
        // await BloodBank.deleteMany({});
        
        await BloodBank.insertMany(banksToInsert);
        console.log(`Successfully inserted ${banksToInsert.length} blood banks into the database!`);
        
    } catch (error) {
        console.error('Error during sync:', error.message);
    } finally {
        process.exit(0);
    }
};

syncGovData();

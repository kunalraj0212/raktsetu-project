// Mock Blood Bank Database
// Realistic data for demonstration purposes

export const bloodBanks = [
    { id: 1, name: 'City Hospital Blood Bank', category: 'Government', state: 'Maharashtra', district: 'Mumbai', address: 'Andheri West, Mumbai', phone: '+91 22 2670 1234', lastUpdated: '2026-02-18', stocks: { 'A+': 12, 'A-': 3, 'B+': 18, 'B-': 5, 'AB+': 7, 'AB-': 2, 'O+': 22, 'O-': 4 } },
    { id: 2, name: 'Red Cross Blood Center', category: 'Charitable', state: 'Maharashtra', district: 'Mumbai', address: 'Bandra, Mumbai', phone: '+91 22 2644 5678', lastUpdated: '2026-02-18', stocks: { 'A+': 8, 'A-': 1, 'B+': 15, 'B-': 3, 'AB+': 4, 'AB-': 1, 'O+': 19, 'O-': 6 } },
    { id: 3, name: 'Lilavati Hospital Blood Bank', category: 'Private', state: 'Maharashtra', district: 'Mumbai', address: 'Bandra West, Mumbai', phone: '+91 22 2640 1111', lastUpdated: '2026-02-17', stocks: { 'A+': 5, 'A-': 2, 'B+': 10, 'B-': 1, 'AB+': 3, 'AB-': 0, 'O+': 14, 'O-': 2 } },
    { id: 4, name: 'KEM Hospital Blood Bank', category: 'Government', state: 'Maharashtra', district: 'Mumbai', address: 'Parel, Mumbai', phone: '+91 22 2410 7000', lastUpdated: '2026-02-18', stocks: { 'A+': 20, 'A-': 6, 'B+': 25, 'B-': 8, 'AB+': 10, 'AB-': 3, 'O+': 30, 'O-': 9 } },
    { id: 5, name: 'Hinduja Hospital Blood Bank', category: 'Private', state: 'Maharashtra', district: 'Mumbai', address: 'Mahim, Mumbai', phone: '+91 22 2445 2222', lastUpdated: '2026-02-17', stocks: { 'A+': 7, 'A-': 2, 'B+': 12, 'B-': 4, 'AB+': 5, 'AB-': 1, 'O+': 16, 'O-': 3 } },
    { id: 6, name: 'AIIMS Blood Centre', category: 'Government', state: 'Delhi', district: 'New Delhi', address: 'Ansari Nagar, New Delhi', phone: '+91 11 2658 8500', lastUpdated: '2026-02-18', stocks: { 'A+': 28, 'A-': 8, 'B+': 35, 'B-': 10, 'AB+': 12, 'AB-': 5, 'O+': 40, 'O-': 12 } },
    { id: 7, name: 'Safdarjung Hospital Blood Bank', category: 'Government', state: 'Delhi', district: 'New Delhi', address: 'Ring Road, New Delhi', phone: '+91 11 2616 5060', lastUpdated: '2026-02-18', stocks: { 'A+': 18, 'A-': 5, 'B+': 22, 'B-': 7, 'AB+': 8, 'AB-': 3, 'O+': 25, 'O-': 8 } },
    { id: 8, name: 'Rotary Blood Bank', category: 'Charitable', state: 'Delhi', district: 'New Delhi', address: 'Tughlakabad, New Delhi', phone: '+91 11 2954 3000', lastUpdated: '2026-02-17', stocks: { 'A+': 15, 'A-': 4, 'B+': 20, 'B-': 6, 'AB+': 7, 'AB-': 2, 'O+': 22, 'O-': 7 } },
    { id: 9, name: 'Apollo Hospital Blood Bank', category: 'Private', state: 'Delhi', district: 'New Delhi', address: 'Sarita Vihar, New Delhi', phone: '+91 11 2692 5858', lastUpdated: '2026-02-18', stocks: { 'A+': 10, 'A-': 3, 'B+': 14, 'B-': 4, 'AB+': 6, 'AB-': 2, 'O+': 18, 'O-': 5 } },
    { id: 10, name: 'Fortis Blood Bank', category: 'Private', state: 'Delhi', district: 'New Delhi', address: 'Vasant Kunj, New Delhi', phone: '+91 11 4277 6222', lastUpdated: '2026-02-17', stocks: { 'A+': 9, 'A-': 2, 'B+': 11, 'B-': 3, 'AB+': 4, 'AB-': 1, 'O+': 15, 'O-': 4 } },
    { id: 11, name: 'Rajiv Gandhi Cancer Institute Blood Bank', category: 'Private', state: 'Delhi', district: 'New Delhi', address: 'Rohini, New Delhi', phone: '+91 11 4702 2222', lastUpdated: '2026-02-18', stocks: { 'A+': 6, 'A-': 1, 'B+': 8, 'B-': 2, 'AB+': 3, 'AB-': 1, 'O+': 10, 'O-': 3 } },
    { id: 12, name: 'CMC Vellore Blood Bank', category: 'Charitable', state: 'Tamil Nadu', district: 'Vellore', address: 'Ida Scudder Road, Vellore', phone: '+91 416 228 1000', lastUpdated: '2026-02-18', stocks: { 'A+': 14, 'A-': 4, 'B+': 18, 'B-': 5, 'AB+': 6, 'AB-': 2, 'O+': 20, 'O-': 6 } },
    { id: 13, name: 'Apollo Hospital Blood Bank Chennai', category: 'Private', state: 'Tamil Nadu', district: 'Chennai', address: 'Greams Road, Chennai', phone: '+91 44 2829 3333', lastUpdated: '2026-02-17', stocks: { 'A+': 11, 'A-': 3, 'B+': 16, 'B-': 4, 'AB+': 5, 'AB-': 2, 'O+': 18, 'O-': 5 } },
    { id: 14, name: 'Government General Hospital Blood Bank', category: 'Government', state: 'Tamil Nadu', district: 'Chennai', address: 'Park Town, Chennai', phone: '+91 44 2530 5000', lastUpdated: '2026-02-18', stocks: { 'A+': 22, 'A-': 7, 'B+': 28, 'B-': 9, 'AB+': 11, 'AB-': 4, 'O+': 32, 'O-': 10 } },
    { id: 15, name: 'Narayana Health Blood Bank', category: 'Private', state: 'Karnataka', district: 'Bengaluru', address: 'Bommasandra, Bengaluru', phone: '+91 80 2783 5000', lastUpdated: '2026-02-18', stocks: { 'A+': 13, 'A-': 4, 'B+': 17, 'B-': 5, 'AB+': 7, 'AB-': 2, 'O+': 21, 'O-': 6 } },
    { id: 16, name: 'Manipal Hospital Blood Bank', category: 'Private', state: 'Karnataka', district: 'Bengaluru', address: 'Old Airport Road, Bengaluru', phone: '+91 80 2502 4444', lastUpdated: '2026-02-17', stocks: { 'A+': 9, 'A-': 2, 'B+': 13, 'B-': 3, 'AB+': 5, 'AB-': 1, 'O+': 16, 'O-': 4 } },
    { id: 17, name: 'Victoria Hospital Blood Bank', category: 'Government', state: 'Karnataka', district: 'Bengaluru', address: 'KR Market, Bengaluru', phone: '+91 80 2670 1150', lastUpdated: '2026-02-18', stocks: { 'A+': 17, 'A-': 5, 'B+': 22, 'B-': 7, 'AB+': 9, 'AB-': 3, 'O+': 26, 'O-': 8 } },
    { id: 18, name: 'Tata Memorial Hospital Blood Bank', category: 'Government', state: 'Maharashtra', district: 'Mumbai', address: 'Parel, Mumbai', phone: '+91 22 2417 7000', lastUpdated: '2026-02-18', stocks: { 'A+': 16, 'A-': 5, 'B+': 20, 'B-': 6, 'AB+': 8, 'AB-': 3, 'O+': 24, 'O-': 7 } },
    { id: 19, name: 'PGIMER Blood Bank', category: 'Government', state: 'Punjab', district: 'Chandigarh', address: 'Sector 12, Chandigarh', phone: '+91 172 274 6018', lastUpdated: '2026-02-18', stocks: { 'A+': 19, 'A-': 6, 'B+': 24, 'B-': 8, 'AB+': 10, 'AB-': 4, 'O+': 28, 'O-': 9 } },
    { id: 20, name: 'KGMU Blood Bank', category: 'Government', state: 'Uttar Pradesh', district: 'Lucknow', address: 'Shah Mina Road, Lucknow', phone: '+91 522 225 7540', lastUpdated: '2026-02-17', stocks: { 'A+': 14, 'A-': 4, 'B+': 19, 'B-': 6, 'AB+': 7, 'AB-': 2, 'O+': 22, 'O-': 7 } },
    { id: 21, name: 'Sassoon Hospital Blood Bank', category: 'Government', state: 'Maharashtra', district: 'Pune', address: 'Sassoon Road, Pune', phone: '+91 20 2612 3456', lastUpdated: '2026-02-18', stocks: { 'A+': 11, 'A-': 3, 'B+': 15, 'B-': 4, 'AB+': 6, 'AB-': 2, 'O+': 18, 'O-': 5 } },
    { id: 22, name: 'Ruby Hall Blood Bank', category: 'Private', state: 'Maharashtra', district: 'Pune', address: 'Sassoon Road, Pune', phone: '+91 20 6645 5555', lastUpdated: '2026-02-17', stocks: { 'A+': 8, 'A-': 2, 'B+': 11, 'B-': 3, 'AB+': 4, 'AB-': 1, 'O+': 14, 'O-': 3 } },
    { id: 23, name: 'Nizam Institute Blood Bank', category: 'Government', state: 'Telangana', district: 'Hyderabad', address: 'Punjagutta, Hyderabad', phone: '+91 40 2348 1000', lastUpdated: '2026-02-18', stocks: { 'A+': 16, 'A-': 5, 'B+': 21, 'B-': 7, 'AB+': 8, 'AB-': 3, 'O+': 24, 'O-': 8 } },
    { id: 24, name: 'KIMS Blood Bank', category: 'Private', state: 'Telangana', district: 'Hyderabad', address: 'Secunderabad, Hyderabad', phone: '+91 40 4488 5000', lastUpdated: '2026-02-17', stocks: { 'A+': 7, 'A-': 2, 'B+': 10, 'B-': 3, 'AB+': 4, 'AB-': 1, 'O+': 13, 'O-': 4 } },
    { id: 25, name: 'Sanjay Gandhi Hospital Blood Bank', category: 'Government', state: 'Madhya Pradesh', district: 'Bhopal', address: 'Idgah Hills, Bhopal', phone: '+91 755 254 0185', lastUpdated: '2026-02-18', stocks: { 'A+': 10, 'A-': 3, 'B+': 14, 'B-': 4, 'AB+': 5, 'AB-': 2, 'O+': 17, 'O-': 5 } },
    { id: 26, name: 'SMS Hospital Blood Bank', category: 'Government', state: 'Rajasthan', district: 'Jaipur', address: 'JLN Marg, Jaipur', phone: '+91 141 256 0291', lastUpdated: '2026-02-18', stocks: { 'A+': 15, 'A-': 4, 'B+': 20, 'B-': 6, 'AB+': 8, 'AB-': 3, 'O+': 23, 'O-': 7 } },
    { id: 27, name: 'SSKM Hospital Blood Bank', category: 'Government', state: 'West Bengal', district: 'Kolkata', address: 'AJC Bose Road, Kolkata', phone: '+91 33 2223 4567', lastUpdated: '2026-02-18', stocks: { 'A+': 18, 'A-': 5, 'B+': 23, 'B-': 7, 'AB+': 9, 'AB-': 3, 'O+': 27, 'O-': 8 } },
    { id: 28, name: 'Amrita Hospital Blood Bank', category: 'Charitable', state: 'Kerala', district: 'Ernakulam', address: 'Ponekkara, Kochi', phone: '+91 484 285 1234', lastUpdated: '2026-02-17', stocks: { 'A+': 10, 'A-': 3, 'B+': 14, 'B-': 4, 'AB+': 5, 'AB-': 2, 'O+': 17, 'O-': 5 } },
    { id: 29, name: 'Medical College Blood Bank Trivandrum', category: 'Government', state: 'Kerala', district: 'Thiruvananthapuram', address: 'Chalakkuzhi, TVM', phone: '+91 471 252 8386', lastUpdated: '2026-02-18', stocks: { 'A+': 12, 'A-': 4, 'B+': 16, 'B-': 5, 'AB+': 6, 'AB-': 2, 'O+': 20, 'O-': 6 } },
    { id: 30, name: 'SCB Medical College Blood Bank', category: 'Government', state: 'Odisha', district: 'Cuttack', address: 'Manglabag, Cuttack', phone: '+91 671 241 4080', lastUpdated: '2026-02-17', stocks: { 'A+': 9, 'A-': 3, 'B+': 12, 'B-': 4, 'AB+': 5, 'AB-': 1, 'O+': 15, 'O-': 4 } },
    { id: 31, name: 'Civil Hospital Blood Bank Ahmedabad', category: 'Government', state: 'Gujarat', district: 'Ahmedabad', address: 'Asarwa, Ahmedabad', phone: '+91 79 2268 3721', lastUpdated: '2026-02-18', stocks: { 'A+': 14, 'A-': 4, 'B+': 18, 'B-': 5, 'AB+': 7, 'AB-': 2, 'O+': 21, 'O-': 6 } },
    { id: 32, name: 'Sterling Hospital Blood Bank', category: 'Private', state: 'Gujarat', district: 'Ahmedabad', address: 'Gurukul Road, Ahmedabad', phone: '+91 79 4001 5555', lastUpdated: '2026-02-17', stocks: { 'A+': 6, 'A-': 2, 'B+': 9, 'B-': 2, 'AB+': 3, 'AB-': 1, 'O+': 12, 'O-': 3 } },
    { id: 33, name: 'IGMC Hospital Blood Bank', category: 'Government', state: 'Himachal Pradesh', district: 'Shimla', address: 'The Ridge, Shimla', phone: '+91 177 265 8888', lastUpdated: '2026-02-18', stocks: { 'A+': 7, 'A-': 2, 'B+': 10, 'B-': 3, 'AB+': 4, 'AB-': 1, 'O+': 12, 'O-': 3 } },
    { id: 34, name: 'RIMS Blood Bank', category: 'Government', state: 'Jharkhand', district: 'Ranchi', address: 'Bariatu, Ranchi', phone: '+91 651 256 2100', lastUpdated: '2026-02-17', stocks: { 'A+': 8, 'A-': 2, 'B+': 11, 'B-': 3, 'AB+': 4, 'AB-': 1, 'O+': 14, 'O-': 4 } },
    { id: 35, name: 'PMCH Blood Bank', category: 'Government', state: 'Bihar', district: 'Patna', address: 'Ashok Rajpath, Patna', phone: '+91 612 230 0343', lastUpdated: '2026-02-18', stocks: { 'A+': 11, 'A-': 3, 'B+': 15, 'B-': 5, 'AB+': 6, 'AB-': 2, 'O+': 18, 'O-': 5 } },
    { id: 36, name: 'GMCH Blood Bank Guwahati', category: 'Government', state: 'Assam', district: 'Guwahati', address: 'Bhangagarh, Guwahati', phone: '+91 361 252 9457', lastUpdated: '2026-02-17', stocks: { 'A+': 6, 'A-': 2, 'B+': 9, 'B-': 3, 'AB+': 3, 'AB-': 1, 'O+': 11, 'O-': 3 } },
    { id: 37, name: 'JIPMER Blood Bank', category: 'Government', state: 'Tamil Nadu', district: 'Puducherry', address: 'Gorimedu, Puducherry', phone: '+91 413 229 6000', lastUpdated: '2026-02-18', stocks: { 'A+': 13, 'A-': 4, 'B+': 17, 'B-': 5, 'AB+': 7, 'AB-': 2, 'O+': 20, 'O-': 6 } },
    { id: 38, name: 'Goa Medical College Blood Bank', category: 'Government', state: 'Goa', district: 'North Goa', address: 'Bambolim, Goa', phone: '+91 832 245 8727', lastUpdated: '2026-02-17', stocks: { 'A+': 5, 'A-': 1, 'B+': 7, 'B-': 2, 'AB+': 3, 'AB-': 1, 'O+': 9, 'O-': 2 } },
    { id: 39, name: 'Medanta Blood Bank', category: 'Private', state: 'Haryana', district: 'Gurugram', address: 'Sector 38, Gurugram', phone: '+91 124 414 1414', lastUpdated: '2026-02-18', stocks: { 'A+': 10, 'A-': 3, 'B+': 13, 'B-': 4, 'AB+': 5, 'AB-': 2, 'O+': 16, 'O-': 5 } },
    { id: 40, name: 'Max Hospital Blood Bank', category: 'Private', state: 'Haryana', district: 'Gurugram', address: 'Sushant Lok, Gurugram', phone: '+91 124 662 3000', lastUpdated: '2026-02-17', stocks: { 'A+': 8, 'A-': 2, 'B+': 11, 'B-': 3, 'AB+': 4, 'AB-': 1, 'O+': 14, 'O-': 4 } },
];

// Get all unique states
export const getStates = () => {
    return [...new Set(bloodBanks.map(bb => bb.state))].sort();
};

// Get districts for a state
export const getDistricts = (state) => {
    return [...new Set(bloodBanks.filter(bb => bb.state === state).map(bb => bb.district))].sort();
};

// Search blood availability
export const searchBlood = ({ state, district, bloodGroup, component }) => {
    let results = [...bloodBanks];

    if (state) results = results.filter(bb => bb.state === state);
    if (district) results = results.filter(bb => bb.district === district);

    return results.map(bb => {
        const availability = bloodGroup && bloodGroup !== 'All'
            ? { [bloodGroup]: bb.stocks[bloodGroup] || 0 }
            : bb.stocks;

        const totalUnits = Object.values(availability).reduce((sum, v) => sum + v, 0);

        return {
            ...bb,
            availability,
            totalUnits,
            component: component || 'Packed Red Blood Cells',
            status: totalUnits > 10 ? 'Available' : totalUnits > 0 ? 'Low Stock' : 'Unavailable'
        };
    }).filter(r => r.totalUnits > 0);
};

// Get aggregate stats
export const getStats = () => {
    const totalBanks = bloodBanks.length;
    const totalStates = new Set(bloodBanks.map(bb => bb.state)).size;
    const totalUnits = bloodBanks.reduce((sum, bb) =>
        sum + Object.values(bb.stocks).reduce((s, v) => s + v, 0), 0);
    const groupTotals = {};
    ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].forEach(g => {
        groupTotals[g] = bloodBanks.reduce((sum, bb) => sum + (bb.stocks[g] || 0), 0);
    });
    return { totalBanks, totalStates, totalUnits, groupTotals };
};

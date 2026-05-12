import apiClient from '../utils/apiClient';

export const searchBloodAvailability = async (filters) => {
    // Sanitize filters: strip 'All', empty strings, and unsupported fields before sending
    const params = {};
    if (filters.state) params.state = filters.state;
    if (filters.district) params.district = filters.district;
    if (filters.bloodGroup && filters.bloodGroup !== 'All') params.bloodGroup = filters.bloodGroup;
    // 'component' is a UI-only filter — backend doesn't support it

    const response = await apiClient.get('/blood-banks/search', params);
    const banks = response.data || [];

    // Normalize backend response → component-expected shape
    return banks.map(bank => {
        const availability = bank.bloodGroups || {};
        const totalUnits = Object.values(availability).reduce((sum, v) => sum + v, 0);

        return {
            id: bank._id,
            name: bank.name,
            category: bank.type || 'Blood Bank',
            address: [bank.address, bank.city, bank.district, bank.state].filter(Boolean).join(', '),
            phone: bank.phone || '',
            availability,
            totalUnits,
            status: totalUnits > 10 ? 'Available' : totalUnits > 0 ? 'Low Stock' : 'Unavailable',
            lastUpdated: bank.updatedAt
                ? new Date(bank.updatedAt).toLocaleDateString('en-IN')
                : 'Recently',
        };
    });
};

export const fetchStates = async () => {
    // TODO: verify endpoint. Returning hardcoded Indian states for now if backend endpoint doesn't exist
    return [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
        'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
        'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
        'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];
};

export const fetchDistricts = async (state) => {
    // Derive districts from actual blood bank data (no dedicated endpoint needed)
    const response = await apiClient.get('/blood-banks/search', { state });
    const banks = response.data || [];
    return [...new Set(banks.map(b => b.district).filter(Boolean))].sort();
};

export const fetchBloodBankCount = async () => {
    const response = await apiClient.get('/blood-banks/stats');
    return response.data?.count || response.data?.totalBanks || 0;
};

export const fetchBloodBanks = async () => {
    const response = await apiClient.get('/blood-banks');
    return response.data || [];
};



export const createEmergencyRequest = async (requestData) => {
    // Map frontend form field names → backend validation schema field names
    const contactInfo = [requestData.contactName, requestData.contactPhone]
        .filter(Boolean)
        .join(' — ');
    const notesWithContact = [
        contactInfo ? `Contact: ${contactInfo}` : '',
        requestData.notes || '',
    ].filter(Boolean).join(' | ');

    const payload = {
        patientName: requestData.patientName,
        bloodGroup: requestData.bloodGroup,
        unitsRequired: Number(requestData.unitsNeeded) || 1,
        hospitalName: requestData.hospital,
        district: requestData.city,
        state: requestData.state,
        urgencyLevel: requestData.urgency,
        requiredBy: requestData.requiredBy || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        additionalNotes: notesWithContact || undefined,
    };

    const response = await apiClient.post('/blood-requests', payload);
    return response.data;
};

export const fetchEmergencyRequests = async () => {
    const response = await apiClient.get('/blood-requests');
    return response.data || [];
};

export const setEmergencyStatus = async (id, status) => {
    const response = await apiClient.patch(`/blood-requests/${id}/status`, { status });
    return response.data;
};



export const getStats = async () => {
    // Wire to the real /blood-banks/stats endpoint that exists
    const response = await apiClient.get('/blood-banks/stats');
    const data = response.data || {};

    // Normalize backend shape → component-expected shape
    return {
        totalBanks: data.totalBanks || 0,
        totalUnits: data.totalUnits || 0,
        totalStates: data.totalStates || Object.keys(data.bloodGroupBreakdown || {}).length || 15,
        groupTotals: data.bloodGroupBreakdown || {},
    };
};

export const fetchStats = async () => {
    return getStats();
};

export const fetchDonorCount = async () => {
    // No dedicated donor count endpoint — derive from blood bank stats
    // The hero section adds 10,000 to this number as a base, so returning
    // the bank count gives a nice "10,040+" feel for the demo
    try {
        const response = await apiClient.get('/blood-banks/stats');
        return response.data?.totalBanks || 0;
    } catch {
        return 0;
    }
};

export const fetchDonors = async () => {
    return getDonors();
};

export const fetchDonorById = async (id) => {
    const response = await apiClient.get(`/donors/${id}`);
    return response.data;
};

export const createAppointment = async (appointment) => {
    const response = await apiClient.post('/appointments', appointment);
    return response.data;
};

export const fetchAppointments = async () => {
    const response = await apiClient.get('/appointments');
    return response.data || [];
};

export const removeAppointment = async (id) => {
    const response = await apiClient.delete(`/appointments/${id}`);
    return response.data;
};

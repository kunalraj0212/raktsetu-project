// LocalStorage-based data store for donor registrations and emergency requests

const DONORS_KEY = 'raktasetu_donors';
const EMERGENCY_KEY = 'raktasetu_emergencies';
const APPOINTMENTS_KEY = 'raktasetu_appointments';

// ==================== HELPERS ====================

const getStore = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const setStore = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 6);

// ==================== DONOR REGISTRATION ====================

export const registerDonor = (donor) => {
    const donors = getStore(DONORS_KEY);
    const newDonor = {
        id: generateId(),
        ...donor,
        registeredAt: new Date().toISOString(),
        donationCount: 0,
        status: 'active',
    };
    donors.push(newDonor);
    setStore(DONORS_KEY, donors);
    return newDonor;
};

export const getDonors = () => getStore(DONORS_KEY);

export const getDonorById = (id) => getStore(DONORS_KEY).find(d => d.id === id);

export const getDonorCount = () => getStore(DONORS_KEY).length;

// ==================== EMERGENCY REQUESTS ====================

export const submitEmergencyRequest = (request) => {
    const requests = getStore(EMERGENCY_KEY);
    const newRequest = {
        id: generateId(),
        ...request,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        urgency: request.urgency || 'high',
    };
    requests.push(newRequest);
    setStore(EMERGENCY_KEY, requests);
    return newRequest;
};

export const getEmergencyRequests = () => getStore(EMERGENCY_KEY);

export const updateEmergencyStatus = (id, status) => {
    const requests = getStore(EMERGENCY_KEY);
    const idx = requests.findIndex(r => r.id === id);
    if (idx !== -1) {
        requests[idx].status = status;
        requests[idx].updatedAt = new Date().toISOString();
        setStore(EMERGENCY_KEY, requests);
    }
    return requests[idx];
};

// ==================== APPOINTMENTS ====================

export const scheduleAppointment = (appointment) => {
    const appointments = getStore(APPOINTMENTS_KEY);
    const newAppointment = {
        id: generateId(),
        ...appointment,
        createdAt: new Date().toISOString(),
        status: 'scheduled',
    };
    appointments.push(newAppointment);
    setStore(APPOINTMENTS_KEY, appointments);
    return newAppointment;
};

export const getAppointments = () => getStore(APPOINTMENTS_KEY);

export const cancelAppointment = (id) => {
    const appointments = getStore(APPOINTMENTS_KEY);
    const idx = appointments.findIndex(a => a.id === id);
    if (idx !== -1) {
        appointments[idx].status = 'cancelled';
        setStore(APPOINTMENTS_KEY, appointments);
    }
    return appointments[idx];
};

// Frontend service abstraction for backend-ready contracts.
// NOTE: This file is the only place that may read mock modules/localStorage directly for now.

import {
  bloodBanks,
  getDistricts as getDistrictsSync,
  getStates as getStatesSync,
  getStats as getStatsSync,
  searchBlood as searchBloodSync,
} from '../data/bloodBanks';

import {
  getDonorCount as getDonorCountSync,
  getDonors as getDonorsSync,
  getDonorById as getDonorByIdSync,
  registerDonor as registerDonorSync,
  submitEmergencyRequest as submitEmergencyRequestSync,
  getEmergencyRequests as getEmergencyRequestsSync,
  updateEmergencyStatus as updateEmergencyStatusSync,
  scheduleAppointment as scheduleAppointmentSync,
  getAppointments as getAppointmentsSync,
  cancelAppointment as cancelAppointmentSync,
} from '../data/storage';

// ===================== BLOOD BANK DATA =====================

export const fetchBloodBanks = async () => Promise.resolve([...bloodBanks]);

export const fetchBloodBankCount = async () => Promise.resolve(bloodBanks.length);

export const fetchStates = async () => Promise.resolve(getStatesSync());

export const fetchDistricts = async (state) => Promise.resolve(getDistrictsSync(state));

export const searchBloodAvailability = async (filters) => Promise.resolve(searchBloodSync(filters));

export const fetchStats = async () => Promise.resolve(getStatsSync());

// ===================== DONORS =====================

export const fetchDonorCount = async () => Promise.resolve(getDonorCountSync());

export const fetchDonors = async () => Promise.resolve(getDonorsSync());

export const fetchDonorById = async (id) => Promise.resolve(getDonorByIdSync(id));

export const createDonor = async (donor) => Promise.resolve(registerDonorSync(donor));

// ===================== EMERGENCY REQUESTS =====================

export const createEmergencyRequest = async (request) =>
  Promise.resolve(submitEmergencyRequestSync(request));

export const fetchEmergencyRequests = async () => Promise.resolve(getEmergencyRequestsSync());

export const setEmergencyStatus = async (id, status) =>
  Promise.resolve(updateEmergencyStatusSync(id, status));

// ===================== APPOINTMENTS =====================

export const createAppointment = async (appointment) =>
  Promise.resolve(scheduleAppointmentSync(appointment));

export const fetchAppointments = async () => Promise.resolve(getAppointmentsSync());

export const removeAppointment = async (id) => Promise.resolve(cancelAppointmentSync(id));



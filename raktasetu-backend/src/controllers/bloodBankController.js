import asyncHandler from '../utils/asyncHandler.js';
import * as bloodBankService from '../services/bloodBankService.js';

export const searchBloodBanks = asyncHandler(async (req, res) => {
  const { state, district, bloodGroup, name } = req.query;
  const results = await bloodBankService.searchBloodBanks({ state, district, bloodGroup, name });

  res.status(200).json({
    success: true,
    count: results.length,
    data: results,
  });
});

export const getStats = asyncHandler(async (req, res) => {
  const stats = await bloodBankService.getBloodBankStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});

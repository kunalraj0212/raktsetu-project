import BloodBank from '../models/BloodBank.js';

export const searchBloodBanks = async ({ state, district, bloodGroup, name }) => {
  const filter = {};

  if (state) {
    filter.state = new RegExp(state, 'i');
  }
  if (district) {
    filter.district = new RegExp(district, 'i');
  }
  if (name) {
    filter.name = new RegExp(name, 'i');
  }
  if (bloodGroup) {
    filter[`bloodGroups.${bloodGroup}`] = { $exists: true, $gt: 0 };
  }

  const results = await BloodBank.find(filter).lean();
  return results;
};

export const getBloodBankStats = async () => {
  const totalBanks = await BloodBank.countDocuments();
  const statesCovered = await BloodBank.distinct('state');
  const totalStates = statesCovered.length;

  const aggregateStats = await BloodBank.aggregate([
    {
      $project: {
        bloodGroupsArray: { $objectToArray: "$bloodGroups" }
      }
    },
    {
      $unwind: "$bloodGroupsArray"
    },
    {
      $group: {
        _id: "$bloodGroupsArray.k",
        units: { $sum: "$bloodGroupsArray.v" }
      }
    }
  ]);

  let totalUnits = 0;
  const bloodGroupBreakdown = {};

  aggregateStats.forEach(stat => {
    bloodGroupBreakdown[stat._id] = stat.units;
    totalUnits += stat.units;
  });

  return {
    totalBanks,
    totalUnits,
    totalStates,
    bloodGroupBreakdown,
  };
};

// Pricing data extracted directly from "ISC_KSA_Pricing_2025-26.xlsx"
// Sheet: " Pro Rata Pricing 25-26"
//
// The sheet has 3 term blocks. Each block lists, per Type + Age Group,
// the pro-rata fee depending on how many weeks remain at sign-up:
//   TERM I                (plan "Full")     -> 12 weeks down to 1 week
//   TWO TERMS SIGN UP      (plan "Monthly")  -> 24 weeks down to 13 weeks (10% discount)
//   THREE TERMS SIGN UPS   (plan "Seasonal") -> 36 weeks down to 25 weeks (15% discount)
//
// "weeksRemaining" = how many weeks are left in the term when the
// participant signs up — this drives the fee (pro-rata pricing).

// export type PaymentPlan = "Full" | "Monthly" | "Seasonal";
// export type ProgramType = "AS (without Kit)" | "AS (with Kit)" | "JS x 3" | "JS x 4";
// export type AgeGroup =
//   | "U6-U18 - 2 Sessions"
//   | "U8- Girls -  3 Sessions"
//   | "U10-U18 - 4 sessions";

// export interface PricingRow {
//   id: string;
//   plan: PaymentPlan;
//   planLabel: string;
//   type: ProgramType;
//   ageGroup: AgeGroup;
//   /** "WEEK1".."WEEK36" — week number within the overall 36-week year, derived from weeksRemaining */
//   week: string;
//   weeksRemaining: number;
//   fee: number;
// }

// const TYPE_AGE_GROUP: Record<ProgramType, AgeGroup> = {
//   "AS (without Kit)": "U6-U18 - 2 Sessions",
//   "AS (with Kit)": "U6-U18 - 2 Sessions",
//   "JS x 3": "U8- Girls -  3 Sessions",
//   "JS x 4": "U10-U18 - 4 sessions",
// };

// const PLAN_LABEL: Record<PaymentPlan, string> = {
//   Full: "TERM I",
//   Monthly: "TWO TERMS SIGN UP - 10% discount",
//   Seasonal: "THREE TERMS SIGN UPS - 15% discount",
// };

// // Fees copied verbatim from the spreadsheet, indexed [weeksRemaining-1 down to 0]
// // i.e. index 0 = 12/24/36 weeks remaining ... last index = 1 week remaining

// const TERM1_FEES: Record<ProgramType, number[]> = {
//   // 12,11,10,9,8,7,6,5,4,3,2,1 weeks remaining
//   "AS (without Kit)": [1863, 1863, 1863, 1863, 1863, 1863, 1863, 1863, 1863, 2070, 2277, 2484],
//   "AS (with Kit)": [2438, 2438, 2438, 2438, 2438, 2438, 2438, 2438, 2438, 2645, 2852, 3059],
//   "JS x 3": [2645, 2645, 2645, 2645, 2645, 2645, 2645, 2645, 2645, 2875, 3105, 3335],
//   "JS x 4": [3392, 3392, 3392, 3392, 3392, 3392, 3392, 3392, 3392, 3680, 3967, 4255],

// };

// const TWO_TERMS_FEES: Record<ProgramType, number[]> = {
//   // 24,23,22,21,20,19,18,17,16,15,14,13 weeks remaining
//   "AS (without Kit)": [2691, 2898, 3105, 3312, 3519, 3726, 3540, 3726, 3912, 4099, 4285, 4471],
//   "AS (with Kit)": [3266, 3473, 3680, 3887, 4094, 4301, 4115, 4301, 4487, 4674, 4860, 5046],
//   "JS x 3": [3565, 3795, 4025, 4255, 4485, 4715, 4508, 4715, 4922, 5129, 5336, 5543],
//   "JS x 4": [4543, 4830, 5118, 5405, 5693, 5980, 5721, 5980, 6239, 6497, 6756, 7015],

// };

// const THREE_TERMS_FEES: Record<ProgramType, number[]> = {
//   // 36,35,34,33,32,31,30,29,28,27,26,25 weeks remaining
//   "AS (without Kit)": [4658, 4844, 5030, 5216, 5403, 5589, 5454, 5630, 5806, 5982, 6158, 6334],
//   "AS (with Kit)": [5233, 5419, 5605, 5791, 5978, 6164, 6029, 6205, 6381, 6557, 6733, 6909],
//   "JS x 3": [5750, 5957, 6164, 6371, 6578, 6785, 6635, 6831, 7026, 7222, 7417, 7613],
//   "JS x 4": [7274, 7533, 7791, 8050, 8309, 8568, 8381, 8625, 8869, 9114, 9358, 9603],

// };

// const PROGRAM_TYPES: ProgramType[] = [
//   "AS (without Kit)",
//   "AS (with Kit)",
//   "JS x 3",
//   "JS x 4",
// ];

// function buildRows(
//   plan: PaymentPlan,
//   feesByType: Record<ProgramType, number[]>,
//   weekStart: number, // highest weeksRemaining in this block (12 / 24 / 36)
//   termWeekOffset: number, // 0 for term1, 12 for term2, 24 for term3 -> overall WEEK label
// ): PricingRow[] {
//   const rows: PricingRow[] = [];
//   PROGRAM_TYPES.forEach((type) => {
//     const fees = feesByType[type];
//     fees.forEach((fee, idx) => {
//       const weeksRemaining = weekStart - idx;
//       // Map "weeks remaining" to an absolute week number in the 1-36 calendar
//       // (week 1 = first week of the term, counting up as weeksRemaining counts down)
//       const weeksIntoBlock = (weekStart === 12 ? 12 : weekStart === 24 ? 24 : 36) - weeksRemaining + 1;
//       const overallWeek = termWeekOffset + weeksIntoBlock;
//       rows.push({
//         id: `${plan}-${type}-${weeksRemaining}`,
//         plan,
//         planLabel: PLAN_LABEL[plan],
//         type,
//         ageGroup: TYPE_AGE_GROUP[type],
//         week: `WEEK${overallWeek}`,
//         weeksRemaining,
//         fee,
//       });
//     });
//   });
//   return rows;
// }

// export const pricingData: PricingRow[] = [
//   ...buildRows("Full", TERM1_FEES, 12, 0),
//   ...buildRows("Monthly", TWO_TERMS_FEES, 24, 12),
//   ...buildRows("Seasonal", THREE_TERMS_FEES, 36, 24),
// ];


// Pricing data extracted directly from "ISC_KSA_Pricing_2025-26.xlsx"
//
// The file has 2 sheets, each with 3 term blocks. Each block lists, per
// Type + Age Group, the pro-rata fee depending on how many weeks remain
// at sign-up:
//   TERM I                (plan "Full")     -> 12 weeks down to 1 week
//   TWO TERMS SIGN UP      (plan "Monthly")  -> 24 weeks down to 13 weeks
//   THREE TERMS SIGN UPS   (plan "Seasonal") -> 36 weeks down to 25 weeks
//
// Sheet 1 " Pro Rata Pricing 25-26"  -> dataset "standard" (10%/15% normal discount)
// Sheet 2 " Pro Rata Sibling"        -> dataset "sibling"  (15% sibling discount, all terms)
//
// "weeksRemaining" = how many weeks are left in the term when the
// participant signs up — this drives the fee (pro-rata pricing).
// Pricing data extracted directly from "ISC_KSA_Pricing_2025-26.xlsx"
//
// The file has 2 sheets, each with 3 term blocks. Each block lists, per
// Type + Age Group, the pro-rata fee depending on how many weeks remain
// at sign-up:
//   TERM I                (plan "Full")     -> 12 weeks down to 1 week
//   TWO TERMS SIGN UP      (plan "Monthly")  -> 24 weeks down to 13 weeks
//   THREE TERMS SIGN UPS   (plan "Seasonal") -> 36 weeks down to 25 weeks
//
// Sheet 1 " Pro Rata Pricing 25-26"  -> dataset "standard" (10%/15% normal discount)
// Sheet 2 " Pro Rata Sibling"        -> dataset "sibling"  (15% sibling discount, all terms)
//
// "weeksRemaining" = how many weeks are left in the term when the
// participant signs up — this drives the fee (pro-rata pricing).

export type PaymentPlan = "Full" | "Monthly" | "Seasonal";
export type PricingDataset = "standard" | "sibling";
export type ProgramType = "AS (without Kit)" | "AS (with Kit)" | "JS x 3" | "JS x 4";
export type AgeGroup = string;

export interface PricingRow {
  id: string;
  dataset: PricingDataset;
  datasetLabel: string;
  plan: PaymentPlan;
  planLabel: string;
  type: ProgramType;
  ageGroup: AgeGroup;
  /** "WEEK1".."WEEK36" — week number within the overall 36-week year, derived from weeksRemaining */
  week: string;
  weeksRemaining: number;
  fee: number;
}

export const DATASET_LABEL: Record<PricingDataset, string> = {
  standard: "Pro Rata Pricing",
  sibling: "Pro Rata Sibling",
};

const PROGRAM_TYPES: ProgramType[] = [
  "AS (without Kit)",
  "AS (with Kit)",
  "JS x 3",
  "JS x 4",
];

// ---------------------------------------------------------------------------
// STANDARD DATASET  (sheet: " Pro Rata Pricing 25-26")
// ---------------------------------------------------------------------------

const STD_TYPE_AGE_GROUP: Record<ProgramType, AgeGroup> = {
  "AS (without Kit)": "U6-U18 - 2 Sessions",
  "AS (with Kit)": "U6-U18 - 2 Sessions",
  "JS x 3": "U8- Girls -  3 Sessions",
  "JS x 4": "U10-U18 - 4 sessions",
};

const STD_PLAN_LABEL: Record<PaymentPlan, string> = {
  Full: "TERM I",
  Monthly: "TWO TERMS SIGN UP - 10% discount",
  Seasonal: "THREE TERMS SIGN UPS - 15% discount",
};

// Fees copied verbatim from the spreadsheet, indexed [weeksRemaining-1 down to 0]
// i.e. index 0 = 12/24/36 weeks remaining ... last index = 1 week remaining

const STD_TERM1_FEES: Record<ProgramType, number[]> = {
  // 12,11,10,9,8,7,6,5,4,3,2,1 weeks remaining
  "AS (without Kit)": [1863, 1863, 1863, 1863, 1863, 1863, 1863, 1863, 1863, 2070, 2277, 2484],
  "AS (with Kit)": [2438, 2438, 2438, 2438, 2438, 2438, 2438, 2438, 2438, 2645, 2852, 3059],
  "JS x 3": [2645, 2645, 2645, 2645, 2645, 2645, 2645, 2645, 2645, 2875, 3105, 3335],
  "JS x 4": [3392, 3392, 3392, 3392, 3392, 3392, 3392, 3392, 3392, 3680, 3967, 4255],
};

const STD_TWO_TERMS_FEES: Record<ProgramType, number[]> = {
  // 24,23,22,21,20,19,18,17,16,15,14,13 weeks remaining
  "AS (without Kit)": [2691, 2898, 3105, 3312, 3519, 3726, 3540, 3726, 3912, 4099, 4285, 4471],
  "AS (with Kit)": [3266, 3473, 3680, 3887, 4094, 4301, 4115, 4301, 4487, 4674, 4860, 5046],
  "JS x 3": [3565, 3795, 4025, 4255, 4485, 4715, 4508, 4715, 4922, 5129, 5336, 5543],
  "JS x 4": [4543, 4830, 5118, 5405, 5693, 5980, 5721, 5980, 6239, 6497, 6756, 7015],
};

const STD_THREE_TERMS_FEES: Record<ProgramType, number[]> = {
  // 36,35,34,33,32,31,30,29,28,27,26,25 weeks remaining
  "AS (without Kit)": [4658, 4844, 5030, 5216, 5403, 5589, 5454, 5630, 5806, 5982, 6158, 6334],
  "AS (with Kit)": [5233, 5419, 5605, 5791, 5978, 6164, 6029, 6205, 6381, 6557, 6733, 6909],
  "JS x 3": [5750, 5957, 6164, 6371, 6578, 6785, 6635, 6831, 7026, 7222, 7417, 7613],
  "JS x 4": [7274, 7533, 7791, 8050, 8309, 8568, 8381, 8625, 8869, 9114, 9358, 9603],
};

// ---------------------------------------------------------------------------
// SIBLING DATASET  (sheet: " Pro Rata Sibling")
// ---------------------------------------------------------------------------

// TERM I block on the Sibling sheet uses different (narrower) age-group labels
const SIB_TERM1_AGE_GROUP: Record<ProgramType, AgeGroup> = {
  "AS (without Kit)": "U8 - New - 2 session",
  "AS (with Kit)": "U8 - New - 2 session",
  "JS x 3": "U8 - 2 sessions",
  "JS x 4": "U8 - 3 sessions",
};

// TWO TERMS / THREE TERMS blocks on the Sibling sheet use the same age
// groups as the Standard sheet
const SIB_TYPE_AGE_GROUP: Record<ProgramType, AgeGroup> = {
  "AS (without Kit)": "U6-U18 - 2 Sessions",
  "AS (with Kit)": "U6-U18 - 2 Sessions",
  "JS x 3": "U8- Girls -  3 Sessions",
  "JS x 4": "U10-U18 - 4 sessions",
};

const SIB_PLAN_LABEL: Record<PaymentPlan, string> = {
  Full: "TERM I - 15% Sibling discount",
  Monthly: "TWO TERMS SIGN UP - 15% Sibling discount",
  Seasonal: "THREE TERMS SIGN UPS - 15% Sibling discount",
};

const SIB_TERM1_FEES: Record<ProgramType, number[]> = {
  // 12,11,10,9,8,7,6,5,4,3,2,1 weeks remaining
  "AS (without Kit)": [1584, 1584, 1584, 1584, 1584, 1584, 1584, 1584, 1584, 1760, 1935, 2111],
  "AS (with Kit)": [2159, 2159, 2159, 2159, 2159, 2159, 2159, 2159, 2159, 2335, 2510, 2686],
  "JS x 3": [2335, 2335, 2335, 2335, 2335, 2335, 2335, 2335, 2335, 2530, 2726, 2921],
  "JS x 4": [3004, 3004, 3004, 3004, 3004, 3004, 3004, 3004, 3004, 3249, 3493, 3738,],

};

const SIB_TWO_TERMS_FEES: Record<ProgramType, number[]> = {
  // 24,23,22,21,20,19,18,17,16,15,14,13 weeks remaining
  "AS (without Kit)": [2287, 2463, 2639, 2815, 2991, 3167, 3343, 3519, 3695, 3871, 4047, 4223],
  "AS (with Kit)": [2862, 3038, 3214, 3390, 3566, 3742, 3918, 4094, 4270, 4446, 4622, 4798],
  "JS x 3": [3117, 3312, 3508, 3703, 3899, 4094, 4290, 4485, 4681, 4876, 5072, 5267],
  "JS x 4": [3982, 4226, 4471, 4715, 4959, 5204, 5448, 5693, 5937, 6181, 6426, 6670],
};

const SIB_THREE_TERMS_FEES: Record<ProgramType, number[]> = {
  // 36,35,34,33,32,31,30,29,28,27,26,25 weeks remaining
  "AS (without Kit)": [4399, 4575, 4751, 4927, 5103, 5279, 5454, 5630, 5806, 5982, 6158, 6334],
  "AS (with Kit)": [4974, 5150, 5326, 5502, 5678, 5854, 6029, 6205, 6381, 6557, 6733, 6909],
  "JS x 3": [5463, 5658, 5854, 6049, 6245, 6440, 6636, 6831, 7027, 7222, 7418, 7613],
  "JS x 4": [6914, 7159, 7403, 7648, 7892, 8136, 8381, 8625, 8869, 9114, 9358, 9603],

};

// ---------------------------------------------------------------------------
// Row builder (shared by both datasets)
// ---------------------------------------------------------------------------

function buildRows(
  dataset: PricingDataset,
  datasetLabel: string,
  plan: PaymentPlan,
  planLabel: string,
  feesByType: Record<ProgramType, number[]>,
  ageGroupByType: Record<ProgramType, AgeGroup>,
  weekStart: number, // highest weeksRemaining in this block (12 / 24 / 36)
  termWeekOffset: number, // 0 for term1, 12 for term2, 24 for term3 -> overall WEEK label
): PricingRow[] {
  const rows: PricingRow[] = [];
  PROGRAM_TYPES.forEach((type) => {
    const fees = feesByType[type];
    fees.forEach((fee, idx) => {
      const weeksRemaining = weekStart - idx;
      // Map "weeks remaining" to an absolute week number in the 1-36 calendar
      // (week 1 = first week of the term, counting up as weeksRemaining counts down)
      const weeksIntoBlock = weekStart - weeksRemaining + 1;
      const overallWeek = termWeekOffset + weeksIntoBlock;
      rows.push({
        id: `${dataset}-${plan}-${type}-${weeksRemaining}`,
        dataset,
        datasetLabel,
        plan,
        planLabel,
        type,
        ageGroup: ageGroupByType[type],
        week: `WEEK${overallWeek}`,
        weeksRemaining,
        fee,
      });
    });
  });
  return rows;
}

// ---------------------------------------------------------------------------
// Final export — both datasets combined
// ---------------------------------------------------------------------------

export const pricingData: PricingRow[] = [
  // Standard
  ...buildRows("standard", DATASET_LABEL.standard, "Full", STD_PLAN_LABEL.Full, STD_TERM1_FEES, STD_TYPE_AGE_GROUP, 12, 0),
  ...buildRows("standard", DATASET_LABEL.standard, "Monthly", STD_PLAN_LABEL.Monthly, STD_TWO_TERMS_FEES, STD_TYPE_AGE_GROUP, 24, 12),
  ...buildRows("standard", DATASET_LABEL.standard, "Seasonal", STD_PLAN_LABEL.Seasonal, STD_THREE_TERMS_FEES, STD_TYPE_AGE_GROUP, 36, 24),

  // Sibling
  ...buildRows("sibling", DATASET_LABEL.sibling, "Full", SIB_PLAN_LABEL.Full, SIB_TERM1_FEES, SIB_TERM1_AGE_GROUP, 12, 0),
  ...buildRows("sibling", DATASET_LABEL.sibling, "Monthly", SIB_PLAN_LABEL.Monthly, SIB_TWO_TERMS_FEES, SIB_TYPE_AGE_GROUP, 24, 12),
  ...buildRows("sibling", DATASET_LABEL.sibling, "Seasonal", SIB_PLAN_LABEL.Seasonal, SIB_THREE_TERMS_FEES, SIB_TYPE_AGE_GROUP, 36, 24),
];
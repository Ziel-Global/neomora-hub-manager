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

export type PaymentPlan = "Full" | "Monthly" | "Seasonal";
export type ProgramType = "AS (without Kit)" | "AS (with Kit)" | "JS x 3" | "JS x 4";
export type AgeGroup =
  | "U6-U18 - 2 Sessions"
  | "U8- Girls -  3 Sessions"
  | "U10-U18 - 4 sessions";

export interface PricingRow {
  id: string;
  plan: PaymentPlan;
  planLabel: string;
  type: ProgramType;
  ageGroup: AgeGroup;
  /** "WEEK1".."WEEK36" — week number within the overall 36-week year, derived from weeksRemaining */
  week: string;
  weeksRemaining: number;
  fee: number;
}

const TYPE_AGE_GROUP: Record<ProgramType, AgeGroup> = {
  "AS (without Kit)": "U6-U18 - 2 Sessions",
  "AS (with Kit)": "U6-U18 - 2 Sessions",
  "JS x 3": "U8- Girls -  3 Sessions",
  "JS x 4": "U10-U18 - 4 sessions",
};

const PLAN_LABEL: Record<PaymentPlan, string> = {
  Full: "TERM I",
  Monthly: "TWO TERMS SIGN UP - 10% discount",
  Seasonal: "THREE TERMS SIGN UPS - 15% discount",
};

// Fees copied verbatim from the spreadsheet, indexed [weeksRemaining-1 down to 0]
// i.e. index 0 = 12/24/36 weeks remaining ... last index = 1 week remaining

const TERM1_FEES: Record<ProgramType, number[]> = {
  // 12,11,10,9,8,7,6,5,4,3,2,1 weeks remaining
  // "AS (without Kit)": [2484, 2277, 2070, 1863, 1863, 1863, 1863, 1863, 1863, 1863, 1863, 1863],
  "AS (without Kit)": [1863, 1863, 1863, 1863, 1863, 1863, 1863, 1863, 1863, 2070, 2277, 2484],

  // "AS (with Kit)": [3059, 2852, 2645, 2438, 2438, 2438, 2438, 2438, 2438, 2438, 2438, 2438],
  "AS (with Kit)": [2438, 2438, 2438, 2438, 2438, 2438, 2438, 2438, 2438, 2645, 2852, 3059],

  // "JS x 3": [3335, 3105, 2875, 2645, 2645, 2645, 2645, 2645, 2645, 2645, 2645, 2645],
  "JS x 3": [2645, 2645, 2645, 2645, 2645, 2645, 2645, 2645, 2645, 2875, 3105, 3335],

  // "JS x 4": [4255, 3967, 3680, 3392, 3392, 3392, 3392, 3392, 3392, 3392, 3392, 3392],
  "JS x 4": [3392, 3392, 3392, 3392, 3392, 3392, 3392, 3392, 3392, 3680, 3967, 4255],

};

const TWO_TERMS_FEES: Record<ProgramType, number[]> = {
  // 24,23,22,21,20,19,18,17,16,15,14,13 weeks remaining
  // "AS (without Kit)": [4471, 4285, 4099, 3912, 3726, 3540, 3726, 3519, 3312, 3105, 2898, 2691],
  "AS (without Kit)": [2691, 2898, 3105, 3312, 3519, 3726, 3540, 3726, 3912, 4099, 4285, 4471],

  // "AS (with Kit)": [5046, 4860, 4674, 4487, 4301, 4115, 4301, 4094, 3887, 3680, 3473, 3266],
  "AS (with Kit)": [3266, 3473, 3680, 3887, 4094, 4301, 4115, 4301, 4487, 4674, 4860, 5046],

  // "JS x 3": [5543, 5336, 5129, 4922, 4715, 4508, 4715, 4485, 4255, 4025, 3795, 3565],
  "JS x 3": [3565, 3795, 4025, 4255, 4485, 4715, 4508, 4715, 4922, 5129, 5336, 5543],

  // "JS x 4": [7015, 6756, 6497, 6239, 5980, 5721, 5980, 5693, 5405, 5118, 4830, 4543],
  "JS x 4": [4543, 4830, 5118, 5405, 5693, 5980, 5721, 5980, 6239, 6497, 6756, 7015],

};

const THREE_TERMS_FEES: Record<ProgramType, number[]> = {
  // 36,35,34,33,32,31,30,29,28,27,26,25 weeks remaining
  // "AS (without Kit)": [6334, 6158, 5982, 5806, 5630, 5454, 5589, 5403, 5216, 5030, 4844, 4658],
  "AS (without Kit)": [4658, 4844, 5030, 5216, 5403, 5589, 5454, 5630, 5806, 5982, 6158, 6334],

  // "AS (with Kit)": [6909, 6733, 6557, 6381, 6205, 6029, 6164, 5978, 5791, 5605, 5419, 5233],
  "AS (with Kit)": [5233, 5419, 5605, 5791, 5978, 6164, 6029, 6205, 6381, 6557, 6733, 6909],

  // "JS x 3": [7613, 7417, 7222, 7026, 6831, 6635, 6785, 6578, 6371, 6164, 5957, 5750],
  "JS x 3": [5750, 5957, 6164, 6371, 6578, 6785, 6635, 6831, 7026, 7222, 7417, 7613],

  // "JS x 4": [9603, 9358, 9114, 8869, 8625, 8381, 8568, 8309, 8050, 7791, 7533, 7274],
  "JS x 4": [7274, 7533, 7791, 8050, 8309, 8568, 8381, 8625, 8869, 9114, 9358, 9603],

};

const PROGRAM_TYPES: ProgramType[] = [
  "AS (without Kit)",
  "AS (with Kit)",
  "JS x 3",
  "JS x 4",
];

function buildRows(
  plan: PaymentPlan,
  feesByType: Record<ProgramType, number[]>,
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
      const weeksIntoBlock = (weekStart === 12 ? 12 : weekStart === 24 ? 24 : 36) - weeksRemaining + 1;
      const overallWeek = termWeekOffset + weeksIntoBlock;
      rows.push({
        id: `${plan}-${type}-${weeksRemaining}`,
        plan,
        planLabel: PLAN_LABEL[plan],
        type,
        ageGroup: TYPE_AGE_GROUP[type],
        week: `WEEK${overallWeek}`,
        weeksRemaining,
        fee,
      });
    });
  });
  return rows;
}

export const pricingData: PricingRow[] = [
  ...buildRows("Full", TERM1_FEES, 12, 0),
  ...buildRows("Monthly", TWO_TERMS_FEES, 24, 12),
  ...buildRows("Seasonal", THREE_TERMS_FEES, 36, 24),
];
// src/config/catalog.ts

export type PlanDurationKey =
  | "1_day"
  | "2_days"
  | "3_days"
  | "1_week"
  | "2_weeks"
  | "monthly";

export type Plan = {
  id: string;
  category: string;
  name: string;
  dailyMenu: string;
  proteinPerDay: string;
  pricesInr: Partial<Record<PlanDurationKey, number>>;
  highlight?: "primary" | "accent" | "none";
};

export type AddOn = {
  id: string;
  name: string;
  portion: string;
  priceInr: number;
  highlight?: "primary" | "accent" | "none";
};

/**
 * Source: Breakfast_Subscription_Costing_Model-Feb-Menu.csv
 * Keep this file aligned with the sheet so Plans/Menu stay accurate.
 */
export const PLANS: Plan[] = [
  {
    id: "veg-normal",
    category: "Adult – Veg",
    name: "Veg Normal",
    dailyMenu: "Fruits 180 g + Veg 100 g + Protein Salad 140 g",
    proteinPerDay: "18–20 g",
    pricesInr: {
      "1_day": 119,
      "2_days": 219,
      "3_days": 299,
      "1_week": 599,
      "2_weeks": 1099,
      "monthly": 2399,
    },
    highlight: "primary",
  },
  {
    id: "veg-premium",
    category: "Adult – Veg ⭐",
    name: "Veg Premium",
    dailyMenu: "Veg Normal + Dry Fruits & Seeds 25 g",
    proteinPerDay: "22–24 g",
    pricesInr: {
      "1_day": 149,
      "2_days": 269,
      "3_days": 369,
      "1_week": 699,
      "2_weeks": 1299,
      "monthly": 2699,
    },
    highlight: "accent",
  },
  {
    id: "nonveg-normal",
    category: "Adult – Non-Veg",
    name: "Non-Veg Normal",
    dailyMenu: "Veg Premium + 2 Eggs (~100 g)",
    proteinPerDay: "30–32 g",
    pricesInr: {
      "1_day": 179,
      "2_days": 329,
      "3_days": 449,
      "1_week": 799,
      "2_weeks": 1499,
      "monthly": 2999,
    },
    highlight: "primary",
  },
  {
    id: "nonveg-premium",
    category: "Adult – Non-Veg Premium",
    name: "Non-Veg Premium",
    dailyMenu: "Veg Premium + Chicken 100 g (cooked)",
    proteinPerDay: "45–48 g",
    pricesInr: {
      "1_day": 219,
      "2_days": 399,
      "3_days": 549,
      "1_week": 949,
      "2_weeks": 1799,
      "monthly": 3399,
    },
    highlight: "accent",
  },
  {
    id: "children",
    category: "Children (5–14 yrs)",
    name: "Children Plan",
    dailyMenu: "Fruits 150 g + Veg 80 g + Protein Base 100 g",
    proteinPerDay: "10–14 g",
    pricesInr: {
      "1_week": 499,
      "2_weeks": 949,
      "monthly": 1799,
    },
    highlight: "none",
  },
];

export const ADDONS: AddOn[] = [
  { id: "extra-egg-1", name: "Extra Egg", portion: "1 boiled egg", priceInr: 25, highlight: "primary" },
  { id: "extra-egg-2", name: "Extra Eggs", portion: "2 boiled eggs", priceInr: 45, highlight: "primary" },
  { id: "extra-chicken-50", name: "Extra Chicken", portion: "50 g cooked", priceInr: 75, highlight: "accent" },
  { id: "extra-chicken-100", name: "Extra Chicken", portion: "100 g cooked", priceInr: 140, highlight: "accent" },
  { id: "extra-fruits-100", name: "Extra Fruits", portion: "100 g seasonal fruits", priceInr: 30, highlight: "primary" },
  { id: "extra-fruits-200", name: "Extra Fruits", portion: "200 g seasonal fruits", priceInr: 55, highlight: "primary" },
  { id: "extra-veg-100", name: "Extra Vegetables", portion: "100 g seasonal vegetables", priceInr: 25, highlight: "primary" },
  { id: "extra-veg-200", name: "Extra Vegetables", portion: "200 g seasonal vegetables", priceInr: 45, highlight: "primary" },
  { id: "extra-protein-50", name: "Extra Protein Salad", portion: "50 g cooked", priceInr: 35, highlight: "accent" },
  { id: "extra-protein-100", name: "Extra Protein Salad", portion: "100 g cooked", priceInr: 65, highlight: "accent" },
  { id: "dry-fruits-15", name: "Dry Fruits Mix", portion: "15 g", priceInr: 40, highlight: "accent" },
  { id: "dry-fruits-seeds-25", name: "Dry Fruits + Seeds Mix", portion: "25 g", priceInr: 65, highlight: "accent" },
];

export const DURATION_LABELS: Record<PlanDurationKey, string> = {
  "1_day": "1 Day",
  "2_days": "2 Days",
  "3_days": "3 Days",
  "1_week": "1 Week",
  "2_weeks": "2 Weeks",
  "monthly": "Monthly",
};

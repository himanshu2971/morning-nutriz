// src/lib/catalog.ts
import fs from "node:fs";
import path from "node:path";

export type PlanDurationKey =
  | "1_day"
  | "2_days"
  | "3_days"
  | "1_week"
  | "2_weeks"
  | "monthly";

export type CatalogPlan = {
  id: string;
  category: string;
  planName: string;
  dailyMenu: string;
  proteinPerDay: string;
  pricesInr: Partial<Record<PlanDurationKey, number>>;
};

export type CatalogAddon = {
  id: string;
  name: string;
  portion: string;
  priceInr: number;
};

export type CatalogFebMenuItem = {
  weekday: string;
  date: string;
  fruits180g: string;
  vegetables100g: string;
  proteinBase140g: string;
};

export type Catalog = {
  plans: CatalogPlan[];
  addons: CatalogAddon[];
  febMenu: CatalogFebMenuItem[];
};

export function getCatalog(): Catalog {
  // TODAY: local seed file
  // LATER: replace the implementation to fetch from Supabase/API.
  const p = path.join(process.cwd(), "src", "data", "catalog.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw) as Catalog;
}

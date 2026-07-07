
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  pricingData,
  DATASET_LABEL,
  type PricingRow,
  type PaymentPlan,
  type ProgramType,
  type AgeGroup,
  type PricingDataset,
} from "@/data/pricingData";

export const Route = createFileRoute("/finance/plans")({
  component: PlansPage,
});

const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

function PlansPage() {
  // Default dataset = "standard" (Pro Rata Pricing sheet). Switching this
  // changes which pricing table (Pro Rata Pricing / Pro Rata Sibling)
  // everything below filters against.
  const [datasetFilter, setDatasetFilter] = useState<PricingDataset>("standard");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [weekFilter, setWeekFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>("all");

  // Selected dataset ke andar hi baaki filters ka data aayega
  const datasetRows = useMemo(
    () => pricingData.filter((p) => p.dataset === datasetFilter),
    [datasetFilter],
  );

  // Selected plan ke hisaab se week range decide karna (Plan/Week dono
  // datasets ke liye same hain)
  const weekRange = useMemo(() => {
    if (planFilter === "Full") return { start: 1, end: 12 };
    if (planFilter === "Monthly") return { start: 13, end: 24 };
    if (planFilter === "Seasonal") return { start: 25, end: 36 };
    return { start: 1, end: 36 }; // all terms
  }, [planFilter]);

  const weekOptions = useMemo(
    () =>
      Array.from(
        { length: weekRange.end - weekRange.start + 1 },
        (_, i) => `WEEK${weekRange.start + i}`,
      ),
    [weekRange],
  );

  // Dataset badalte hi Age Group filter reset karo (kyunki age-groups
  // dataset ke hisaab se alag hote hain); Plan/Week/Type same rehte hain
  const handleDatasetChange = (value: string) => {
    setDatasetFilter(value as PricingDataset);
    setAgeGroupFilter("all");
  };

  // Plan badalte hi week filter reset karo
  const handlePlanChange = (value: string) => {
    setPlanFilter(value);
    setWeekFilter("all");
  };

  // Selected type ke hisaab se age group options — hamesha CURRENT dataset
  // (Pricing ya Sibling) ke andar se hi nikalte hain
  const ageGroupOptions: AgeGroup[] = useMemo(() => {
    const source =
      typeFilter === "all"
        ? datasetRows
        : datasetRows.filter((p) => p.type === (typeFilter as ProgramType));
    return Array.from(new Set(source.map((p) => p.ageGroup)));
  }, [datasetRows, typeFilter]);

  const filtered = useMemo(
    () =>
      datasetRows.filter((p) => {
        if (planFilter !== "all" && p.plan !== (planFilter as PaymentPlan)) return false;
        if (weekFilter !== "all" && p.week !== weekFilter) return false;
        if (typeFilter !== "all" && p.type !== (typeFilter as ProgramType)) return false;
        if (ageGroupFilter !== "all" && p.ageGroup !== (ageGroupFilter as AgeGroup)) return false;
        return true;
      }),
    [datasetRows, planFilter, weekFilter, typeFilter, ageGroupFilter],
  );

  const columns: Column<PricingRow>[] = [
    { key: "datasetLabel", header: "Pricing List", sortable: true },
    { key: "planLabel", header: "Term / Plan", sortable: true },
    { key: "week", header: "Week", sortable: true },
    // { key: "weeksRemaining", header: "Weeks Remaining" },
    { key: "type", header: "Type" },
    { key: "ageGroup", header: "Age Group" },
    { key: "fee", header: "Fee", sortable: true, render: (r) => SAR(r.fee) },
  ];

  const filters = (
    <div className="flex flex-wrap gap-2">
      <Select value={datasetFilter} onValueChange={handleDatasetChange}>
        <SelectTrigger className="w-[200px]"><SelectValue placeholder="Pricing List" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="standard">{DATASET_LABEL.standard}</SelectItem>
          <SelectItem value="sibling">{DATASET_LABEL.sibling}</SelectItem>
        </SelectContent>
      </Select>

      <Select value={planFilter} onValueChange={handlePlanChange}>
        <SelectTrigger className="w-[340px]"><SelectValue placeholder="Plan" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All terms</SelectItem>
          <SelectItem value="Full">
            {datasetFilter === "sibling" ? "TERM I - 15% Sibling discount" : "TERM I"}
          </SelectItem>
          <SelectItem value="Monthly">
            {datasetFilter === "sibling" ? "TWO TERMS SIGN UP - 15% Sibling discount" : "TWO TERMS SIGN UP - 10% discount"}
          </SelectItem>
          <SelectItem value="Seasonal">
            {datasetFilter === "sibling" ? "THREE TERMS SIGN UPS - 15% Sibling discount" : "THREE TERMS SIGN UPS - 15% discount"}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select value={weekFilter} onValueChange={setWeekFilter}>
        <SelectTrigger className="w-[140px]"><SelectValue placeholder="Week" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All WEEKS</SelectItem>
          {weekOptions.map((w) => (
            <SelectItem key={w} value={w}>{w}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={typeFilter}
        onValueChange={(v) => {
          setTypeFilter(v);
          setAgeGroupFilter("all");
        }}
      >
        <SelectTrigger className="w-[170px]"><SelectValue placeholder="Type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All TYPES</SelectItem>
          <SelectItem value="AS (without Kit)">AS (WITHOUT KIT)</SelectItem>
          <SelectItem value="AS (with Kit)">AS (WITH KIT)</SelectItem>
          <SelectItem value="JS x 3">JS x 3</SelectItem>
          <SelectItem value="JS x 4">JS x 4</SelectItem>
        </SelectContent>
      </Select>

      <Select value={ageGroupFilter} onValueChange={setAgeGroupFilter}>
        <SelectTrigger className="w-[200px]"><SelectValue placeholder="Age Group" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All AGE GROUPS</SelectItem>
          {ageGroupOptions.map((ag) => (
            <SelectItem key={ag} value={ag}>{ag}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <>
      <PageHeader title="Payment Plans — Pricing" />
      <div className="space-y-6 p-6">
        <DataTable
          data={filtered}
          columns={columns}
          filters={filters}
        />
      </div>
    </>
  );
}
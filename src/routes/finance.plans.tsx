// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { CalendarClock, CalendarDays, Coins } from "lucide-react";
// import { PageHeader } from "@/components/PageHeader";
// import { DataTable, type Column } from "@/components/DataTable";
// import { StatusBadge } from "@/components/StatusBadge";
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/components/ui/select";
// import { mockPayments, type MockPayment, type PaymentPlan } from "@/data/mockPayments";
// import { cn } from "@/lib/utils";

// export const Route = createFileRoute("/finance/plans")({
//   component: PlansPage,
// });

// const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

// function PlansPage() {
//   const [planFilter, setPlanFilter] = useState<string>("all");

//   const byPlan = (plan: PaymentPlan) => mockPayments.filter((p) => p.plan === plan);

//   const fullPlan = byPlan("Full");
//   const monthly = byPlan("Monthly");
//   const seasonal = byPlan("Seasonal");

//   const fullAvg = fullPlan.length ? Math.round(fullPlan.reduce((a, p) => a + p.totalFee, 0) / fullPlan.length) : 0;
//   const monthlyExpected = monthly.reduce((a, p) => a + (p.totalFee - p.paidAmount), 0);
//   const nextSeasonalDate = seasonal
//     .map((p) => p.nextDueDate)
//     .filter((d) => d !== "-")
//     .sort()[0] ?? "-";

//   const filtered = useMemo(
//     () => mockPayments.filter((p) => planFilter === "all" || p.plan === planFilter),
//     [planFilter],
//   );

//   const installmentAmount = (p: MockPayment) => {
//     if (p.plan === "Full") return p.balance;
//     if (p.plan === "Monthly") return Math.round(p.totalFee / 4);
//     return Math.round(p.totalFee / 2);
//   };

//   const columns: Column<MockPayment>[] = [
//     { key: "participantName", header: "Participant", sortable: true },
//     { key: "plan", header: "Plan" },
//     { key: "totalFee", header: "Total Fee", render: (r) => SAR(r.totalFee) },
//     { key: "next", header: "Next Instalment", render: (r) => SAR(installmentAmount(r)) },
//     { key: "nextDueDate", header: "Next Due" },
//     { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "Partial" ? "Pending" : r.status} /> },
//   ];

//   const filters = (
//     <Select value={planFilter} onValueChange={setPlanFilter}>
//       <SelectTrigger className="w-[150px]"><SelectValue placeholder="Plan" /></SelectTrigger>
//       <SelectContent>
//         <SelectItem value="all">All terms</SelectItem>
//         <SelectItem value="Full">TERM I</SelectItem>
//         <SelectItem value="Monthly">TWO TERMS SIGN UP  - 10% discount</SelectItem>
//         <SelectItem value="Seasonal">THREE TERMS SIGN UPS  - 15% discount</SelectItem>
//       </SelectContent>
//     </Select>

//   );
//   const filters2 = (
//      <Select >
//       <SelectTrigger className="w-[150px]"><SelectValue placeholder="Plan" /></SelectTrigger>
//       <SelectContent>
//         <SelectItem value="all">All WEEKS</SelectItem>
//         <SelectItem value="Full">WEEK 1</SelectItem>
//         <SelectItem value="Monthly">WEEK2</SelectItem>
//                 <SelectItem value="Monthly">WEEK3</SelectItem>
//         <SelectItem value="Monthly">WEEK4</SelectItem>
//         <SelectItem value="Monthly">WEEK5</SelectItem>
//         <SelectItem value="Monthly">WEEK6</SelectItem>
//         <SelectItem value="Monthly">WEEK7</SelectItem>
//         <SelectItem value="Monthly">WEEK8</SelectItem>
//         <SelectItem value="Monthly">WEEK9</SelectItem>
//         <SelectItem value="Monthly">WEEK10</SelectItem>
//         <SelectItem value="Monthly">WEE11</SelectItem>
//         <SelectItem value="Monthly">WEEK12</SelectItem>

//       </SelectContent>
//     </Select>
//   );

//     const filters3 = (
//      <Select >
//       <SelectTrigger className="w-[150px]"><SelectValue placeholder="Plan" /></SelectTrigger>
//       <SelectContent>
//         <SelectItem value="all">All TYPES</SelectItem>
//         <SelectItem value="Full">AS (WITHOUT KIT)</SelectItem>
//         <SelectItem value="Monthly">AS (WITH KIT)</SelectItem>
//                 <SelectItem value="Monthly">JS x 3</SelectItem>
//         <SelectItem value="Monthly">JS x 4</SelectItem>
//       </SelectContent>
//     </Select>
//   );
//       const filters4 = (
//      <Select >
//       <SelectTrigger className="w-[150px]"><SelectValue placeholder="Plan" /></SelectTrigger>
//       <SelectContent>
//         <SelectItem value="all">All AGE GROUPS</SelectItem>
//         <SelectItem value="Full">U6-U18 - 2 Sessions</SelectItem>
//         <SelectItem value="Monthly">U6-U18 - 2 Sessions</SelectItem>
//                 <SelectItem value="Monthly">U8- Girls -  3 Sessions</SelectItem>
//         <SelectItem value="Monthly"> U10-U18 - 4 sessions</SelectItem>
//       </SelectContent>
//     </Select>
//   );
//   return (
//     <>
//       <PageHeader title="Payment Plans" />
//       <div className="space-y-6 p-6">
//         <div className="grid gap-4 md:grid-cols-3">
//           <PlanCard
//             title="Full Payment"
//             subtitle="One-time"
//             icon={Coins}
//             metric={`${fullPlan.length} participants`}
//             secondary={`Avg fee ${SAR(fullAvg)}`}
//             onClick={() => setPlanFilter("Full")}
//             active={planFilter === "Full"}
//           />
//           <PlanCard
//             title="Monthly Instalments"
//             subtitle="Recurring"
//             icon={CalendarClock}
//             metric={`${monthly.length} participants`}
//             secondary={`Expected ${SAR(monthlyExpected)}`}
//             onClick={() => setPlanFilter("Monthly")}
//             active={planFilter === "Monthly"}
//           />
//           <PlanCard
//             title="Seasonal Payments"
//             subtitle="Per season"
//             icon={CalendarDays}
//             metric={`${seasonal.length} participants`}
//             secondary={`Next batch ${nextSeasonalDate}`}
//             onClick={() => setPlanFilter("Seasonal")}
//             active={planFilter === "Seasonal"}
//           />
//         </div>

//         <DataTable
//           data={filtered}
//           columns={columns}
//           searchKeys={["participantName"]}
//           searchPlaceholder="Search participants…"
//           filters={filters}
//         />
//       </div>
//     </>
//   );
// }

// function PlanCard({
//   title, subtitle, icon: Icon, metric, secondary, onClick, active,
// }: {
//   title: string; subtitle: string; icon: typeof Coins;
//   metric: string; secondary: string; onClick: () => void; active: boolean;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         "rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md",
//         active && "ring-2 ring-brand"
//       )}
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{subtitle}</p>
//           <h3 className="mt-1 text-lg font-semibold">{title}</h3>
//         </div>
//         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
//           <Icon className="h-5 w-5" />
//         </div>
//       </div>
//       <p className="mt-4 text-2xl font-bold">{metric}</p>
//       <p className="mt-1 text-xs text-muted-foreground">{secondary}</p>
//     </button>
//   );
// }








// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { CalendarClock, CalendarDays, Coins } from "lucide-react";
// import { PageHeader } from "@/components/PageHeader";
// import { DataTable, type Column } from "@/components/DataTable";
// import { StatusBadge } from "@/components/StatusBadge";
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/components/ui/select";
// import { mockPayments, type MockPayment, type PaymentPlan } from "@/data/mockPayments";
// import { cn } from "@/lib/utils";

// export const Route = createFileRoute("/finance/plans")({
//   component: PlansPage,
// });

// const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

// function PlansPage() {
//   const [planFilter, setPlanFilter] = useState<string>("all");
//   const [weekFilter, setWeekFilter] = useState<string>("all");
//   const [typeFilter, setTypeFilter] = useState<string>("all");
//   const [ageGroupFilter, setAgeGroupFilter] = useState<string>("all");

//   const byPlan = (plan: PaymentPlan) => mockPayments.filter((p) => p.plan === plan);

//   const fullPlan = byPlan("Full");
//   const monthly = byPlan("Monthly");
//   const seasonal = byPlan("Seasonal");

//   const fullAvg = fullPlan.length ? Math.round(fullPlan.reduce((a, p) => a + p.totalFee, 0) / fullPlan.length) : 0;
//   const monthlyExpected = monthly.reduce((a, p) => a + (p.totalFee - p.paidAmount), 0);
//   const nextSeasonalDate = seasonal
//     .map((p) => p.nextDueDate)
//     .filter((d) => d !== "-")
//     .sort()[0] ?? "-";

//   const filtered = useMemo(
//     () =>
//       mockPayments.filter((p) => {
//         if (planFilter !== "all" && p.plan !== planFilter) return false;
//         // NOTE: these fields (week / type / ageGroup) must exist on MockPayment.
//         // Adjust the property names below to match your actual data shape.
//         if (weekFilter !== "all" && (p as any).week !== weekFilter) return false;
//         if (typeFilter !== "all" && (p as any).type !== typeFilter) return false;
//         if (ageGroupFilter !== "all" && (p as any).ageGroup !== ageGroupFilter) return false;
//         return true;
//       }),
//     [planFilter, weekFilter, typeFilter, ageGroupFilter],
//   );

//   const installmentAmount = (p: MockPayment) => {
//     if (p.plan === "Full") return p.balance;
//     if (p.plan === "Monthly") return Math.round(p.totalFee / 4);
//     return Math.round(p.totalFee / 2);
//   };

//   const columns: Column<MockPayment>[] = [
//     { key: "participantName", header: "Participant", sortable: true },
//     { key: "plan", header: "Plan" },
//     { key: "totalFee", header: "Total Fee", render: (r) => SAR(r.totalFee) },
//     { key: "next", header: "Next Instalment", render: (r) => SAR(installmentAmount(r)) },
//     { key: "nextDueDate", header: "Next Due" },
//     { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "Partial" ? "Pending" : r.status} /> },
//   ];

//   // Plan ke hisaab se week range decide karna
//   // All terms -> 1-36, TERM I (Full) -> 1-12, TERM II (Monthly) -> 13-24, TERM III (Seasonal) -> 25-36
//   const weekRange = useMemo(() => {
//     if (planFilter === "Full") return { start: 1, end: 12 };
//     if (planFilter === "Monthly") return { start: 13, end: 24 };
//     if (planFilter === "Seasonal") return { start: 25, end: 36 };
//     return { start: 1, end: 36 };
//   }, [planFilter]);

//   const weekOptions = useMemo(
//     () =>
//       Array.from(
//         { length: weekRange.end - weekRange.start + 1 },
//         (_, i) => `WEEK${weekRange.start + i}`,
//       ),
//     [weekRange],
//   );

//   // Plan badalte hi week filter reset karo, warna invalid/out-of-range week selected reh jayega
//   const handlePlanChange = (value: string) => {
//     setPlanFilter(value);
//     setWeekFilter("all");
//   };

//   const filters = (
//     <div className="flex flex-wrap gap-2">
//       <Select value={planFilter} onValueChange={handlePlanChange}>
//         <SelectTrigger className="w-[150px]"><SelectValue placeholder="Plan" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All terms</SelectItem>
//           <SelectItem value="Full">TERM I</SelectItem>
//           <SelectItem value="Monthly">TWO TERMS SIGN UP - 10% discount</SelectItem>
//           <SelectItem value="Seasonal">THREE TERMS SIGN UPS - 15% discount</SelectItem>
//         </SelectContent>
//       </Select>

//       <Select value={weekFilter} onValueChange={setWeekFilter}>
//         <SelectTrigger className="w-[140px]"><SelectValue placeholder="Week" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All WEEKS</SelectItem>
//           {weekOptions.map((w) => (
//             <SelectItem key={w} value={w}>{w}</SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Select value={typeFilter} onValueChange={setTypeFilter}>
//         <SelectTrigger className="w-[170px]"><SelectValue placeholder="Type" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All TYPES</SelectItem>
//           <SelectItem value="AS_NO_KIT">AS (WITHOUT KIT)</SelectItem>
//           <SelectItem value="AS_KIT">AS (WITH KIT)</SelectItem>
//           <SelectItem value="JS3">JS x 3</SelectItem>
//           <SelectItem value="JS4">JS x 4</SelectItem>
//         </SelectContent>
//       </Select>

//       <Select value={ageGroupFilter} onValueChange={setAgeGroupFilter}>
//         <SelectTrigger className="w-[190px]"><SelectValue placeholder="Age Group" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All AGE GROUPS</SelectItem>
//           <SelectItem value="U6-U18-2">U6-U18 - 2 Sessions</SelectItem>
//           <SelectItem value="U8-Girls-3">U8 Girls - 3 Sessions</SelectItem>
//           <SelectItem value="U10-U18-4">U10-U18 - 4 Sessions</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   );

//   return (
//     <>
//       <PageHeader title="Payment Plans" />
//       <div className="space-y-6 p-6">
//         {/* <div className="grid gap-4 md:grid-cols-3">
//           <PlanCard
//             title="Full Payment"
//             subtitle="One-time"
//             icon={Coins}
//             metric={`${fullPlan.length} participants`}
//             secondary={`Avg fee ${SAR(fullAvg)}`}
//             onClick={() => setPlanFilter("Full")}
//             active={planFilter === "Full"}
//           />
//           <PlanCard
//             title="Monthly Instalments"
//             subtitle="Recurring"
//             icon={CalendarClock}
//             metric={`${monthly.length} participants`}
//             secondary={`Expected ${SAR(monthlyExpected)}`}
//             onClick={() => setPlanFilter("Monthly")}
//             active={planFilter === "Monthly"}
//           />
//           <PlanCard
//             title="Seasonal Payments"
//             subtitle="Per season"
//             icon={CalendarDays}
//             metric={`${seasonal.length} participants`}
//             secondary={`Next batch ${nextSeasonalDate}`}
//             onClick={() => setPlanFilter("Seasonal")}
//             active={planFilter === "Seasonal"}
//           />
//         </div> */}

//         <DataTable
//           data={filtered}
//           columns={columns}
//           // searchKeys={["participantName"]}
//           // searchPlaceholder="Search participants…"
//           filters={filters}
//         />
//       </div>
//     </>
//   );
// }

// function PlanCard({
//   title, subtitle, icon: Icon, metric, secondary, onClick, active,
// }: {
//   title: string; subtitle: string; icon: typeof Coins;
//   metric: string; secondary: string; onClick: () => void; active: boolean;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         "rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md",
//         active && "ring-2 ring-brand"
//       )}
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{subtitle}</p>
//           <h3 className="mt-1 text-lg font-semibold">{title}</h3>
//         </div>
//         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
//           <Icon className="h-5 w-5" />
//         </div>
//       </div>
//       <p className="mt-4 text-2xl font-bold">{metric}</p>
//       <p className="mt-1 text-xs text-muted-foreground">{secondary}</p>
//     </button>
//   );
// }

















// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { CalendarDays, Tag, Users } from "lucide-react";
// import { PageHeader } from "@/components/PageHeader";
// import { DataTable, type Column } from "@/components/DataTable";
// import { StatusBadge } from "@/components/StatusBadge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   mockPayments,
//   type MockPayment,
//   type SignupPlan,
//   type ProgramType,
// } from "@/data/mockPayments";
// import { cn } from "@/lib/utils";

// export const Route = createFileRoute("/finance/plans")({
//   component: PlansPage,
// });

// const SAR = (n: number) =>
//   `SAR ${Math.round(n).toLocaleString("en-SA")}`;

// function PlansPage() {
//   const [planFilter, setPlanFilter] = useState<string>("all");
//   const [programFilter, setProgramFilter] = useState<string>("all");

//   const byPlan = (plan: SignupPlan) =>
//     mockPayments.filter((p) => p.plan === plan);

//   const oneTerm = byPlan("1 Term");
//   const twoTerms = byPlan("2 Terms");
//   const threeTerms = byPlan("3 Terms");

//   const oneTermPending = oneTerm.reduce((a, p) => a + p.balance, 0);
//   const twoTermsSaving = twoTerms.reduce(
//     (a, p) => a + (p.totalFee * 0.1) / 0.9,
//     0
//   );
//   const threeTermsEnrolled = threeTerms.length;

//   const filtered = useMemo(
//     () =>
//       mockPayments.filter(
//         (p) =>
//           (planFilter === "all" || p.plan === planFilter) &&
//           (programFilter === "all" || p.programType === programFilter)
//       ),
//     [planFilter, programFilter]
//   );

//   const columns: Column<MockPayment>[] = [
//     { key: "participantName", header: "Participant", sortable: true },
//     {
//       key: "programType",
//       header: "Programme",
//       render: (r) => (
//         <span className="font-medium text-brand">{r.programType}</span>
//       ),
//     },
//     { key: "ageGroup", header: "Age Group" },
//     {
//       key: "plan",
//       header: "Sign-up Plan",
//       render: (r) => (
//         <span
//           className={cn(
//             "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
//             r.plan === "1 Term" && "bg-slate-100 text-slate-700",
//             r.plan === "2 Terms" && "bg-blue-100 text-blue-700",
//             r.plan === "3 Terms" && "bg-emerald-100 text-emerald-700"
//           )}
//         >
//           {r.plan}
//           {r.discount !== "None" && (
//             <span className="ml-1 opacity-70">({r.discount} off)</span>
//           )}
//         </span>
//       ),
//     },
//     {
//       key: "weeksRemaining",
//       header: "Weeks",
//       render: (r) => `${r.weeksRemaining} wks`,
//     },
//     {
//       key: "totalFee",
//       header: "Total Fee (SAR)",
//       sortable: true,
//       render: (r) => SAR(r.totalFee),
//     },
//     {
//       key: "balance",
//       header: "Balance Due",
//       render: (r) =>
//         r.balance > 0 ? (
//           <span className="font-semibold text-destructive">
//             {SAR(r.balance)}
//           </span>
//         ) : (
//           <span className="text-emerald-600 font-semibold">Cleared</span>
//         ),
//     },
//     { key: "nextDueDate", header: "Next Due" },
//     {
//       key: "status",
//       header: "Status",
//       render: (r) => (
//         <StatusBadge
//           status={r.status === "Partial" ? "Pending" : r.status}
//         />
//       ),
//     },
//   ];

//   const programTypes: ProgramType[] = [
//     "AS (without Kit)",
//     "AS (with Kit)",
//     "JS x 3",
//     "JS x 4",
//   ];

//   const filters = (
//     <div className="flex gap-2">
//       <Select value={programFilter} onValueChange={setProgramFilter}>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Programme" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Programmes</SelectItem>
//           {programTypes.map((pt) => (
//             <SelectItem key={pt} value={pt}>
//               {pt}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Select value={planFilter} onValueChange={setPlanFilter}>
//         <SelectTrigger className="w-[160px]">
//           <SelectValue placeholder="Sign-up Plan" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Plans</SelectItem>
//           <SelectItem value="1 Term">1 Term</SelectItem>
//           <SelectItem value="2 Terms">2 Terms (10% off)</SelectItem>
//           <SelectItem value="3 Terms">3 Terms (15% off)</SelectItem>
//         </SelectContent>
//       </Select>
//     </div>
//   );

//   return (
//     <>
//       <PageHeader title="Payment Plans — KSA 2025-26" />
//       <div className="space-y-6 p-6">
//         {/* Summary Cards */}
//         <div className="grid gap-4 md:grid-cols-3">
//           <PlanCard
//             title="1 Term Sign-up"
//             subtitle="No discount"
//             badge={null}
//             icon={CalendarDays}
//             metric={`${oneTerm.length} participants`}
//             secondary={`Outstanding: ${SAR(oneTermPending)}`}
//             onClick={() =>
//               setPlanFilter(planFilter === "1 Term" ? "all" : "1 Term")
//             }
//             active={planFilter === "1 Term"}
//             accentClass="bg-slate-100 text-slate-600"
//           />
//           <PlanCard
//             title="2 Terms Sign-up"
//             subtitle="10% discount"
//             badge="10% OFF"
//             icon={Tag}
//             metric={`${twoTerms.length} participants`}
//             secondary={`Discount saved: ${SAR(twoTermsSaving)}`}
//             onClick={() =>
//               setPlanFilter(planFilter === "2 Terms" ? "all" : "2 Terms")
//             }
//             active={planFilter === "2 Terms"}
//             accentClass="bg-blue-100 text-blue-600"
//           />
//           <PlanCard
//             title="3 Terms Sign-up"
//             subtitle="15% discount"
//             badge="15% OFF"
//             icon={Users}
//             metric={`${threeTermsEnrolled} participants`}
//             secondary="Best value — full year"
//             onClick={() =>
//               setPlanFilter(planFilter === "3 Terms" ? "all" : "3 Terms")
//             }
//             active={planFilter === "3 Terms"}
//             accentClass="bg-emerald-100 text-emerald-600"
//           />
//         </div>

//         {/* Pricing reference strip */}
//         <div className="rounded-xl border bg-muted/40 px-5 py-4">
//           <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
//             Base Fees (SAR) — Term I, 12 Weeks
//           </p>
//           <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
//             {(
//               [
//                 ["AS (without Kit)", 2484],
//                 ["AS (with Kit)", 3059],
//                 ["JS x 3", 3335],
//                 ["JS x 4", 4255],
//               ] as [string, number][]
//             ).map(([label, fee]) => (
//               <div key={label} className="rounded-lg bg-background border px-3 py-2">
//                 <p className="text-xs text-muted-foreground">{label}</p>
//                 <p className="text-base font-bold mt-0.5">{SAR(fee)}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Participants Table */}
//         <DataTable
//           data={filtered}
//           columns={columns}
//           searchKeys={["participantName", "ageGroup"]}
//           searchPlaceholder="Search participants or age group…"
//           filters={filters}
//         />
//       </div>
//     </>
//   );
// }

// function PlanCard({
//   title,
//   subtitle,
//   badge,
//   icon: Icon,
//   metric,
//   secondary,
//   onClick,
//   active,
//   accentClass,
// }: {
//   title: string;
//   subtitle: string;
//   badge: string | null;
//   icon: typeof CalendarDays;
//   metric: string;
//   secondary: string;
//   onClick: () => void;
//   active: boolean;
//   accentClass: string;
// }) {
//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         "rounded-xl border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md",
//         active && "ring-2 ring-brand"
//       )}
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
//             {subtitle}
//           </p>
//           <h3 className="mt-1 text-lg font-semibold">{title}</h3>
//         </div>
//         <div
//           className={cn(
//             "flex h-10 w-10 items-center justify-center rounded-lg",
//             accentClass
//           )}
//         >
//           <Icon className="h-5 w-5" />
//         </div>
//       </div>
//       {badge && (
//         <span
//           className={cn(
//             "mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-bold",
//             accentClass
//           )}
//         >
//           {badge}
//         </span>
//       )}
//       <p className="mt-3 text-2xl font-bold">{metric}</p>
//       <p className="mt-1 text-xs text-muted-foreground">{secondary}</p>
//     </button>
//   );
// }


import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  pricingData,
  type PricingRow,
  type PaymentPlan,
  type ProgramType,
  type AgeGroup,
} from "@/data/pricingData";

export const Route = createFileRoute("/finance/plans")({
  component: PlansPage,
});

const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

function PlansPage() {
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [weekFilter, setWeekFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>("all");

  // Selected plan ke hisaab se week range decide karna
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

  // Plan badalte hi week filter reset karo
  const handlePlanChange = (value: string) => {
    setPlanFilter(value);
    setWeekFilter("all");
  };

  // Selected type ke hisaab se age group options
  const ageGroupOptions: AgeGroup[] = useMemo(() => {
    const source =
      typeFilter === "all"
        ? pricingData
        : pricingData.filter((p) => p.type === (typeFilter as ProgramType));
    return Array.from(new Set(source.map((p) => p.ageGroup)));
  }, [typeFilter]);

  const filtered = useMemo(
    () =>
      pricingData.filter((p) => {
        if (planFilter !== "all" && p.plan !== (planFilter as PaymentPlan)) return false;
        if (weekFilter !== "all" && p.week !== weekFilter) return false;
        if (typeFilter !== "all" && p.type !== (typeFilter as ProgramType)) return false;
        if (ageGroupFilter !== "all" && p.ageGroup !== (ageGroupFilter as AgeGroup)) return false;
        return true;
      }),
    [planFilter, weekFilter, typeFilter, ageGroupFilter],
  );

  const columns: Column<PricingRow>[] = [
    { key: "planLabel", header: "Term / Plan", sortable: true },
    { key: "week", header: "Week", sortable: true },
    // { key: "weeksRemaining", header: "Weeks Remaining" },
    { key: "type", header: "Type" },
    { key: "ageGroup", header: "Age Group" },
    { key: "fee", header: "Fee", sortable: true, render: (r) => SAR(r.fee) },
  ];

  const filters = (
    <div className="flex flex-wrap gap-2">
      <Select value={planFilter} onValueChange={handlePlanChange}>
        <SelectTrigger className="w-[220px]"><SelectValue placeholder="Plan" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All terms</SelectItem>
          <SelectItem value="Full">TERM I</SelectItem>
          <SelectItem value="Monthly">TWO TERMS SIGN UP - 10% discount</SelectItem>
          <SelectItem value="Seasonal">THREE TERMS SIGN UPS - 15% discount</SelectItem>
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
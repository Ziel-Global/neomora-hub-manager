// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { toast } from "sonner";
// import { Download, Eye, Send, Plus } from "lucide-react";
// import { PageHeader } from "@/components/PageHeader";
// import { DataTable, type Column } from "@/components/DataTable";
// import { StatusBadge } from "@/components/StatusBadge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/components/ui/select";
// import {
//   Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
// } from "@/components/ui/sheet";
// import {
//   Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
// } from "@/components/ui/dialog";
// import { mockPayments, type MockPayment } from "@/data/mockPayments";
// import { mockLocations } from "@/data/mockLocations";
// import { mockSessions } from "@/data/mockSessions";
// export const Route = createFileRoute("/finance/collection")({
//   component: CollectionPage,
// });

// const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

// function CollectionPage() {
//   const [locFilter, setLocFilter] = useState("all");
//   const [sesFilter, setSesFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [planFilter, setPlanFilter] = useState("all");
//   const [selected, setSelected] = useState<MockPayment | null>(null);
//   const [recordOpen, setRecordOpen] = useState(false);
//   const [globalRecord, setGlobalRecord] = useState(false);
//   const [participantQuery, setParticipantQuery] = useState("");

//   const filtered = useMemo(() => mockPayments.filter((p) => {
//     if (locFilter !== "all" && p.location !== locFilter) return false;
//     if (sesFilter !== "all" && p.session !== sesFilter) return false;
//     if (planFilter !== "all" && p.plan !== planFilter) return false;
//     if (statusFilter !== "all" && p.status !== statusFilter) return false;
//     return true;
//   }), [locFilter, sesFilter, planFilter, statusFilter]);

//   const columns: Column<MockPayment>[] = [
//     {
//       key: "participantName", header: "Participant", sortable: true,
//       render: (r) => (
//         <button className="text-left font-medium hover:underline" onClick={() => setSelected(r)}>{r.participantName}</button>
//       )
//     },
//     { key: "location", header: "Age" },
//     { key: "session", header: "AS Paid" },
//     { key: "plan", header: "JS Paid" },
//     { key: "totalFee", header: "Sign Up", render: (r) => SAR(r.totalFee) },
//     { key: "paidAmount", header: "VAT", render: (r) => SAR(r.paidAmount) },
//     { key: "balance", header: "Total", render: (r) => SAR(r.balance) },
//     { key: "status", header: "Date Paid", render: (r) => <StatusBadge status={r.status === "Partial" ? "Pending" : r.status} /> },
//     {
//       key: "actions", header: "Bank Ref",
//       render: (r) => (
//         <div className="flex gap-1">
//           <Button variant="ghost" size="icon" onClick={() => setSelected(r)} title="View"><Eye className="h-4 w-4" /></Button>
//           <Button variant="ghost" size="icon" title="Send Reminder"
//             onClick={() => toast.success(`Reminder sent to ${r.participantName} via WhatsApp and Email`)}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const participantMatches = mockPayments.filter((p) =>
//     p.participantName.toLowerCase().includes(participantQuery.toLowerCase())
//   ).slice(0, 6);

//   const filters = (
//     <>
//     <Select value={locFilter} onValueChange={setLocFilter}>
//         <SelectTrigger className="w-[140px]"><SelectValue placeholder="Location" /></SelectTrigger>
//         <SelectContent>
//           {/* {mockLocations.map((l) => <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>)} */}
//                     <SelectItem value="all">All locations</SelectItem>
//                                         <SelectItem value="Jeddah">JEDDAH</SelectItem>
//                     <SelectItem value="Riyadh">RIYADH</SelectItem>


//         </SelectContent>
//       </Select>
//       <Select value={locFilter} onValueChange={setLocFilter}>
//         <SelectTrigger className="w-[140px]"><SelectValue placeholder="Year" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">Year</SelectItem>
//           {/* {mockLocations.map((l) => <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>)} */}
//           <SelectItem value="2025">2025</SelectItem>
//           <SelectItem value="2026">2026</SelectItem>
//         </SelectContent>
//       </Select>
//       <Select value={sesFilter} onValueChange={setSesFilter}>
//         <SelectTrigger className="w-[150px]"><SelectValue placeholder="Session" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All</SelectItem>
//           {/* {mockSessions.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)} */}
//           <SelectItem value="AS">AS Paid</SelectItem>
//           <SelectItem value="JS">JS Paid</SelectItem>
//           <SelectItem value="signup">Sign Up</SelectItem>
//           <SelectItem value="vat">VAT</SelectItem>
//         </SelectContent>
//       </Select>

//       {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
//         <SelectTrigger className="w-[120px]"><SelectValue placeholder="Status" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Status</SelectItem>
//           <SelectItem value="Paid">Paid</SelectItem>
//           <SelectItem value="Partial">Partial</SelectItem>
//           <SelectItem value="Overdue">Overdue</SelectItem>
//           <SelectItem value="Pending">Pending</SelectItem>
//         </SelectContent>
//       </Select> */}
//       {/* <Select value={planFilter} onValueChange={setPlanFilter}>
//         <SelectTrigger className="w-[110px]"><SelectValue placeholder="Plan" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Plans</SelectItem>
//           <SelectItem value="Full">Full</SelectItem>
//           <SelectItem value="Monthly">Monthly</SelectItem>
//           <SelectItem value="Seasonal">Seasonal</SelectItem>
//         </SelectContent>
//       </Select> */}
//     </>
//   );

//   return (
//     <>
//       <PageHeader
//         title="Fee Collection"
//         actions={
//           <div className="flex gap-2">
//             <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
//             <Button onClick={() => setGlobalRecord(true)} className="bg-brand text-brand-foreground hover:bg-brand/90">
//               <Plus className="mr-2 h-4 w-4" /> Record Payment
//             </Button>
//           </div>
//         }
//       />




// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-[15px]  px-6 ">
//   {/* Card 1 */}

// <div className="bg-white rounded-xl  p-5 shadow-sm">
//     <p className="text-sm text-gray-500">Total</p>
//     <h2 className="text-3xl font-bold text-gray-900 mt-2">$49,030</h2>
//   </div>

//   {/* Card 2 */}
//   <div className="bg-white rounded-xl  p-5 shadow-sm">
//     <p className="text-sm text-gray-500">Total JS Paid</p>
//     <h2 className="text-3xl font-bold text-gray-900 mt-2">$18,720</h2>
//   </div>

//   {/* Card 3 */}
//   <div className="bg-white rounded-xl  p-5 shadow-sm">
//     <p className="text-sm text-gray-500">Total Sign Up</p>
//     <h2 className="text-3xl font-bold text-gray-900 mt-2">1,248</h2>
//   </div>

//   {/* Card 4 */}
//   <div className="bg-white rounded-xl  p-5 shadow-sm">
//     <p className="text-sm text-gray-500">Total VAT</p>
//     <h2 className="text-3xl font-bold text-gray-900 mt-2">$4,860</h2>
//   </div>

//   {/* Card 5 */}
//   <div className="bg-white rounded-xl  p-5 shadow-sm">
//     <p className="text-sm text-gray-500">Total AS Paid</p>
//     <h2 className="text-3xl font-bold text-gray-900 mt-2">$25,450</h2>
//   </div>
// </div>














//       <div className="space-y-6 p-6">
//         <DataTable
//           data={filtered}
//           columns={columns}
//           searchKeys={["participantName"]}
//           searchPlaceholder="Search payments…"
//           filters={filters}
//         />
//       </div>

//       {/* Participant detail drawer */}
//       <Sheet open={!!selected} onOpenChange={(o) => !o && (setSelected(null), setRecordOpen(false))}>
//         <SheetContent className="w-full sm:max-w-xl">
//           {selected && (
//             <>
//               <SheetHeader>
//                 <SheetTitle>{selected.participantName}</SheetTitle>
//                 <SheetDescription>{selected.session} • {selected.location}</SheetDescription>
//               </SheetHeader>
//               <div className="space-y-5 px-4 pb-6">
//                 <div className="grid grid-cols-3 gap-3 text-sm">
//                   <Info label="Total" value={SAR(selected.totalFee)} />
//                   <Info label="Paid" value={SAR(selected.paidAmount)} />
//                   <Info label="Balance" value={SAR(selected.balance)} />
//                   <Info label="Plan" value={selected.plan} />
//                   <Info label="Status" value={<StatusBadge status={selected.status === "Partial" ? "Pending" : selected.status} />} />
//                   <Info label="Next Due" value={selected.nextDueDate} />
//                 </div>

//                 <div>
//                   <h4 className="mb-2 text-sm font-semibold">Invoice history</h4>
//                   {selected.invoices.length === 0 ? (
//                     <p className="text-sm text-muted-foreground">No invoices yet.</p>
//                   ) : (
//                     <ul className="divide-y rounded-md border">
//                       {selected.invoices.map((inv) => (
//                         <li key={inv.id} className="flex items-center justify-between px-3 py-2 text-sm">
//                           <div>
//                             <p className="font-medium">{inv.id}</p>
//                             <p className="text-xs text-muted-foreground">{inv.date} • {inv.method}</p>
//                           </div>
//                           <span>{SAR(inv.amount)}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>

//                 {!recordOpen ? (
//                   <Button onClick={() => setRecordOpen(true)} className="w-full">Record Payment</Button>
//                 ) : (
//                   <form
//                     className="space-y-3 rounded-lg border p-4"
//                     onSubmit={(e) => { e.preventDefault(); setRecordOpen(false); toast.success("Payment recorded"); }}
//                   >
//                     <h4 className="text-sm font-semibold">Record Payment</h4>
//                     <div className="grid grid-cols-2 gap-3">
//                       <Field label="Amount (SAR)"><Input type="number" placeholder="0" /></Field>
//                       <Field label="Date"><Input type="date" /></Field>
//                     </div>
//                     <Field label="Method">
//                       <Select defaultValue="Card">
//                         <SelectTrigger><SelectValue /></SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="Card">Card</SelectItem>
//                           <SelectItem value="Cash">Cash</SelectItem>
//                           <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </Field>
//                     <Field label="Upload Proof"><Input type="file" /></Field>
//                     <SheetFooter>
//                       <Button type="button" variant="outline" onClick={() => setRecordOpen(false)}>Cancel</Button>
//                       <Button type="submit">Save Payment</Button>
//                     </SheetFooter>
//                   </form>
//                 )}
//               </div>
//             </>
//           )}
//         </SheetContent>
//       </Sheet>

//       {/* Global record dialog */}
//       <Dialog open={globalRecord} onOpenChange={setGlobalRecord}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Record New Payment</DialogTitle>
//           </DialogHeader>
//           <form
//             className="space-y-3"
//             onSubmit={(e) => { e.preventDefault(); setGlobalRecord(false); setParticipantQuery(""); toast.success("Payment recorded"); }}
//           >
//             <Field label="EnrolmentID">
//               <Input placeholder="EnrolmentID" />
//               {/* {participantQuery && (
//                 <ul className="mt-1 max-h-40 overflow-y-auto rounded-md border bg-popover text-sm">
//                   {participantMatches.map((p) => (
//                     <li key={p.id}>
//                       <button type="button" className="block w-full px-3 py-1.5 text-left hover:bg-muted"
//                         onClick={() => setParticipantQuery(p.participantName)}>
//                         {p.participantName} <span className="text-xs text-muted-foreground">• {p.session}</span>
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               )} */}
//             </Field>
//             <Field label="InvoiceID"><Input placeholder="InvoiceID"></Input></Field>
//             {/* <div className="grid grid-cols-2 gap-3"> */}
//             <Field label="Amount (SAR)"><Input type="number" placeholder="0" /></Field>
//             {/* <Field label="Date"><Input type="date" /></Field> */}
//             {/* </div> */}
//             <Field label="Method">
//               <Select defaultValue="Card">
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Card">Card</SelectItem>
//                   <SelectItem value="Cash">Cash</SelectItem>
//                   <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
//                 </SelectContent>
//               </Select>
//             </Field>
//             <Field label="Upload Proof"><Input type="file" /></Field>
//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={() => setGlobalRecord(false)}>Cancel</Button>
//               <Button type="submit">Save Payment</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
// }
// function Info({ label, value }: { label: string; value: React.ReactNode }) {
//   return (
//     <div className="rounded-md bg-muted/30 p-2.5">
//       <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
//       <p className="mt-0.5 text-sm font-medium">{value}</p>
//     </div>
//   );
// }











import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Download, Eye, Send, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { mockCollectionPayments as mockPayments, type MockCollectionPayment as MockPayment } from "@/data/mockPayments";

export const Route = createFileRoute("/finance/collection")({
  component: CollectionPage,
});

const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

function CollectionPage() {
  const [locFilter, setLocFilter] = useState("all");
  const [termFilter, setTermFilter] = useState("all");
  const [selected, setSelected] = useState<MockPayment | null>(null);
  const [recordOpen, setRecordOpen] = useState(false);
  const [globalRecord, setGlobalRecord] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const filtered = useMemo(() => mockPayments.filter((p) => {
    if (locFilter !== "all" && p.location !== locFilter) return false;
    if (termFilter !== "all" && p.term !== termFilter) return false;
    return true;
  }), [locFilter, termFilter]);

  // Reset to first page whenever the filtered dataset changes
  useEffect(() => { setPage(1); }, [locFilter, termFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Summary totals across the filtered dataset
  const totals = useMemo(() => filtered.reduce(
    (acc, p) => {
      acc.signUp += p.signUp;
      acc.jsPaid += p.jsPaid;
      acc.asPaid += p.asPaid;
      acc.vat += p.vat;
      acc.total += p.total;
      acc.count += 1;
      return acc;
    },
    { signUp: 0, jsPaid: 0, asPaid: 0, vat: 0, total: 0, count: 0 }
  ), [filtered]);

  const columns: Column<MockPayment>[] = [
    {
      key: "participantName", header: "Participant", sortable: true,
      render: (r) => (
        <button className="text-left font-medium hover:underline" onClick={() => setSelected(r)}>{r.participantName}</button>
      )
    },
    { key: "age", header: "Age" },
    { key: "asPaid", header: "AS Paid", render: (r) => (r.asPaid ? SAR(r.asPaid) : "-") },
    { key: "jsPaid", header: "JS Paid", render: (r) => (r.jsPaid ? SAR(r.jsPaid) : "-") },
    { key: "signUp", header: "Sign Up", render: (r) => SAR(r.signUp) },
    { key: "vat", header: "VAT", render: (r) => SAR(r.vat) },
    { key: "total", header: "Total", render: (r) => SAR(r.total) },
    { key: "datePaid", header: "Date Paid", render: (r) => r.datePaid || "-" },
    { key: "bankRef", header: "Bank Ref", render: (r) => r.bankRef || "-" },
    {
      key: "actions", header: "",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => setSelected(r)} title="View"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" title="Send Reminder"
            onClick={() => toast.success(`Reminder sent to ${r.participantName} via WhatsApp and Email`)}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters = (
    <>
      <Select value={locFilter} onValueChange={setLocFilter}>
        <SelectTrigger className="w-[140px]"><SelectValue placeholder="Location" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All locations</SelectItem>
          <SelectItem value="Jeddah">JEDDAH</SelectItem>
          <SelectItem value="Riyadh">RIYADH</SelectItem>
        </SelectContent>
      </Select>
      <Select value={termFilter} onValueChange={setTermFilter}>
        <SelectTrigger className="w-[150px]"><SelectValue placeholder="Term" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Terms</SelectItem>
          <SelectItem value="Term 1">Term 1</SelectItem>
          <SelectItem value="Term 2">Term 2</SelectItem>
          <SelectItem value="Term 3">Term 3</SelectItem>
        </SelectContent>
      </Select>
    </>
  );

  return (
    <>
      <PageHeader
        title="Fee Collection"
        actions={
          <div className="flex gap-2">
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button onClick={() => setGlobalRecord(true)} className="bg-brand text-brand-foreground hover:bg-brand/90">
              <Plus className="mr-2 h-4 w-4" /> Record Payment
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-[15px] px-6">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Collected</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{SAR(totals.total)}</h2>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total JS Paid</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{SAR(totals.jsPaid)}</h2>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Sign Up</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{SAR(totals.signUp)}</h2>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total VAT</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{SAR(totals.vat)}</h2>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total AS Paid</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">{SAR(totals.asPaid)}</h2>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <DataTable
          data={paginated}
          columns={columns}
          searchKeys={["participantName"]}
          searchPlaceholder="Search payments…"
          filters={filters}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between px-1">
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Participant detail drawer */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && (setSelected(null), setRecordOpen(false))}>
        <SheetContent className="w-full sm:max-w-xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.participantName}</SheetTitle>
                <SheetDescription>{selected.term} • {selected.location}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <Info label="Age" value={selected.age} />
                  <Info label="AS Paid" value={selected.asPaid ? SAR(selected.asPaid) : "-"} />
                  <Info label="JS Paid" value={selected.jsPaid ? SAR(selected.jsPaid) : "-"} />
                  <Info label="Sign Up" value={SAR(selected.signUp)} />
                  <Info label="VAT" value={SAR(selected.vat)} />
                  <Info label="Total" value={SAR(selected.total)} />
                  <Info label="Date Paid" value={selected.datePaid || "-"} />
                  <Info label="Bank Ref" value={selected.bankRef || "-"} />
                </div>

                {!recordOpen ? (
                  <Button onClick={() => setRecordOpen(true)} className="w-full">Record Payment</Button>
                ) : (
                  <form
                    className="space-y-3 rounded-lg border p-4"
                    onSubmit={(e) => { e.preventDefault(); setRecordOpen(false); toast.success("Payment recorded"); }}
                  >
                    <h4 className="text-sm font-semibold">Record Payment</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Amount (SAR)"><Input type="number" placeholder="0" /></Field>
                      <Field label="Date"><Input type="date" /></Field>
                    </div>
                    <Field label="Method">
                      <Select defaultValue="Card">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Card">Card</SelectItem>
                          <SelectItem value="Cash">Cash</SelectItem>
                          <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Upload Proof"><Input type="file" /></Field>
                    <SheetFooter>
                      <Button type="button" variant="outline" onClick={() => setRecordOpen(false)}>Cancel</Button>
                      <Button type="submit">Save Payment</Button>
                    </SheetFooter>
                  </form>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Global record dialog */}
      <Dialog open={globalRecord} onOpenChange={setGlobalRecord}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record New Payment</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-3"
            onSubmit={(e) => { e.preventDefault(); setGlobalRecord(false); toast.success("Payment recorded"); }}
          >
            <Field label="EnrolmentID">
              <Input placeholder="EnrolmentID" />
            </Field>
            <Field label="InvoiceID"><Input placeholder="InvoiceID" /></Field>
            <Field label="Amount (SAR)"><Input type="number" placeholder="0" /></Field>
            <Field label="Method">
              <Select defaultValue="Card">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Upload Proof"><Input type="file" /></Field>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setGlobalRecord(false)}>Cancel</Button>
              <Button type="submit">Save Payment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
}
function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md bg-muted/30 p-2.5">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-medium">{value}</p>
    </div>
  );
}


























// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { toast } from "sonner";
// import { Download, Eye, Send, Plus, ChevronDown } from "lucide-react";
// import { PageHeader } from "@/components/PageHeader";
// import { DataTable, type Column } from "@/components/DataTable";
// import { StatusBadge } from "@/components/StatusBadge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/components/ui/select";
// import {
//   Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
// } from "@/components/ui/sheet";
// import {
//   Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { Textarea } from "@/components/ui/textarea";

// // ─── Types ────────────────────────────────────────────────────────────────────

// export type TermPayment = {
//   enrolled: boolean;       // is the student registered for this term?
//   paid: boolean;           // has payment been received?
//   amount: number;          // SAR amount due/paid for this term
//   datePaid?: string;       // "2025-09-04"
//   bankRef?: string;        // "LP IPSP2300..." raw bank reference string
//   creditAmount?: number;   // actual amount credited by bank (may differ from fee)
//   method?: "Bank Transfer" | "Card" | "Cash";
// };

// export type MockPayment = {
//   id: string;
//   // ── Participant ────────────────────────────────────────────────────────────
//   participantName: string;
//   dob: string;                           // "2017-08-10"
//   contactNumbers: string[];              // ["055 325 5905", "0044 7738 065438"]
//   // ── Enrolment ─────────────────────────────────────────────────────────────
//   location: "Riyadh" | "Jeddah";
//   day: string;                           // "Sunday"
//   timeSlot: string;                      // "4:30 – 5:30 PM"
//   pitch: string;                         // "Pitch 1"
//   ageGroup: string;                      // "U8" | "U10" | "JS 2015" …
//   programType: "AS without Kit" | "AS with Kit" | "JS ×3" | "JS ×4";
//   kitIncluded: boolean;
//   joinWeek: number;                      // 1–12; used for pro-rata calculation
//   signUpTerms: 1 | 2 | 3;              // determines discount tier
//   status: "Active" | "Waiting" | "Break" | "Left";
//   comment?: string;                      // "With Kit Break for T2", "joining Al Hilal"
//   // ── Finance ───────────────────────────────────────────────────────────────
//   siblingDiscount: boolean;              // 15% off
//   totalFee: number;                      // computed: pro-rata × discount
//   t1: TermPayment;
//   t2: TermPayment;
//   t3: TermPayment;
// };

// // ─── Helpers ─────────────────────────────────────────────────────────────────

// const SAR = (n: number) =>
//   `SAR ${n.toLocaleString("en-SA", { minimumFractionDigits: 0 })}`;

// /** Pro-rata fee per term based on pricing sheet formulas */
// function computeTermFee(
//   programType: MockPayment["programType"],
//   weeksRemaining: number,
//   siblingDiscount: boolean,
//   signUpTerms: 1 | 2 | 3,
// ): number {
//   const RATES: Record<MockPayment["programType"], number> = {
//     "AS without Kit": 180,
//     "AS with Kit": 180,   // kit (575 SAR) added separately
//     "JS ×3": 200,
//     "JS ×4": 250,
//   };
//   const KIT_FEE = programType === "AS with Kit" ? 575 : 0;
//   const MULTI_TERM_DISCOUNT = signUpTerms === 3 ? 0.85 : signUpTerms === 2 ? 0.9 : 1;
//   const SIBLING_FACTOR = siblingDiscount ? 0.85 : 1;
//   const VAT = 1.15;

//   const base = RATES[programType] * weeksRemaining * VAT * MULTI_TERM_DISCOUNT * SIBLING_FACTOR;
//   return Math.round(base + KIT_FEE);
// }

// /** Aggregate payment status across T1–T3 */
// function overallStatus(p: MockPayment): "Paid" | "Partial" | "Pending" | "Overdue" {
//   const terms = [p.t1, p.t2, p.t3].filter((t) => t.enrolled);
//   if (terms.length === 0) return "Pending";
//   const allPaid = terms.every((t) => t.paid);
//   const nonePaid = terms.every((t) => !t.paid);
//   if (allPaid) return "Paid";
//   if (nonePaid) return "Overdue";
//   return "Partial";
// }

// const TERM_LABELS: { key: "t1" | "t2" | "t3"; label: string; dates: string }[] = [
//   { key: "t1", label: "T1", dates: "31 Aug – 22 Nov 2025" },
//   { key: "t2", label: "T2", dates: "23 Nov 2025 – 28 Feb 2026" },
//   { key: "t3", label: "T3", dates: "1 Mar – Apr 2026" },
// ];

// // ─── Mock data (matches actual register structure) ────────────────────────────

// const mockPayments: MockPayment[] = [
//   {
//     id: "RIY-001",
//     participantName: "Miguel Proenca Parente",
//     dob: "2018-02-05",
//     contactNumbers: ["054 812 8734"],
//     location: "Riyadh",
//     day: "Sunday",
//     timeSlot: "4:30 – 5:30 PM",
//     pitch: "Pitch 1",
//     ageGroup: "U8",
//     programType: "AS with Kit",
//     kitIncluded: true,
//     joinWeek: 1,
//     signUpTerms: 3,
//     status: "Active",
//     comment: "With Kit",
//     siblingDiscount: false,
//     totalFee: 6909,
//     t1: { enrolled: true, paid: true, amount: 2484, datePaid: "2025-09-01", bankRef: "LP IPSP2500AABC Proenca Saudi National Bank JEDDAH", creditAmount: 2484, method: "Bank Transfer" },
//     t2: { enrolled: true, paid: true, amount: 2484, datePaid: "2025-11-25", method: "Card" },
//     t3: { enrolled: true, paid: false, amount: 2484 },
//   },
//   {
//     id: "RIY-002",
//     participantName: "Muhammad Yousuf Ali",
//     dob: "2017-08-10",
//     contactNumbers: ["055 325 5905", "0044 7738 065438"],
//     location: "Riyadh",
//     day: "Sunday",
//     timeSlot: "4:30 – 5:30 PM",
//     pitch: "Pitch 1",
//     ageGroup: "U8",
//     programType: "AS with Kit",
//     kitIncluded: true,
//     joinWeek: 3,
//     signUpTerms: 1,
//     status: "Active",
//     comment: "With Kit",
//     siblingDiscount: false,
//     totalFee: 2645,
//     t1: { enrolled: true, paid: true, amount: 2645, datePaid: "2025-09-14", bankRef: "LP IPSP2500BDEF AlRajhi Bank RIYADH", creditAmount: 2645, method: "Bank Transfer" },
//     t2: { enrolled: false, paid: false, amount: 0 },
//     t3: { enrolled: false, paid: false, amount: 0 },
//   },
//   {
//     id: "RIY-003",
//     participantName: "Abraham Mousa Alkaltham",
//     dob: "2019-08-05",
//     contactNumbers: ["054 349 0588"],
//     location: "Riyadh",
//     day: "Monday",
//     timeSlot: "4:30 – 5:30 PM",
//     pitch: "Pitch 1",
//     ageGroup: "U4",
//     programType: "AS without Kit",
//     kitIncluded: false,
//     joinWeek: 1,
//     signUpTerms: 2,
//     status: "Break",
//     comment: "With Kit Break for T2",
//     siblingDiscount: true,
//     totalFee: 3912,
//     t1: { enrolled: true, paid: true, amount: 2070, datePaid: "2025-09-01", method: "Cash" },
//     t2: { enrolled: false, paid: false, amount: 0 },
//     t3: { enrolled: true, paid: false, amount: 1862 },
//   },
//   {
//     id: "JED-001",
//     participantName: "Oliver Thevenot",
//     dob: "2017-09-23",
//     contactNumbers: ["055 504 4826"],
//     location: "Jeddah",
//     day: "Sunday",
//     timeSlot: "4:15 – 5:15 PM",
//     pitch: "Pitch 1",
//     ageGroup: "U8",
//     programType: "AS with Kit",
//     kitIncluded: true,
//     joinWeek: 1,
//     signUpTerms: 3,
//     status: "Active",
//     comment: "With Kit",
//     siblingDiscount: false,
//     totalFee: 6909,
//     t1: { enrolled: true, paid: true, amount: 2484, datePaid: "2025-09-02", bankRef: "LP IPSP2500CXYZ Saudi National Bank JEDDAH", creditAmount: 2484, method: "Bank Transfer" },
//     t2: { enrolled: true, paid: false, amount: 2484 },
//     t3: { enrolled: true, paid: false, amount: 2484 },
//   },
//   {
//     id: "JED-002",
//     participantName: "Haydar Zahid",
//     dob: "2016-07-07",
//     contactNumbers: ["050 066 8383"],
//     location: "Jeddah",
//     day: "Thursday",
//     timeSlot: "5:30 – 6:45 PM",
//     pitch: "Pitch 2",
//     ageGroup: "JS 2016",
//     programType: "JS ×3",
//     kitIncluded: false,
//     joinWeek: 2,
//     signUpTerms: 2,
//     status: "Active",
//     comment: "With Kit",
//     siblingDiscount: true,
//     totalFee: 4785,
//     t1: { enrolled: true, paid: true, amount: 2530, datePaid: "2025-09-08", bankRef: "LP IPSP2500DWQR Riyad Bank RIYADH — Zahid Tractors TO SETTLE 1ST TERM FOOTB TFR", creditAmount: 5621, method: "Bank Transfer" },
//     t2: { enrolled: true, paid: true, amount: 2255, datePaid: "2025-11-28", method: "Card" },
//     t3: { enrolled: false, paid: false, amount: 0 },
//   },
// ];

// // ─── Route ────────────────────────────────────────────────────────────────────

// export const Route = createFileRoute("/finance/collection")({
//   component: CollectionPage,
// });

// // ─── Main page ────────────────────────────────────────────────────────────────

// function CollectionPage() {
//   const [locFilter, setLocFilter] = useState("all");
//   const [dayFilter, setDayFilter] = useState("all");
//   const [ageGroupFilter, setAgeGroupFilter] = useState("all");
//   const [termFilter, setTermFilter] = useState<"all" | "t1" | "t2" | "t3">("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selected, setSelected] = useState<MockPayment | null>(null);
//   const [globalRecord, setGlobalRecord] = useState(false);

//   const filtered = useMemo(() => mockPayments.filter((p) => {
//     if (locFilter !== "all" && p.location !== locFilter) return false;
//     if (dayFilter !== "all" && p.day !== dayFilter) return false;
//     if (ageGroupFilter !== "all" && p.ageGroup !== ageGroupFilter) return false;
//     if (termFilter !== "all" && !p[termFilter].enrolled) return false;
//     if (statusFilter !== "all" && overallStatus(p) !== statusFilter) return false;
//     return true;
//   }), [locFilter, dayFilter, ageGroupFilter, termFilter, statusFilter]);

//   // Summary stats
//   const totalDue = filtered.reduce((s, p) => s + p.totalFee, 0);
//   const totalCollected = filtered.reduce((s, p) =>
//     s + [p.t1, p.t2, p.t3].filter((t) => t.enrolled && t.paid).reduce((a, t) => a + t.amount, 0), 0);
//   const totalOutstanding = totalDue - totalCollected;

//   const columns: Column<MockPayment>[] = [
//     {
//       key: "participantName", header: "Participant", sortable: true,
//       render: (r) => (
//         <div>
//           <button className="text-left font-medium hover:underline" onClick={() => setSelected(r)}>
//             {r.participantName}
//           </button>
//           <p className="text-xs text-muted-foreground">{r.id} · {r.ageGroup}</p>
//         </div>
//       ),
//     },
//     {
//       key: "location", header: "Location / Session",
//       render: (r) => (
//         <div className="text-sm">
//           <span className={r.location === "Riyadh" ? "text-blue-600 font-medium" : "text-emerald-600 font-medium"}>
//             {r.location}
//           </span>
//           <p className="text-xs text-muted-foreground">{r.day} · {r.timeSlot} · {r.pitch}</p>
//         </div>
//       ),
//     },
//     {
//       key: "programType", header: "Programme",
//       render: (r) => (
//         <div className="text-sm">
//           <span>{r.programType}</span>
//           {r.siblingDiscount && (
//             <Badge variant="secondary" className="ml-1 text-[10px] px-1 py-0">Sibling</Badge>
//           )}
//           <p className="text-xs text-muted-foreground">
//             {r.signUpTerms === 1 ? "1 term" : r.signUpTerms === 2 ? "2 terms −10%" : "3 terms −15%"}
//             {" · "} Joined wk {r.joinWeek}
//           </p>
//         </div>
//       ),
//     },
//     {
//       key: "t1", header: "T1",
//       render: (r) => <TermCell term={r.t1} />,
//     },
//     {
//       key: "t2", header: "T2",
//       render: (r) => <TermCell term={r.t2} />,
//     },
//     {
//       key: "t3", header: "T3",
//       render: (r) => <TermCell term={r.t3} />,
//     },
//     {
//       key: "totalFee", header: "Total Fee",
//       render: (r) => <span className="font-medium tabular-nums">{SAR(r.totalFee)}</span>,
//     },
//     {
//       key: "status", header: "Status",
//       render: (r) => {
//         const s = overallStatus(r);
//         return (
//           <div className="space-y-1">
//             <StatusBadge status={s === "Partial" ? "Pending" : s} />
//             {r.status === "Break" && (
//               <Badge variant="outline" className="text-[10px] px-1 py-0 block w-fit">On break</Badge>
//             )}
//           </div>
//         );
//       },
//     },
//     {
//       key: "actions", header: "",
//       render: (r) => (
//         <div className="flex gap-1">
//           <Button variant="ghost" size="icon" onClick={() => setSelected(r)} title="View details">
//             <Eye className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost" size="icon" title="Send reminder"
//             onClick={() => {
//               const nums = r.contactNumbers.join(", ");
//               toast.success(`Reminder sent to ${r.participantName} (${nums})`);
//             }}
//           >
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const filters = (
//     <>
//       <Select value={locFilter} onValueChange={setLocFilter}>
//         <SelectTrigger className="w-[130px]"><SelectValue placeholder="Location" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All locations</SelectItem>
//           <SelectItem value="Riyadh">Riyadh</SelectItem>
//           <SelectItem value="Jeddah">Jeddah</SelectItem>
//         </SelectContent>
//       </Select>

//       <Select value={dayFilter} onValueChange={setDayFilter}>
//         <SelectTrigger className="w-[130px]"><SelectValue placeholder="Day" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All days</SelectItem>
//           {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"].map((d) => (
//             <SelectItem key={d} value={d}>{d}</SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Select value={ageGroupFilter} onValueChange={setAgeGroupFilter}>
//         <SelectTrigger className="w-[130px]"><SelectValue placeholder="Age group" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All groups</SelectItem>
//           {["U4", "U6", "U8", "U10", "U12", "U14", "JS 2011", "JS 2012", "JS 2013", "JS 2014", "JS 2015", "JS 2016"].map((g) => (
//             <SelectItem key={g} value={g}>{g}</SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       <Select value={termFilter} onValueChange={(v) => setTermFilter(v as typeof termFilter)}>
//         <SelectTrigger className="w-[100px]"><SelectValue placeholder="Term" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All terms</SelectItem>
//           <SelectItem value="t1">T1</SelectItem>
//           <SelectItem value="t2">T2</SelectItem>
//           <SelectItem value="t3">T3</SelectItem>
//         </SelectContent>
//       </Select>

//       <Select value={statusFilter} onValueChange={setStatusFilter}>
//         <SelectTrigger className="w-[120px]"><SelectValue placeholder="Status" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All status</SelectItem>
//           <SelectItem value="Paid">Paid</SelectItem>
//           <SelectItem value="Partial">Partial</SelectItem>
//           <SelectItem value="Overdue">Overdue</SelectItem>
//           <SelectItem value="Pending">Pending</SelectItem>
//         </SelectContent>
//       </Select>
//     </>
//   );

//   return (
//     <>
//       <PageHeader
//         title="Fee collection"
//         actions={
//           <div className="flex gap-2">
//             <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
//             <Button
//               onClick={() => setGlobalRecord(true)}
//               className="bg-brand text-brand-foreground hover:bg-brand/90"
//             >
//               <Plus className="mr-2 h-4 w-4" /> Record payment
//             </Button>
//           </div>
//         }
//       />

//       <div className="space-y-6 p-6">
//         {/* Summary strip */}
//         <div className="grid grid-cols-3 gap-4">
//           <SummaryCard label="Total invoiced" value={SAR(totalDue)} />
//           <SummaryCard label="Collected" value={SAR(totalCollected)} positive />
//           <SummaryCard label="Outstanding" value={SAR(totalOutstanding)} negative={totalOutstanding > 0} />
//         </div>

//         <DataTable
//           data={filtered}
//           columns={columns}
//           searchKeys={["participantName", "id"]}
//           searchPlaceholder="Search by name or ID…"
//           filters={filters}
//         />
//       </div>

//       {/* ── Participant detail drawer ───────────────────────────────────────── */}
//       <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
//         <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
//           {selected && <ParticipantDrawer p={selected} onClose={() => setSelected(null)} />}
//         </SheetContent>
//       </Sheet>

//       {/* ── Global record payment dialog ────────────────────────────────────── */}
//       <Dialog open={globalRecord} onOpenChange={setGlobalRecord}>
//         <DialogContent className="sm:max-w-md">
//           <DialogHeader>
//             <DialogTitle>Record payment</DialogTitle>
//           </DialogHeader>
//           <RecordPaymentForm
//             onCancel={() => setGlobalRecord(false)}
//             onSave={() => { setGlobalRecord(false); toast.success("Payment recorded"); }}
//           />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// // ─── Sub-components ───────────────────────────────────────────────────────────

// function TermCell({ term }: { term: TermPayment }) {
//   if (!term.enrolled) {
//     return <span className="text-xs text-muted-foreground">—</span>;
//   }
//   return (
//     <div className="text-xs space-y-0.5">
//       <span className={term.paid ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
//         {term.paid ? "✓ Paid" : "Unpaid"}
//       </span>
//       <p className="text-muted-foreground tabular-nums">{SAR(term.amount)}</p>
//       {term.datePaid && <p className="text-muted-foreground">{term.datePaid}</p>}
//     </div>
//   );
// }

// function SummaryCard({ label, value, positive, negative }: {
//   label: string; value: string; positive?: boolean; negative?: boolean;
// }) {
//   return (
//     <div className="rounded-lg border bg-muted/30 p-4">
//       <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
//       <p className={`text-xl font-semibold tabular-nums ${positive ? "text-emerald-600" : negative ? "text-amber-600" : ""}`}>
//         {value}
//       </p>
//     </div>
//   );
// }

// function ParticipantDrawer({ p, onClose }: { p: MockPayment; onClose: () => void }) {
//   const [recordingTerm, setRecordingTerm] = useState<"t1" | "t2" | "t3" | null>(null);

//   return (
//     <>
//       <SheetHeader className="px-6 pt-6 pb-4 border-b">
//         <SheetTitle>{p.participantName}</SheetTitle>
//         <SheetDescription>
//           {p.id} · {p.location} · {p.ageGroup} · DOB {p.dob}
//         </SheetDescription>
//       </SheetHeader>

//       <div className="space-y-6 px-6 py-5">

//         {/* Contact numbers */}
//         <Section title="Contact">
//           <div className="space-y-1">
//             {p.contactNumbers.map((n, i) => (
//               <p key={i} className="text-sm font-medium">{n}</p>
//             ))}
//           </div>
//         </Section>

//         {/* Session details */}
//         <Section title="Session">
//           <div className="grid grid-cols-2 gap-2 text-sm">
//             <Info label="Location" value={p.location} />
//             <Info label="Day" value={p.day} />
//             <Info label="Time" value={p.timeSlot} />
//             <Info label="Pitch" value={p.pitch} />
//             <Info label="Age group" value={p.ageGroup} />
//             <Info label="Status" value={p.status} />
//           </div>
//           {p.comment && (
//             <p className="mt-2 text-xs text-muted-foreground italic">{p.comment}</p>
//           )}
//         </Section>

//         {/* Programme & fee */}
//         <Section title="Programme & fees">
//           <div className="grid grid-cols-2 gap-2 text-sm">
//             <Info label="Programme" value={p.programType} />
//             <Info label="Kit" value={p.kitIncluded ? "Included" : "Not included"} />
//             <Info label="Joined" value={`Week ${p.joinWeek}`} />
//             <Info label="Terms enrolled" value={`${p.signUpTerms} term${p.signUpTerms > 1 ? "s" : ""}`} />
//             <Info
//               label="Discounts"
//               value={[
//                 p.siblingDiscount && "Sibling −15%",
//                 p.signUpTerms === 2 && "Multi-term −10%",
//                 p.signUpTerms === 3 && "Multi-term −15%",
//               ].filter(Boolean).join(", ") || "None"}
//             />
//             <Info label="Total fee" value={SAR(p.totalFee)} />
//           </div>
//         </Section>

//         {/* Term-by-term payments */}
//         <Section title="Term payments">
//           <div className="space-y-3">
//             {TERM_LABELS.map(({ key, label, dates }) => {
//               const t = p[key];
//               return (
//                 <div key={key} className="rounded-md border p-3">
//                   <div className="flex items-start justify-between gap-2">
//                     <div>
//                       <p className="text-sm font-semibold">{label}
//                         <span className="ml-2 text-xs text-muted-foreground font-normal">{dates}</span>
//                       </p>
//                       {!t.enrolled ? (
//                         <p className="text-xs text-muted-foreground mt-0.5">Not enrolled</p>
//                       ) : (
//                         <div className="mt-1 space-y-0.5 text-xs text-muted-foreground">
//                           <p>Amount: <span className="font-medium text-foreground">{SAR(t.amount)}</span></p>
//                           {t.paid && t.datePaid && <p>Paid on: {t.datePaid}</p>}
//                           {t.paid && t.method && <p>Method: {t.method}</p>}
//                           {t.bankRef && (
//                             <p className="truncate max-w-xs" title={t.bankRef}>
//                               Bank ref: <span className="font-mono text-[10px]">{t.bankRef.slice(0, 40)}…</span>
//                             </p>
//                           )}
//                           {t.creditAmount && t.creditAmount !== t.amount && (
//                             <p className="text-amber-600">
//                               Credit received: {SAR(t.creditAmount)}
//                               {" "}(diff: {SAR(Math.abs(t.creditAmount - t.amount))})
//                             </p>
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     <div className="flex flex-col items-end gap-1">
//                       {t.enrolled && (
//                         <Badge
//                           variant={t.paid ? "default" : "secondary"}
//                           className={t.paid ? "bg-emerald-100 text-emerald-700 border-0" : ""}
//                         >
//                           {t.paid ? "Paid" : "Unpaid"}
//                         </Badge>
//                       )}
//                       {t.enrolled && !t.paid && (
//                         <Button
//                           size="sm" variant="outline"
//                           className="text-xs h-7"
//                           onClick={() => setRecordingTerm(recordingTerm === key ? null : key)}
//                         >
//                           Record <ChevronDown className="ml-1 h-3 w-3" />
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {/* Inline record form for this term */}
//                   {recordingTerm === key && t.enrolled && (
//                     <RecordPaymentForm
//                       termLabel={label}
//                       defaultAmount={t.amount}
//                       compact
//                       onCancel={() => setRecordingTerm(null)}
//                       onSave={() => {
//                         setRecordingTerm(null);
//                         toast.success(`${label} payment recorded for ${p.participantName}`);
//                       }}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </Section>
//       </div>
//     </>
//   );
// }

// /** Shared record-payment form — used both inline (compact) and in the global dialog */
// function RecordPaymentForm({
//   termLabel,
//   defaultAmount,
//   compact = false,
//   onCancel,
//   onSave,
// }: {
//   termLabel?: string;
//   defaultAmount?: number;
//   compact?: boolean;
//   onCancel: () => void;
//   onSave: () => void;
// }) {
//   return (
//     <form
//       className={compact ? "mt-3 space-y-3 border-t pt-3" : "space-y-3"}
//       onSubmit={(e) => { e.preventDefault(); onSave(); }}
//     >
//       {!compact && (
//         <>
//           <Field label="Participant name">
//             <Input placeholder="Search by name or enrolment ID" />
//           </Field>
//           <div className="grid grid-cols-2 gap-3">
//             <Field label="Location">
//               <Select>
//                 <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Riyadh">Riyadh</SelectItem>
//                   <SelectItem value="Jeddah">Jeddah</SelectItem>
//                 </SelectContent>
//               </Select>
//             </Field>
//             <Field label="Term">
//               <Select>
//                 <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="t1">T1 — Aug 2025</SelectItem>
//                   <SelectItem value="t2">T2 — Nov 2025</SelectItem>
//                   <SelectItem value="t3">T3 — Mar 2026</SelectItem>
//                 </SelectContent>
//               </Select>
//             </Field>
//           </div>
//         </>
//       )}

//       <div className="grid grid-cols-2 gap-3">
//         <Field label="Amount (SAR)">
//           <Input type="number" placeholder="0" defaultValue={defaultAmount} />
//         </Field>
//         <Field label="Date paid">
//           <Input type="date" />
//         </Field>
//       </div>

//       <Field label="Method">
//         <Select defaultValue="Bank Transfer">
//           <SelectTrigger><SelectValue /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Bank Transfer">Bank transfer</SelectItem>
//             <SelectItem value="Card">Card</SelectItem>
//             <SelectItem value="Cash">Cash</SelectItem>
//           </SelectContent>
//         </Select>
//       </Field>

//       <Field label="Bank reference">
//         <Input
//           placeholder="LP IPSP… or transfer narrative"
//           className="font-mono text-xs"
//         />
//       </Field>

//       <Field label="Credit amount (SAR)">
//         <Input type="number" placeholder="Leave blank if same as fee" />
//       </Field>

//       <Field label="Proof of payment">
//         <Input type="file" />
//       </Field>

//       <div className="flex justify-end gap-2 pt-1">
//         <Button type="button" variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
//         <Button type="submit" size="sm">Save payment</Button>
//       </div>
//     </form>
//   );
// }

// // ─── Tiny helpers ─────────────────────────────────────────────────────────────

// function Section({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <div>
//       <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h4>
//       {children}
//     </div>
//   );
// }

// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
// }

// function Info({ label, value }: { label: string; value: React.ReactNode }) {
//   return (
//     <div className="rounded-md bg-muted/30 p-2.5">
//       <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
//       <p className="mt-0.5 text-sm font-medium">{value}</p>
//     </div>
//   );
// }
// import { createFileRoute } from "@tanstack/react-router";
// import { toast } from "sonner";
// import { ArrowUp, X } from "lucide-react";
// import { PageHeader } from "@/components/PageHeader";
// import { DataTable, type Column } from "@/components/DataTable";
// import { Button } from "@/components/ui/button";
// import { mockParticipants } from "@/data/mockParticipants";
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/components/ui/select";

// export const Route = createFileRoute("/location-manager/waitlist")({
//   component: WaitlistPage,
// });

// interface WaitlistEntry {
//   id: string;
//   position: number;
//   fullName: string;
//   guardianPhone: string;
//   session: string;
//   dateAdded: string;
//   hoursLeft: number;
//   minutesLeft: number;
// }

// const RIYADH_NAME = "Riyadh Academy";

// // Build mock waitlist from inquiries at Riyadh
// const inquiries = mockParticipants.filter(
//   (p) => p.location === RIYADH_NAME && (p.status === "Inquiry" || p.status === "Documents Pending"),
// );

// // Pad to ensure we always have several rows
// const seed = [
//   { name: "Reema Al-Nasser", phone: "+966 50 145 9988", session: "Fall 2025", added: "2025-12-01", hLeft: 47, mLeft: 12 },
//   { name: "Bader Al-Salem", phone: "+966 55 220 7766", session: "Annual Enrolment 2026", added: "2025-12-02", hLeft: 34, mLeft: 5 },
//   { name: "Tameem Al-Faris", phone: "+966 56 901 4422", session: "Fall 2025", added: "2025-12-02", hLeft: 21, mLeft: 48 },
// ];

// const generated: WaitlistEntry[] = inquiries.map((p, i) => ({
//   id: `wl-${p.id}`,
//   position: i + 1,
//   fullName: p.fullName,
//   guardianPhone: p.guardianPhone,
//   session: p.session,
//   dateAdded: p.joinedDate,
//   hoursLeft: 47 - i * 6,
//   minutesLeft: 12 + i * 7,
// }));

// const seedEntries: WaitlistEntry[] = seed.map((s, i) => ({
//   id: `wl-seed-${i}`,
//   position: generated.length + i + 1,
//   fullName: s.name,
//   guardianPhone: s.phone,
//   session: s.session,
//   dateAdded: s.added,
//   hoursLeft: s.hLeft,
//   minutesLeft: s.mLeft,
// }));

// const waitlist = [...generated, ...seedEntries];

// function WaitlistPage() {
//   const columns: Column<WaitlistEntry>[] = [
//     { key: "position", header: "#", render: (r) => <span className="font-mono text-sm">#{r.position}</span> },
//     { key: "fullName", header: "Participant", sortable: true },
//     { key: "guardianPhone", header: "Guardian Phone" },
//     { key: "session", header: "Session Applied For" },
//     { key: "dateAdded", header: "Date Added", sortable: true },
//     {
//       key: "window", header: "Acceptance Window",
//       render: (r) => {
//         const ok = r.hoursLeft > 12;
//         return (
//           <span className={ok ? "text-success" : "text-warning"}>
//             {Math.max(r.hoursLeft, 0)}h {Math.max(r.minutesLeft, 0)}m remaining
//           </span>
//         );
//       },
//     },
//     {
//       key: "actions", header: "Actions",
//       render: (r) => (
//         <div className="flex gap-1">
//           <Button
//             variant="ghost" size="sm"
//             onClick={() => toast.success(`${r.fullName} has been promoted from the waitlist and notified.`)}
//           >
//             <ArrowUp className="mr-1 h-4 w-4" /> Promote
//           </Button>
//           <Button variant="ghost" size="sm">
//             <X className="mr-1 h-4 w-4" /> Remove
//           </Button>
//         </div>
//       ),
//     },
//   ];
//   const filters = (
//     <>
//       {/* <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="w-[200px]" /> */}
//       <Select>
//         <SelectTrigger className="w-[160px]"><SelectValue placeholder="Session" /></SelectTrigger>
//         <SelectContent>
//           {/* {sessionsHere.map((s) => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)} */}
//           <SelectItem value="all">All DAYS</SelectItem>
//           <SelectItem value="sunday">SUNDAY</SelectItem>
//           <SelectItem value="monday">MONDAY</SelectItem>
//           <SelectItem value="tuesday">TUESDAY</SelectItem>
//           <SelectItem value="wednesday">WEDNESDAY</SelectItem>
//           <SelectItem value="thursday">THURSDAY</SelectItem>
//           <SelectItem value="saturday">SATURDAY</SelectItem>

//         </SelectContent>
//       </Select>
     
//         <Select>
//         <SelectTrigger className="w-[160px]"><SelectValue placeholder="Session" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Session</SelectItem>
//           <SelectItem value="sunday">4:30 to 5:30 PM</SelectItem>
//           <SelectItem value="monday">5:45 to 7:00 PM</SelectItem>

//         </SelectContent>
//       </Select>
//     </>
//   );
//   return (
//     <>
//       <PageHeader title="Waitlist" description="Riyadh Academy" />
      
//       <div className="p-6">
//         <DataTable
//           data={waitlist}
//           columns={columns}
//           searchKeys={["fullName", "session"]}
//           searchPlaceholder="Search waitlist…"
//         />
//       </div>
//     </>
//   );
// }




import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { ArrowUp, X, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { mockParticipants } from "@/data/mockParticipants";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/location-manager/waitlist")({
  component: WaitlistPage,
});

interface WaitlistEntry {
  id: string;
  position: number;
  fullName: string;
  guardianPhone: string;
  session: string;
  dateAdded: string;
  hoursLeft: number;
  minutesLeft: number;
  status: string;
  day: string;
  dob: string;
}

const RIYADH_NAME = "RIYADH";

// Build mock waitlist from inquiries at Riyadh
const inquiries = mockParticipants.filter(
  (p) => p.location === RIYADH_NAME && p.status === "WaitList",
);

const waitlist: WaitlistEntry[] = inquiries.map((p, i) => ({
  id: `wl-${p.id}`,
  position: i + 1,
  fullName: p.fullName,
  guardianPhone: p.guardianPhone,
  session: p.session,
  dateAdded: p.joinedDate,
  hoursLeft: 47 - i * 6,
  minutesLeft: 12 + i * 7,
  status: p.status,
  day: p.day,
  dob: p.dob,
}));

function WaitlistPage() {
  const [dayFilter, setDayFilter] = useState<string>("all");
  const [sessionFilter, setSessionFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const filteredWaitlist = useMemo(
    () =>
      waitlist.filter((w) => {
        if (dayFilter !== "all" && w.day.toLowerCase() !== dayFilter) return false;
        if (sessionFilter !== "all" && w.session !== sessionFilter) return false;
        return true;
      }),
    [dayFilter, sessionFilter],
  );

  useEffect(() => { setPage(1); }, [dayFilter, sessionFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredWaitlist.length / pageSize));
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredWaitlist.slice(start, start + pageSize);
  }, [filteredWaitlist, page]);

  const columns: Column<WaitlistEntry>[] = [
    { key: "position", header: "#", render: (r) => <span className="font-mono text-sm">#{r.position}</span> },
    { key: "fullName", header: "Participant", sortable: true },
    { key: "dob", header: "DOB" },

    { key: "guardianPhone", header: "Contact Number" },
    { key: "session", header: "Session Applied For" },
    { key: "day", header: "Day" },
    { key: "dateAdded", header: "Date Added", sortable: true },
    {
      key: "status", header: "Status",
      render: (r) => <StatusBadge status={r.status} />,
    },
    // {
    //   key: "window", header: "Acceptance Window",
    //   render: (r) => {
    //     const ok = r.hoursLeft > 12;
    //     return (
    //       <span className={ok ? "text-success" : "text-warning"}>
    //         {Math.max(r.hoursLeft, 0)}h {Math.max(r.minutesLeft, 0)}m remaining
    //       </span>
    //     );
    //   },
    // },
    {
      key: "actions", header: "Actions",
      render: (r) => (
        <div className="flex gap-1">
          <Button
            variant="ghost" size="sm"
            onClick={() => toast.success(`${r.fullName} has been promoted from the waitlist and notified.`)}
          >
            <ArrowUp className="mr-1 h-4 w-4" /> Promote
          </Button>
          <Button variant="ghost" size="sm">
            <X className="mr-1 h-4 w-4" /> Remove
          </Button>
        </div>
      ),
    },
  ];

  const filters = (
    <>
      <Select value={dayFilter} onValueChange={setDayFilter}>
        <SelectTrigger className="w-[160px]"><SelectValue placeholder="Day" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All DAYS</SelectItem>
          <SelectItem value="sunday">SUNDAY</SelectItem>
          <SelectItem value="monday">MONDAY</SelectItem>
          <SelectItem value="tuesday">TUESDAY</SelectItem>
          <SelectItem value="wednesday">WEDNESDAY</SelectItem>
          <SelectItem value="thursday">THURSDAY</SelectItem>
          <SelectItem value="saturday">SATURDAY</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sessionFilter} onValueChange={setSessionFilter}>
        <SelectTrigger className="w-[160px]"><SelectValue placeholder="Session" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Session</SelectItem>
          <SelectItem value="4:30 to 5:30 PM">4:30 to 5:30 PM</SelectItem>
          <SelectItem value="5:45 to 7:00 PM">5:45 to 7:00 PM</SelectItem>
        </SelectContent>
      </Select>
    </>
  );

  return (
    <>
      <PageHeader title="Waitlist" description="Riyadh Academy" />

      <div className="p-6">
        <DataTable
          data={paginated}
          columns={columns}
          searchKeys={["fullName", "session"]}
          searchPlaceholder="Search waitlist…"
          filters={filters}
        />
        {/* Pagination */}
        <div className="flex items-center justify-between px-1 mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredWaitlist.length === 0 ? 0 : (page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, filteredWaitlist.length)} of {filteredWaitlist.length}
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
    </>
  );
}

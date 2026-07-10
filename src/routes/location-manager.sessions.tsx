// import { createFileRoute } from "@tanstack/react-router";
// import { useState } from "react";
// import { PageHeader } from "@/components/PageHeader";
// import { DataTable, type Column } from "@/components/DataTable";
// import { StatusBadge } from "@/components/StatusBadge";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
// } from "@/components/ui/sheet";
// import {
//   Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { mockSessions, type MockSession } from "@/data/mockSessions";
// import { mockParticipants } from "@/data/mockParticipants";
// import { mockLocations } from "@/data/mockLocations";
// export const Route = createFileRoute("/location-manager/sessions")({
//   component: SessionsPage,
// });

// const RIYADH_ID = "loc-riy";
// const SAR = (n: number) => `SAR ${n.toLocaleString()}`;
// const locName = (id: string) => mockLocations.find((l) => l.id === id)?.name ?? id;

// function SessionsPage() {
//   const [selected, setSelected] = useState<MockSession | null>(null);
//   const sessions = mockSessions.filter((s) => s.locationId === RIYADH_ID);

//   const columns: Column<MockSession>[] = [
//     {
//       key: "name", header: "Name", sortable: true,
//       render: (r) => (
//         <button type="button" onClick={() => setSelected(r)} className="font-medium hover:text-primary">
//           {r.name}
//         </button>
//       ),
//     },
//     { key: "days", header: "Days", render: (r) => locName(r.days) },
//     { key: "session", header: "Session", render: (r) => locName(r.session) },

//     { key: "startDate", header: "Start" },
//     { key: "endDate", header: "End" },
//     { key: "baseFee", header: "Base Fee", render: (r) => SAR(r.baseFee) },
//     { key: "enrolledCount", header: "Enrolled / Capacity", render: (r) => `${r.enrolledCount} / ${r.capacity}` },
//     { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "Open" ? "Active" : r.status === "Closed" ? "Completed" : "Scheduled"} /> },
//     { key: "actions", header: "Actions", render: (r) => <Button variant="ghost" size="sm" onClick={() => setSelected(r)}>View</Button> },
//   ];

//   return (
//     <>
//       <PageHeader
//         title="My Sessions"
//         description="Riyadh Academy"
//         actions={
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <span tabIndex={0}>
//                   <Button disabled>Add Session</Button>
//                 </span>
//               </TooltipTrigger>
//               <TooltipContent>Contact Super Admin to create sessions</TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         }
//       />

//       <div className="p-6">
//         <DataTable
//           data={sessions}
//           columns={columns}
//           searchKeys={["session"]}
//           searchPlaceholder="Search sessions…"
//         />
//       </div>

//       <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
//         <SheetContent className="w-full sm:max-w-lg">
//           {selected && (
//             <>
//               <SheetHeader>
//                 <SheetTitle>{selected.session}</SheetTitle>
//                 <SheetDescription>Riyadh Academy</SheetDescription>
//               </SheetHeader>
//               <div className="space-y-5 px-4 pb-6">
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <Info label="Start" value={selected.startDate} />
//                   <Info label="End" value={selected.endDate} />
//                   <Info label="Status" value={<StatusBadge status={selected.status === "Open" ? "Active" : selected.status === "Closed" ? "Completed" : "Scheduled"} />} />
//                   <Info label="Capacity" value={`${selected.enrolledCount} / ${selected.capacity}`} />
//                 </div>
//                 <div className="rounded-lg border p-4">
//                   <h4 className="mb-3 text-sm font-semibold">Fee breakdown</h4>
//                   <Row label="Base fee" value={SAR(selected.baseFee)} />
//                   <Row label="Enrolled" value={mockParticipants.filter((p) => p.session === selected.session).length} />
//                   <Row label="Projected revenue" value={SAR(selected.baseFee * selected.enrolledCount)} bold />
//                 </div>
//               </div>
//             </>
//           )}
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }

// function Info({ label, value }: { label: string; value: React.ReactNode }) {
//   return (
//     <div className="rounded-md bg-muted/30 p-2.5">
//       <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
//       <p className="mt-0.5 text-sm font-medium">{value}</p>
//     </div>
//   );
// }
// function Row({ label, value, bold }: { label: string; value: React.ReactNode; bold?: boolean }) {
//   return (
//     <div className="flex items-center justify-between py-1 text-sm">
//       <span className="text-muted-foreground">{label}</span>
//       <span className={bold ? "font-semibold" : ""}>{value}</span>
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { DataTable, type Column } from "@/components/DataTable";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { mockSessions, type MockSession } from "@/data/mockSessions";
import { mockLocations } from "@/data/mockLocations";
import { mockParticipants } from "@/data/mockParticipants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/location-manager/sessions")({
  component: SessionsPage,
});

const locName = (id: string) => mockLocations.find((l) => l.id === id)?.name ?? id;
const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

// Only Riyadh sessions are relevant on this page
const riyadhLocationId = mockLocations.find(
  (l) => l.name.trim().toLowerCase() === "riyadh"
)?.id;

function SessionsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<MockSession | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  // Form State for Add Session
  const [schedules, setSchedules] = useState<{ id: string; day: string; timings: { id: string; start: string; end: string }[] }[]>([]);

  const handleAddDay = () => {
    setSchedules([...schedules, { id: crypto.randomUUID(), day: "monday", timings: [{ id: crypto.randomUUID(), start: "16:00", end: "17:30" }] }]);
  };
  const handleRemoveDay = (id: string) => setSchedules(schedules.filter(s => s.id !== id));
  const handleAddTiming = (dayId: string) => {
    setSchedules(schedules.map(s => s.id === dayId ? { ...s, timings: [...s.timings, { id: crypto.randomUUID(), start: "18:00", end: "19:30" }] } : s));
  };
  const handleRemoveTiming = (dayId: string, timingId: string) => {
    setSchedules(schedules.map(s => s.id === dayId ? { ...s, timings: s.timings.filter(t => t.id !== timingId) } : s));
  };
  const handleUpdateTiming = (dayId: string, timingId: string, field: "start" | "end", value: string) => {
    setSchedules(schedules.map(s => s.id === dayId ? { ...s, timings: s.timings.map(t => t.id === timingId ? { ...t, [field]: value } : t) } : s));
  };

  // Base dataset scoped to Riyadh only
  const riyadhSessions = useMemo(
    () => mockSessions.filter((s) => s.locationId === riyadhLocationId),
    []
  );

  const filtered = useMemo(() => {
    return riyadhSessions.filter((s) => {
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      return true;
    });
  }, [statusFilter, riyadhSessions]);

  const groupedFiltered = useMemo(() => {
    const map = new Map<string, MockSession>();
    filtered.forEach((s) => {
      if (!map.has(s.name)) {
        map.set(s.name, s);
      }
    });
    return Array.from(map.values());
  }, [filtered]);

  const relatedSessions = useMemo(() => {
    if (!selected) return [];
    return riyadhSessions.filter(s => s.name === selected.name);
  }, [selected, riyadhSessions]);

  const currentVariant = useMemo(() => {
    return relatedSessions.find(s => s.id === selectedVariantId) || selected;
  }, [relatedSessions, selectedVariantId, selected]);

  const columns: Column<MockSession>[] = [
    {
      key: "name", header: "Name", sortable: true,
      render: (r) => (
        <button
          type="button"
          onClick={() => setSelected(r)}
          className="font-medium text-foreground hover:text-primary"
        >
          {r.name}
        </button>
      ),
    },
    {
      key: "days", header: "Days", render: (r, isExpanded) => {
        const related = filtered.filter(s => s.name === r.name);
        return related.length > 1 ? (
          <span className="inline-flex items-center gap-1 font-medium text-primary">
            Multiple {isExpanded ? <span className="text-xs">▲</span> : <span className="text-xs">▼</span>}
          </span>
        ) : locName(r.days);
      }
    },
    {
      key: "session", header: "Session Timing", render: (r, isExpanded) => {
        const related = filtered.filter(s => s.name === r.name);
        return related.length > 1 ? (
          <span className="inline-flex items-center gap-1 font-medium text-primary">
            Multiple {isExpanded ? <span className="text-xs">▲</span> : <span className="text-xs">▼</span>}
          </span>
        ) : locName(r.session);
      }
    },

    { key: "locationId", header: "Location", render: (r) => locName(r.locationId) },
    { key: "startDate", header: "Start Date", sortable: true },
    { key: "endDate", header: "End Date", sortable: true },
    // { key: "baseFee", header: "Base Fee", render: (r) => SAR(r.baseFee) },
    {
      key: "enrolled", header: "Enrolled / Capacity",
      render: (r) => `${r.enrolledCount} / ${r.capacity}`,
    },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status === "Open" ? "Active" : r.status === "Closed" ? "Completed" : "Scheduled"} /> },
    {
      key: "actions", header: "Actions",
      render: (r) => (
        <Button variant="ghost" size="sm" onClick={() => setSelected(r)}>View</Button>
      ),
    },
  ];

  const filters = (
    <>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="Closed">Closed</SelectItem>
          <SelectItem value="Upcoming">Upcoming</SelectItem>
        </SelectContent>
      </Select>
    </>
  );

  const renderExpandedRow = (row: MockSession) => {
    const related = filtered.filter(s => s.name === row.name);
    if (related.length <= 1) return null;

    const groupedByDay = related.reduce((acc, s) => {
      if (!acc[s.days]) acc[s.days] = [];
      acc[s.days].push(s);
      return acc;
    }, {} as Record<string, MockSession[]>);

    return (
      <div className="bg-muted/10 p-4 border-l-4 border-primary">
        <h4 className="mb-4 text-sm font-semibold text-foreground">Timings</h4>
        <div className="space-y- flex gap-[42px]">
          {Object.entries(groupedByDay).map(([day, sessions]) => (
            <div key={day} className="space-y-1 min-w-[250px]">
              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{day}</h5>
              <div className="">
                {sessions.map(s => (
                  <div key={s.id} className="flex flex-col justify-between rounded-lg border bg-background p-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-3 flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm text-foreground">{s.session} {s.ageGroup ? `(${s.ageGroup})` : ""}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{locName(s.locationId)}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" className="w-full font-medium" onClick={() => {
                      setSelected(row);
                      setSelectedVariantId(s.id);
                    }}>
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const enrolledForSelected = currentVariant
    ? mockParticipants.filter((p) => p.session === currentVariant.session).length
    : 0;

  const handleRowClick = (row: MockSession, toggleExpand: () => void) => {
    const related = filtered.filter(s => s.name === row.name);
    if (related.length > 1) {
      toggleExpand();
    } else {
      setSelected(row);
      setSelectedVariantId(row.id);
    }
  };

  return (
    <>
      <PageHeader
        title="Sessions"
        description={`${riyadhSessions.length} sessions`}
        actions={
          <div className="flex gap-2">

            <Button disabled>Add Session</Button>
          </div>
        }
      />
      <div className="p-6">
        <DataTable
          data={groupedFiltered}
          columns={columns}
          searchKeys={["session", "name"]}
          searchPlaceholder="Search sessions…"
          filters={filters}
          expandableContent={renderExpandedRow}
          onRowClick={handleRowClick}
        />
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => {
        if (!o) {
          setSelected(null);
          setSelectedVariantId(null);
        }
      }}>
        <SheetContent className="w-full sm:max-w-lg">
          {currentVariant && (
            <>
              <SheetHeader>
                <SheetTitle>{currentVariant.name}</SheetTitle>
                <SheetDescription>{locName(currentVariant.locationId)}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6 pt-6">
                {relatedSessions.length > 1 && (
                  <div>
                    <Label className="mb-2 block text-sm font-semibold">Select Day & Time</Label>
                    <Select value={currentVariant.id} onValueChange={setSelectedVariantId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {relatedSessions.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.days} • {s.session}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Stat label="Start" value={currentVariant.startDate} />
                  <Stat label="End" value={currentVariant.endDate} />
                  <Stat label="Status" value={<StatusBadge status={currentVariant.status === "Open" ? "Active" : currentVariant.status === "Closed" ? "Completed" : "Scheduled"} />} />
                  <Stat label="Capacity" value={`${currentVariant.enrolledCount} / ${currentVariant.capacity}`} />
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="mb-3 text-sm font-semibold">Fee breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <Row label="Base fee" value={SAR(currentVariant.baseFee)} />
                    <Row label="Currency" value={currentVariant.currency} />
                    <Row label="Enrolled participants" value={enrolledForSelected} />
                    <Row label="Projected revenue" value={SAR(currentVariant.baseFee * currentVariant.enrolledCount)} bold />
                  </div>
                </div>
              </div>
              <div className="space-y-5 px-4 pb-6"> <Button variant="outline" onClick={() => window.open('/registration-form', '_blank')}>
                Registration Form
              </Button></div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={addOpen} onOpenChange={(open) => {
        setAddOpen(open);
        if (!open) setSchedules([]); // reset on close
      }}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Session</SheetTitle>
            <SheetDescription>Schedule a new session with multiple days and timings.</SheetDescription>
          </SheetHeader>
          <form className="space-y-6 pb-6 pt-6" onSubmit={(e) => { e.preventDefault(); setAddOpen(false); setSchedules([]); }}>
            <Field label="Session Name"><Input placeholder="e.g. Spring 2026" required /></Field>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Schedule</Label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddDay}>
                  <Plus className="h-4 w-4 mr-2" /> Add Day
                </Button>
              </div>

              {schedules.length === 0 && (
                <div className="text-sm text-muted-foreground border border-dashed rounded-lg p-6 text-center">
                  No days added. Click "Add Day" to set up the schedule.
                </div>
              )}

              {schedules.map((schedule, index) => (
                <div key={schedule.id} className="border rounded-lg p-4 bg-muted/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <Select
                        value={schedule.day}
                        onValueChange={(val) => setSchedules(schedules.map(s => s.id === schedule.id ? { ...s, day: val } : s))}
                      >
                        <SelectTrigger><SelectValue placeholder="Select Day" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sunday">Sunday</SelectItem>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleRemoveDay(schedule.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="pl-2 space-y-3 border-l-2 border-primary/20">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timings</Label>
                    {schedule.timings.map((timing) => (
                      <div key={timing.id} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={timing.start}
                          onChange={(e) => handleUpdateTiming(schedule.id, timing.id, "start", e.target.value)}
                          className="w-full"
                          required
                        />
                        <span className="text-muted-foreground text-sm">to</span>
                        <Input
                          type="time"
                          value={timing.end}
                          onChange={(e) => handleUpdateTiming(schedule.id, timing.id, "end", e.target.value)}
                          className="w-full"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive shrink-0"
                          onClick={() => handleRemoveTiming(schedule.id, timing.id)}
                          disabled={schedule.timings.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="link" size="sm" className="px-0 h-auto text-primary" onClick={() => handleAddTiming(schedule.id)}>
                      + Add another timing
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              <Field label="Location">
                <Select defaultValue={riyadhLocationId} required>
                  <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                  <SelectContent>
                    {mockLocations.map((l) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Start Date"><Input type="date" required /></Field>
                <Field label="End Date"><Input type="date" required /></Field>
              </div>
              {/* <Field label="Base Fee (SAR)"><Input type="number" placeholder="1500" required /></Field> */}
              <Field label="Status">
                <Select defaultValue="Upcoming">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => { setAddOpen(false); setSchedules([]); }}>Cancel</Button>
              <Button type="submit">Create Session</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
function Row({ label, value, bold }: { label: string; value: React.ReactNode; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
}
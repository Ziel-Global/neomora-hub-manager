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

export const Route = createFileRoute("/admin/sessions")({
  component: SessionsPage,
});

const locName = (id: string) => mockLocations.find((l) => l.id === id)?.name ?? id;
const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

function SessionsPage() {
  const [locFilter, setLocFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<MockSession | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  // Form State for Add Session
  const [schedules, setSchedules] = useState<{ id: string; day: string; timings: { id: string; start: string; end: string; ageGroup: string }[] }[]>([]);

  const handleAddDay = () => {
    setSchedules([...schedules, { id: crypto.randomUUID(), day: "monday", timings: [{ id: crypto.randomUUID(), start: "16:00", end: "17:30", ageGroup: "U8" }] }]);
  };
  const handleRemoveDay = (id: string) => setSchedules(schedules.filter(s => s.id !== id));
  const handleAddTiming = (dayId: string) => {
    setSchedules(schedules.map(s => s.id === dayId ? { ...s, timings: [...s.timings, { id: crypto.randomUUID(), start: "18:00", end: "19:30", ageGroup: "U8" }] } : s));
  };
  const handleRemoveTiming = (dayId: string, timingId: string) => {
    setSchedules(schedules.map(s => s.id === dayId ? { ...s, timings: s.timings.filter(t => t.id !== timingId) } : s));
  };
  const handleUpdateTiming = (dayId: string, timingId: string, field: "start" | "end" | "ageGroup", value: string) => {
    setSchedules(schedules.map(s => s.id === dayId ? { ...s, timings: s.timings.map(t => t.id === timingId ? { ...t, [field]: value } : t) } : s));
  };

  const filtered = useMemo(() => {
    return mockSessions.filter((s) => {
      if (locFilter !== "all" && s.locationId !== locFilter) return false;
      if (statusFilter !== "all" && s.status !== statusFilter) return false;
      return true;
    });
  }, [locFilter, statusFilter]);

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
    return mockSessions.filter(s => s.name === selected.name);
  }, [selected]);

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
    // {
    //   key: "days", header: "Days", render: (r, isExpanded) => {
    //     const related = filtered.filter(s => s.name === r.name);
    //     return related.length > 1 ? (
    //       <span className="inline-flex items-center gap-1 font-medium text-primary">
    //         Multiple {isExpanded ? <span className="text-xs">▲</span> : <span className="text-xs">▼</span>}
    //       </span>
    //     ) : locName(r.days);
    //   }
    // },
    // {
    //   key: "session", header: "Session Timing", render: (r, isExpanded) => {
    //     const related = filtered.filter(s => s.name === r.name);
    //     return related.length > 1 ? (
    //       <span className="inline-flex items-center gap-1 font-medium text-primary">
    //         Multiple {isExpanded ? <span className="text-xs">▲</span> : <span className="text-xs">▼</span>}
    //       </span>
    //     ) : `${r.session}${r.ageGroup ? ` (${r.ageGroup})` : ""}`;
    //   }
    // },

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
      <Select value={locFilter} onValueChange={setLocFilter}>
        <SelectTrigger className="w-[170px]"><SelectValue placeholder="Location" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Locations</SelectItem>
          {mockLocations.map((l) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
        </SelectContent>
      </Select>
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
        <div className="space-y-5">
          {Object.entries(groupedByDay).map(([day, sessions]) => (
            <div key={day} className="space-y-3">
              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{day}</h5>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        description={`${mockSessions.length} sessions`}
        actions={
          <div className="flex gap-2">

            <Button onClick={() => setAddOpen(true)}>Add Session</Button>
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
            <SheetDescription>Create a new Session.</SheetDescription>
          </SheetHeader>
          <form className="space-y-6 pb-6 pt-6" onSubmit={(e) => { e.preventDefault(); setAddOpen(false); setSchedules([]); }}>
            <Field label="Session Name"><Input placeholder="e.g. Spring 2026" required /></Field>
            {/* 
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
                        <Select
                          value={timing.ageGroup}
                          onValueChange={(val) => handleUpdateTiming(schedule.id, timing.id, "ageGroup", val)}
                        >
                          <SelectTrigger className="w-[100px] shrink-0"><SelectValue placeholder="Age Group" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="U4">U4</SelectItem>
                            <SelectItem value="U6">U6</SelectItem>
                            <SelectItem value="U8">U8</SelectItem>
                            <SelectItem value="U10">U10</SelectItem>
                            <SelectItem value="U12">U12</SelectItem>
                            <SelectItem value="U14">U14</SelectItem>
                            <SelectItem value="U16/U18">U16/U18</SelectItem>
                            <SelectItem value="GIRLS ONLY">GIRLS ONLY</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
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
            </div> */}

            <div className="space-y-4 pt-2">
              <Field label="Location">
                <Select required>
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
















// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState, useEffect } from "react";
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
// import { sessionsApi, type Session, type SessionStatus } from "@/api/sessions";
// import { locationsApi, type Location } from "@/api/locations";

// export const Route = createFileRoute("/admin/sessions")({
//   component: SessionsPage,
// });

// const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

// // Map API status → StatusBadge status
// const toBadgeStatus = (s: SessionStatus) => {
//   if (s === "OPEN") return "Active";
//   if (s === "CLOSED") return "Completed";
//   return "Scheduled"; // UPCOMING
// };

// function SessionsPage() {
//   const [locFilter, setLocFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [selected, setSelected] = useState<Session | null>(null);
//   const [addOpen, setAddOpen] = useState(false);

//   // ── Real data state ──────────────────────────────────────────────────────
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [apiError, setApiError] = useState<string | null>(null);

//   // ── Add form state ───────────────────────────────────────────────────────
//   const [form, setForm] = useState({
//     name: "",
//     startDate: "",
//     endDate: "",
//     baseFee: "",
//     locationId: "",
//     status: "UPCOMING" as SessionStatus,
//   });
//   const [formLoading, setFormLoading] = useState(false);
//   const [formError, setFormError] = useState<string | null>(null);

//   // ── Status edit state (for detail drawer) ────────────────────────────────
//   const [statusUpdating, setStatusUpdating] = useState(false);
//   const [statusError, setStatusError] = useState<string | null>(null);

//   // ── Fetch sessions + locations on mount ──────────────────────────────────
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [sessionData, locationData] = await Promise.all([
//           sessionsApi.getAll(),
//           locationsApi.getAll(),
//         ]);
//         setSessions(sessionData);
//         setLocations(locationData);
//       } catch (err) {
//         setApiError(err instanceof Error ? err.message : "Failed to load data.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAll();
//   }, []);

//   // ── Helpers ──────────────────────────────────────────────────────────────
//   const locName = (id: string) =>
//     locations.find((l) => l.id === id)?.name ?? id;

//   // ── Filtered sessions ────────────────────────────────────────────────────
//   const filtered = useMemo(() => {
//     return sessions.filter((s) => {
//       if (locFilter !== "all") {
//         const hasLoc = s.locations.some((l) => l.locationId === locFilter);
//         if (!hasLoc) return false;
//       }
//       if (statusFilter !== "all" && s.status !== statusFilter) return false;
//       return true;
//     });
//   }, [sessions, locFilter, statusFilter]);

//   // ── Create session handler ───────────────────────────────────────────────
//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.locationId) { setFormError("Please select a location."); return; }
//     setFormError(null);
//     setFormLoading(true);
//     try {
//       const created = await sessionsApi.create({
//         name: form.name,
//         startDate: form.startDate,
//         endDate: form.endDate,
//         baseFee: Number(form.baseFee),
//         locations: [{ locationId: form.locationId }],
//       });
//       setSessions((prev) => [...prev, created]);
//       setForm({ name: "", startDate: "", endDate: "", baseFee: "", locationId: "", status: "UPCOMING" });
//       setAddOpen(false);
//     } catch (err) {
//       setFormError(err instanceof Error ? err.message : "Failed to create session.");
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   // ── Update status handler (from detail drawer) ───────────────────────────
//   const handleStatusUpdate = async (newStatus: SessionStatus) => {
//     if (!selected) return;
//     setStatusError(null);
//     setStatusUpdating(true);
//     try {
//       const updated = await sessionsApi.updateStatus(selected.id, newStatus);
//       setSessions((prev) => prev.map((s) => s.id === updated.id ? updated : s));
//       setSelected(updated);
//     } catch (err) {
//       setStatusError(err instanceof Error ? err.message : "Failed to update status.");
//     } finally {
//       setStatusUpdating(false);
//     }
//   };

//   // ── Table columns ────────────────────────────────────────────────────────
//   const columns: Column<Session>[] = [
//     {
//       key: "name", header: "Name", sortable: true,
//       render: (r) => (
//         <button
//           type="button"
//           onClick={() => setSelected(r)}
//           className="font-medium text-foreground hover:text-primary"
//         >
//           {r.name}
//         </button>
//       ),
//     },
//     {
//       key: "locations", header: "Location",
//       render: (r) => r.locations.map((l) => locName(l.locationId)).join(", "),
//     },
//     { key: "startDate", header: "Start Date", sortable: true },
//     { key: "endDate", header: "End Date", sortable: true },
//     { key: "baseFee", header: "Base Fee", render: (r) => SAR(r.baseFee) },
//     {
//       key: "enrolledCount", header: "Enrolled / Capacity",
//       render: (r) => `${r.enrolledCount ?? 0} / ${r.capacity ?? "—"}`,
//     },
//     {
//       key: "status", header: "Status",
//       render: (r) => <StatusBadge status={toBadgeStatus(r.status)} />,
//     },
//     {
//       key: "actions", header: "Actions",
//       render: (r) => (
//         <Button variant="ghost" size="sm" onClick={() => setSelected(r)}>View</Button>
//       ),
//     },
//   ];

//   const filters = (
//     <>
//       <Select value={locFilter} onValueChange={setLocFilter}>
//         <SelectTrigger className="w-[170px]"><SelectValue placeholder="Location" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Locations</SelectItem>
//           {locations.map((l) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
//         </SelectContent>
//       </Select>
//       <Select value={statusFilter} onValueChange={setStatusFilter}>
//         <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Status</SelectItem>
//           <SelectItem value="OPEN">Open</SelectItem>
//           <SelectItem value="CLOSED">Closed</SelectItem>
//           <SelectItem value="UPCOMING">Upcoming</SelectItem>
//         </SelectContent>
//       </Select>
//     </>
//   );

//   return (
//     <>
//       <PageHeader
//         title="Sessions"
//         description={`${sessions.length} sessions`}
//         actions={<Button onClick={() => setAddOpen(true)}>Add Session</Button>}
//       />

//       <div className="p-6">
//         {loading ? (
//           <p className="text-sm text-muted-foreground">Loading sessions…</p>
//         ) : apiError ? (
//           <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
//             {apiError}
//           </div>
//         ) : (
//           <DataTable
//             data={filtered}
//             columns={columns}
//             searchKeys={["name"]}
//             searchPlaceholder="Search sessions…"
//             filters={filters}
//           />
//         )}
//       </div>

//       {/* ── Detail / Status edit drawer ── */}
//       <Sheet open={!!selected} onOpenChange={(o) => { if (!o) { setSelected(null); setStatusError(null); } }}>
//         <SheetContent className="w-full sm:max-w-lg">
//           {selected && (
//             <>
//               <SheetHeader>
//                 <SheetTitle>{selected.name}</SheetTitle>
//                 <SheetDescription>
//                   {selected.locations.map((l) => locName(l.locationId)).join(", ")}
//                 </SheetDescription>
//               </SheetHeader>
//               <div className="space-y-5 px-4 pb-6">
//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <Stat label="Start" value={selected.startDate} />
//                   <Stat label="End" value={selected.endDate} />
//                   <Stat label="Status" value={<StatusBadge status={toBadgeStatus(selected.status)} />} />
//                   <Stat label="Capacity" value={`${selected.enrolledCount ?? 0} / ${selected.capacity ?? "—"}`} />
//                 </div>

//                 <div className="rounded-lg border p-4">
//                   <h4 className="mb-3 text-sm font-semibold">Fee breakdown</h4>
//                   <div className="space-y-2 text-sm">
//                     <Row label="Base fee" value={SAR(selected.baseFee)} />
//                     <Row label="Currency" value={selected.currency ?? "SAR"} />
//                     <Row label="Enrolled participants" value={selected.enrolledCount ?? 0} />
//                     <Row
//                       label="Projected revenue"
//                       value={SAR(selected.baseFee * (selected.enrolledCount ?? 0))}
//                       bold
//                     />
//                   </div>
//                 </div>

//                 {/* ── Status update section ── */}
//                 <div className="rounded-lg border p-4 space-y-3">
//                   <h4 className="text-sm font-semibold">Update Status</h4>
//                   {statusError && (
//                     <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
//                       {statusError}
//                     </div>
//                   )}
//                   <div className="flex gap-2">
//                     {(["OPEN", "CLOSED", "UPCOMING"] as SessionStatus[]).map((s) => (
//                       <Button
//                         key={s}
//                         size="sm"
//                         variant={selected.status === s ? "default" : "outline"}
//                         disabled={statusUpdating || selected.status === s}
//                         onClick={() => handleStatusUpdate(s)}
//                       >
//                         {statusUpdating && selected.status !== s ? "Updating…" : s.charAt(0) + s.slice(1).toLowerCase()}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </SheetContent>
//       </Sheet>

//       {/* ── Add Session drawer ── */}
//       <Sheet open={addOpen} onOpenChange={setAddOpen}>
//         <SheetContent className="w-full sm:max-w-lg">
//           <SheetHeader>
//             <SheetTitle>Add Session</SheetTitle>
//             <SheetDescription>Schedule a new session.</SheetDescription>
//           </SheetHeader>
//           <form className="space-y-4 pb-6" onSubmit={handleCreate}>

//             {formError && (
//               <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
//                 {formError}
//               </div>
//             )}

//             <Field label="Name">
//               <Input
//                 placeholder="e.g. Spring 2026"
//                 value={form.name}
//                 onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
//                 required
//               />
//             </Field>

//             <Field label="Location">
//               <Select
//                 value={form.locationId}
//                 onValueChange={(val) => setForm((f) => ({ ...f, locationId: val }))}
//               >
//                 <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
//                 <SelectContent>
//                   {locations.map((l) => (
//                     <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </Field>

//             <div className="grid grid-cols-2 gap-3">
//               <Field label="Start Date">
//                 <Input
//                   type="date"
//                   value={form.startDate}
//                   onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))}
//                   required
//                 />
//               </Field>
//               <Field label="End Date">
//                 <Input
//                   type="date"
//                   value={form.endDate}
//                   onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
//                   required
//                 />
//               </Field>
//             </div>

//             <Field label="Base Fee (SAR)">
//               <Input
//                 type="number"
//                 placeholder="1800"
//                 value={form.baseFee}
//                 onChange={(e) => setForm((f) => ({ ...f, baseFee: e.target.value }))}
//                 required
//               />
//             </Field>

//             <SheetFooter>
//               <Button type="button" variant="outline" onClick={() => setAddOpen(false)} disabled={formLoading}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={formLoading}>
//                 {formLoading ? "Creating…" : "Create Session"}
//               </Button>
//             </SheetFooter>
//           </form>
//         </SheetContent>
//       </Sheet>
//     </>
//   );
// }

// function Stat({ label, value }: { label: string; value: React.ReactNode }) {
//   return (
//     <div className="rounded-lg border bg-muted/30 p-3">
//       <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
//       <p className="mt-1 font-semibold">{value}</p>
//     </div>
//   );
// }
// function Row({ label, value, bold }: { label: string; value: React.ReactNode; bold?: boolean }) {
//   return (
//     <div className="flex items-center justify-between">
//       <span className="text-muted-foreground">{label}</span>
//       <span className={bold ? "font-semibold" : ""}>{value}</span>
//     </div>
//   );
// }
// function Field({ label, children }: { label: string; children: React.ReactNode }) {
//   return <div className="space-y-1.5"><Label>{label}</Label>{children}</div>;
// }
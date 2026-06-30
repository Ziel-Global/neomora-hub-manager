import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Download, Eye, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
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
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/location-manager/enrolments")({
  component: EnrolmentsPage,
});

import { mockParticipants } from "@/data/mockParticipants";

// ── Mock types ──────────────────────────────────────────────────────────────
interface Participant {
  id: string;
  fullName: string;
  uniqueId?: string;
  contactNumber: string;
}

interface Location {
  id: string;
  name: string;
}

interface Session {
  id: string;
  name: string;
  locations: { locationId: string }[];
}

interface Enrolment {
  id: string;
  participantId: string;
  sessionId: string;
  locationId: string;
  paymentPlanType: string;
  status?: string;
  day: string;
}

// ── Mock data ───────────────────────────────────────────────────────────────
const mockLocations: Location[] = [
  { id: "loc-1", name: "Riyadh Academy" },
  { id: "loc-2", name: "Jeddah Academy" },
  { id: "loc-3", name: "Dammam Academy" },
];

const mockSessions: Session[] = [
  { id: "ses-1", name: "Fall 2025", locations: [{ locationId: "loc-1" }, { locationId: "loc-2" }] },
  { id: "ses-2", name: "Annual Enrolment 2026", locations: [{ locationId: "loc-1" }, { locationId: "loc-3" }] },
  { id: "ses-3", name: "Spring 2026", locations: [{ locationId: "loc-2" }, { locationId: "loc-3" }] },
];

const riyadhActive = mockParticipants.filter((p) => p.location === "RIYADH" && p.status === "Active");

const mockParticipantsList: Participant[] = riyadhActive.map(p => ({
  id: p.id,
  fullName: p.fullName,
  uniqueId: p.uniqueId,
  contactNumber: p.guardianPhone,
}));

const initialEnrolments: Enrolment[] = riyadhActive.map(p => ({
  id: `e-${p.id}`,
  participantId: p.id,
  sessionId: p.session, // Using the session string directly as ID for now
  locationId: p.location,
  paymentPlanType: "FULL",
  status: p.status,
  day: p.day,
}));

function EnrolmentsPage() {
  const [search, setSearch] = useState("");
  const [dayFilter, setDayFilter] = useState<string>("all");
  const [sessionFilter, setSessionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Enrolment | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const [reEnrolOpen, setReEnrolOpen] = useState(false);
  const [reEnrolSelected, setReEnrolSelected] = useState<Enrolment | null>(null);
  const [reEnrolForm, setReEnrolForm] = useState({ sessionId: "", paymentPlanType: "" });
  const [reEnrolError, setReEnrolError] = useState<string | null>(null);

  const [enrolments, setEnrolments] = useState<Enrolment[]>(initialEnrolments);
  const [participants] = useState<Participant[]>(mockParticipantsList);
  const [locations] = useState<Location[]>(mockLocations);
  const [sessions] = useState<Session[]>(mockSessions);

  const [form, setForm] = useState({
    participantId: "", sessionId: "", locationId: "", paymentPlanType: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return enrolments.filter((e) => {
      const p = participants.find((part) => part.id === e.participantId);
      const fullName = p ? p.fullName : "";
      if (q && !fullName.toLowerCase().includes(q)) return false;
      if (dayFilter !== "all" && e.day.toLowerCase() !== dayFilter) return false;
      if (sessionFilter !== "all" && e.sessionId !== sessionFilter) return false;
      if (statusFilter !== "all" && (e.status || "Active").toLowerCase() !== statusFilter) return false;
      return true;
    });
  }, [enrolments, participants, search, dayFilter, sessionFilter, statusFilter]);

  useEffect(() => { setPage(1); }, [search, dayFilter, sessionFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.participantId) { setFormError("Please select a participant."); return; }
    if (!form.sessionId) { setFormError("Please select a session."); return; }
    if (!form.locationId) { setFormError("Please select a location."); return; }
    if (!form.paymentPlanType) { setFormError("Please select a payment plan type."); return; }
    setFormError(null);

    const created: Enrolment = {
      id: `e-${Date.now()}`,
      participantId: form.participantId,
      sessionId: form.sessionId,
      locationId: form.locationId,
      paymentPlanType: form.paymentPlanType,
      status: "Active",
      day: "Sunday",
    };
    setEnrolments((prev) => [created, ...prev]);
    setForm({ participantId: "", sessionId: "", locationId: "", paymentPlanType: "" });
    setAddOpen(false);
  };

  const handleReEnrol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reEnrolSelected) return;
    if (!reEnrolForm.sessionId) { setReEnrolError("Please select a session."); return; }
    if (!reEnrolForm.paymentPlanType) { setReEnrolError("Please select a payment plan type."); return; }
    setReEnrolError(null);

    setEnrolments((prev) =>
      prev.map((en) =>
        en.id === reEnrolSelected.id
          ? { ...en, sessionId: reEnrolForm.sessionId, paymentPlanType: reEnrolForm.paymentPlanType }
          : en,
      ),
    );
    setReEnrolForm({ sessionId: "", paymentPlanType: "" });
    setReEnrolOpen(false);
    setReEnrolSelected(null);
  };

  const columns: Column<Enrolment>[] = [
    {
      key: "participant", header: "Participant",
      render: (r) => {
        const p = participants.find((part) => part.id === r.participantId);
        return p ? p.fullName : r.participantId;
      },
    },
    {
      key: "session", header: "Session",
      render: (r) => sessions.find((s) => s.id === r.sessionId)?.name ?? r.sessionId,
    },
    {
      key: "contactnumber", header: "Contact Number", render: (r) => {
        const p = participants.find((part) => part.id === r.participantId);
        return p ? p.contactNumber : "";
      }
    },
    { key: "day", header: "Day" },
    {
      key: "location", header: "Location",
      render: (r) => locations.find((l) => l.id === r.locationId)?.name ?? r.locationId,
    },
    // { key: "paymentPlanType", header: "Payment Plan", render: (r) => r.paymentPlanType },
    {
      key: "status", header: "Status",
      render: (r) => <StatusBadge status={r.status || "Active"} />,
    },
    {
      key: "actions", header: "Actions",
      render: (r) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => setSelected(r)} title="View Details">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => {
            setReEnrolSelected(r);
            setReEnrolForm({ sessionId: "", paymentPlanType: "" });
            setReEnrolOpen(true);
          }} title="Re-enrol">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Enrolments"
        description={`${enrolments.length} total`}
        actions={
          <>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
            <Button onClick={() => setAddOpen(true)}>Add Enrolment</Button>
          </>
        }
      />

      <div className="p-6">
        <DataTable
          data={paginated}
          columns={columns}
          searchPlaceholder="Quick search…"
          filters={
            <div className="flex flex-wrap gap-2">
              <Select value={dayFilter} onValueChange={setDayFilter}>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Day" /></SelectTrigger>
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
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Session" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  {sessions.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        />
      </div>

      {/* ── Detail Drawer with tabs ── */}
      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader className="my-4">
            <SheetTitle>Enrolment Details</SheetTitle>
          </SheetHeader>
          {selected && (
            <EnrolmentDetail
              enrolment={selected}
              participants={participants}
              sessions={sessions}
              locations={locations}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* ── Add Enrolment Drawer ── */}
      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader className="my-4">
            <SheetTitle>Add Enrolment</SheetTitle>
            <SheetDescription>Create a new enrolment.</SheetDescription>
          </SheetHeader>
          <form className="space-y-4 pb-6" onSubmit={handleCreate}>
            {formError && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{formError}</div>
            )}
            <div className="space-y-1.5">
              <Label>Participant</Label>
              <Select value={form.participantId} onValueChange={(val) => setForm((f) => ({ ...f, participantId: val }))}>
                <SelectTrigger><SelectValue placeholder="Select participant" /></SelectTrigger>
                <SelectContent>
                  {participants.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.firstNameEn} {p.lastNameEn} {p.uniqueId ? `(${p.uniqueId})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Select value={form.locationId} onValueChange={(val) => setForm((f) => ({ ...f, locationId: val, sessionId: "" }))}>
                <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                <SelectContent>
                  {locations.map((l) => (
                    <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Session</Label>
              <Select value={form.sessionId} onValueChange={(val) => setForm((f) => ({ ...f, sessionId: val }))} disabled={!form.locationId}>
                <SelectTrigger><SelectValue placeholder="Select session" /></SelectTrigger>
                <SelectContent>
                  {sessions
                    .filter((s) => s.locations.some((sl) => sl.locationId === form.locationId))
                    .map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Payment Plan Type</Label>
              <Select value={form.paymentPlanType} onValueChange={(val) => setForm((f) => ({ ...f, paymentPlanType: val }))}>
                <SelectTrigger><SelectValue placeholder="Select plan type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL">Full</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="SEASONAL">Seasonal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button type="submit">Create Enrolment</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* ── Re-enrol Drawer ── */}
      <Sheet open={reEnrolOpen} onOpenChange={setReEnrolOpen}>
        <SheetContent className="w-full sm:max-w-md">
          <SheetHeader className="my-4">
            <SheetTitle>Re-enrol</SheetTitle>
            <SheetDescription>Re-enrol participant for a new session.</SheetDescription>
          </SheetHeader>
          <form className="space-y-4 pb-6" onSubmit={handleReEnrol}>
            {reEnrolError && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{reEnrolError}</div>
            )}
            <div className="space-y-1.5">
              <Label>Session</Label>
              <Select value={reEnrolForm.sessionId} onValueChange={(val) => setReEnrolForm((f) => ({ ...f, sessionId: val }))}>
                <SelectTrigger><SelectValue placeholder="Select session" /></SelectTrigger>
                <SelectContent>
                  {sessions
                    .filter((s) => reEnrolSelected && s.locations.some((sl) => sl.locationId === reEnrolSelected.locationId))
                    .map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Payment Plan Type</Label>
              <Select value={reEnrolForm.paymentPlanType} onValueChange={(val) => setReEnrolForm((f) => ({ ...f, paymentPlanType: val }))}>
                <SelectTrigger><SelectValue placeholder="Select plan type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="FULL">Full</SelectItem>
                  <SelectItem value="MONTHLY">Monthly</SelectItem>
                  <SelectItem value="SEASONAL">Seasonal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setReEnrolOpen(false)}>Cancel</Button>
              <Button type="submit">Re-enrol</Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

// ── Enrolment Detail with tabs ────────────────────────────────────────────────
function EnrolmentDetail({
  enrolment,
  participants,
  sessions,
  locations,
}: {
  enrolment: Enrolment;
  participants: Participant[];
  sessions: Session[];
  locations: Location[];
}) {
  const participant = participants.find((p) => p.id === enrolment.participantId);
  const session = sessions.find((s) => s.id === enrolment.sessionId);
  const location = locations.find((l) => l.id === enrolment.locationId);

  return (
    <Tabs defaultValue="overview" className="mt-2">
      <TabsList className="w-full">
        <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
      </TabsList>

      {/* ── Overview ── */}
      <TabsContent value="overview" className="mt-4 space-y-3">
        <Info label="Participant" value={participant ? `${participant.firstNameEn} ${participant.lastNameEn}` : "—"} />
        <Info label="Session" value={session?.name ?? "—"} />
        <Info label="Location" value={location?.name ?? "—"} />
        <Info label="Payment Plan" value={enrolment.paymentPlanType} />
        <Info label="Status" value={<StatusBadge status={enrolment.status || "Active"} />} />
      </TabsContent>
    </Tabs>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md bg-muted/30 p-2.5">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-medium">{value}</p>
    </div>
  );
}
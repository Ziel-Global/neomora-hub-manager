import { createFileRoute } from "@tanstack/react-router";
import { type ReactNode } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Download,
  ListOrdered,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { mockParticipants } from "@/data/mockParticipants";
import { mockSessions } from "@/data/mockSessions";

export const Route = createFileRoute("/location-manager/reports")({
  component: ReportsPage,
});

const RIYADH_ID = "loc-riy";
const RIYADH_NAME = "Riyadh Academy";
const RIYADH_CODE = "RIYADH";

const PIE_COLORS = ["var(--brand)", "#2d5f68", "#408a5b", "#d8a93d", "#7a5d2d", "#7c8b9b"];

function ReportsPage() {
  const participants = mockParticipants.filter((participant) => participant.location === RIYADH_CODE);
  const sessions = mockSessions.filter((session) => session.locationId === RIYADH_ID);

  const totalParticipants = participants.length;
  const activeCount = participants.filter((participant) => participant.status === "Active").length;
  const waitlistCount = participants.filter((participant) => participant.status === "WaitList").length;
  const sessionCapacity = sessions.reduce((sum, session) => sum + session.capacity, 0);
  const enrolledCapacity = sessions.reduce((sum, session) => sum + session.enrolledCount, 0);
  const utilisation = sessionCapacity === 0 ? 0 : Math.round((enrolledCapacity / sessionCapacity) * 100);

  const statusBreakdown = [
    "Active",
    "WaitList",
    "Inquiry",
    "Documents Pending",
    "Fee Pending",
    "On Hold",
    "Completed",
    "Withdrawn",
  ]
    .map((status) => ({
      name: status,
      value: participants.filter((participant) => participant.status === status).length,
    }))
    .filter((entry) => entry.value > 0);

  const enrolmentBySession = groupBySession(participants.filter((participant) => participant.status === "Active"));
  const waitlistBySession = groupBySession(participants.filter((participant) => participant.status === "WaitList"));

  const capacityByDay = [...sessions]
    .sort((left, right) => left.startDate.localeCompare(right.startDate))
    .map((session) => ({
      day: formatDay(session.startDate),
      enrolled: session.enrolledCount,
      capacity: session.capacity,
    }));

  return (
    <>
      <PageHeader title="Reports" description={RIYADH_NAME} />
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Participants"
            value={String(totalParticipants)}
            change={`${activeCount} active`}
            trend="up"
            icon={Users}
          />
          <MetricCard
            title="Active Enrolments"
            value={String(activeCount)}
            change={`${Math.round((activeCount / Math.max(totalParticipants, 1)) * 100)}% of total`}
            trend="up"
            icon={Activity}
          />
          <MetricCard
            title="Waitlist"
            value={String(waitlistCount)}
            change={`${waitlistBySession.reduce((sum, entry) => sum + entry.value, 0)} session requests`}
            trend="neutral"
            icon={ListOrdered}
          />
          <MetricCard
            title="Session Capacity"
            value={`${enrolledCapacity}/${sessionCapacity}`}
            change={`${utilisation}% utilised`}
            trend={utilisation >= 80 ? "up" : "neutral"}
            icon={CalendarDays}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <Panel title="Total Participants Breakdown" subtitle="All participant statuses at Riyadh Academy">
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={88}
                    paddingAngle={2}
                    label={({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`}
                  >
                    {statusBreakdown.map((_, index) => (
                      <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [value, name]}
                    contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Active Enrolments by Session" subtitle="Enrolled participants grouped by session time">
            <div className="h-72 w-full">
              <ResponsiveContainer>
               <BarChart data={enrolmentBySession} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="value" fill="var(--brand)" name="Active Enrolments" radius={[6, 6, 0, 0]} maxBarSize={66} />
               </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Waitlist by Session" subtitle="Participants waiting for a place by session time">
            <div className="h-72 w-full">
              <ResponsiveContainer>
               <BarChart data={waitlistBySession} barCategoryGap="35%">
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                 <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                 <YAxis stroke="var(--muted-foreground)" fontSize={12} allowDecimals={false} />
                 <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                 <Legend />
                 <Bar dataKey="value" fill="var(--brand)" name="Waitlist" radius={[6, 6, 0, 0]} maxBarSize={66} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Session Capacities by Day" subtitle="Capacity versus enrolled counts for each session day">
            <div className="h-72 w-full">
              <ResponsiveContainer>
               <BarChart data={capacityByDay} barCategoryGap="35%" barGap={4}>
                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                 <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                 <YAxis stroke="var(--muted-foreground)" fontSize={12} allowDecimals={false} />
                 <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                 <Legend />
                 <Bar dataKey="capacity" fill="var(--muted-foreground)" name="Capacity" opacity={0.28} radius={[6, 6, 0, 0]} maxBarSize={66} />
                 <Bar dataKey="enrolled" fill="var(--brand)" name="Enrolled" radius={[6, 6, 0, 0]} maxBarSize={66} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

function groupBySession(participants: { session: string }[]) {
  const counts = participants.reduce<Record<string, number>>((accumulator, participant) => {
    accumulator[participant.session] = (accumulator[participant.session] ?? 0) + 1;
    return accumulator;
  }, {});

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

function formatDay(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

function MetricCard({ title, value, change, trend, icon: Icon }: { title: string; value: string; change: string; trend: "up" | "down" | "neutral"; icon: typeof Users; }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">{value}</h3>
        <div className="mt-1 flex items-center text-xs">
          {trend === "up" && <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />}
          {trend === "down" && <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />}
          {trend === "neutral" && <span className="mr-1 text-muted-foreground">-</span>}
          <span
            className={
              trend === "up"
                ? "font-medium text-emerald-500"
                : trend === "down"
                  ? "font-medium text-red-500"
                  : "text-muted-foreground"
            }
          >
            {change}
          </span>
          <span className="ml-1 text-muted-foreground">vs current location</span>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
      {children}
    </div>
  );
}

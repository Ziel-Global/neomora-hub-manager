// import { createFileRoute } from "@tanstack/react-router";
// import { Download } from "lucide-react";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell,
//   LineChart, Line, PieChart, Pie
// } from "recharts";
// import { PageHeader } from "@/components/PageHeader";
// import { Button } from "@/components/ui/button";

// export const Route = createFileRoute("/staff/reports")({
//   component: StaffReportsPage,
// });

// const attendanceData = [
//   { week: "Week 1", attendance: 92 },
//   { week: "Week 2", attendance: 95 },
//   { week: "Week 3", attendance: 88 },
//   { week: "Week 4", attendance: 96 },
//   { week: "Week 5", attendance: 91 },
//   { week: "Week 6", attendance: 98 },
//     { week: "Week 7", attendance: 78 },
//   { week: "Week 8", attendance: 92 },
//   { week: "Week 9", attendance: 85 },
//   { week: "Week 10", attendance: 90 },
//     { week: "Week 11", attendance: 99 },
//   { week: "Week 12", attendance: 88 },


// ];

// const sessionData = [
//   { session: "4:30 - 5:45 PM", enrolled: 18, capacity: 20 },
//   { session: "5:45 - 7:00 PM", enrolled: 25, capacity: 25 },
// ];

// const squadData = [
//   { name: "U8", value: 12 },
//   { name: "U10", value: 18 },
//   { name: "U12", value: 14 },
//   { name: "U14", value: 8 },
// ];

// function StaffReportsPage() {
//   return (
//     <>
//       <PageHeader title="Reports" />

//       <div className="space-y-6 p-6">

//         {/* Attendance Chart */}
//         <Panel title="Total Attendance Rate" subtitle="Percentage of students attending sessions">
//           <div className="h-72 w-full">
//             <ResponsiveContainer>
//               <LineChart data={attendanceData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
//                 <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
//                 <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
//                 <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
//                 <Legend />
//                 <Line type="monotone" dataKey="attendance" stroke="var(--brand)" strokeWidth={3} name="Attendance Rate" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </Panel>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Session Enrollment Chart */}
//           <Panel title="Session Enrolment" subtitle="Current enrolment vs total capacity">
//             <div className="h-64 w-full">
//               <ResponsiveContainer>
//                 <BarChart data={sessionData} layout="vertical" margin={{ left: 30 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
//                   <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
//                   <YAxis type="category" dataKey="session" stroke="var(--muted-foreground)" fontSize={12} width={90} />
//                   <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
//                   <Legend />
//                   <Bar dataKey="capacity" fill="var(--muted-foreground)" name="Capacity" opacity={0.3} radius={[0, 4, 4, 0]} />
//                   <Bar dataKey="enrolled" fill="var(--brand)" name="Enrolled" radius={[0, 4, 4, 0]} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </Panel>

//           {/* Squad Chart */}
//           <Panel title="My Squad Breakdown" subtitle="Distribution by age group">
//             <div className="h-64 w-full">
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={squadData}
//                     dataKey="value"
//                     nameKey="name"
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={50}
//                     outerRadius={80}
//                     label
//                   >
//                     {squadData.map((_, i) => (
//                       <Cell key={i} fill={["#0d5026ff", "#408a5bff", "#443c26ff", "#352c4bff"][i % 4]} />
//                     ))}
//                   </Pie>
//                   <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </Panel>
//         </div>

//       </div>
//     </>
//   );
// }

// function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
//   return (
//     <div className="rounded-xl border bg-card p-5 shadow-sm">
//       <div className="mb-4 flex items-start justify-between">
//         <div>
//           <h3 className="text-base font-semibold">{title}</h3>
//           {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
//         </div>
//         <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
//       </div>
//       {children}
//     </div>
//   );
// }










import { createFileRoute } from "@tanstack/react-router";
import { Download } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell,
  LineChart, Line, PieChart, Pie
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/staff/reports")({
  component: StaffReportsPage,
});

const attendanceData = [
  { week: "Week 1", attendance: 92 },
  { week: "Week 2", attendance: 95 },
  { week: "Week 3", attendance: 88 },
  { week: "Week 4", attendance: 96 },
  { week: "Week 5", attendance: 91 },
  { week: "Week 6", attendance: 98 },
    { week: "Week 7", attendance: 78 },
  { week: "Week 8", attendance: 92 },
  { week: "Week 9", attendance: 85 },
  { week: "Week 10", attendance: 90 },
    { week: "Week 11", attendance: 99 },
  { week: "Week 12", attendance: 88 },


];

const sessionData = [
  { session: "4:30 - 5:45 PM", enrolled: 18, capacity: 20 },
  { session: "5:45 - 7:00 PM", enrolled: 25, capacity: 25 },
];

const squadData = [
  { name: "U8", value: 12 },
  { name: "U10", value: 18 },
  { name: "U12", value: 14 },
  { name: "U14", value: 8 },
];

// Average attendance rate by squad (age group), based on the season so far
const averageAttendanceBySquad = [
  { name: "U8", average: 89 },
  { name: "U10", average: 93 },
  { name: "U12", average: 87 },
  { name: "U14", average: 91 },
];

const overallAverageAttendance = Math.round(
  averageAttendanceBySquad.reduce((sum, squad) => sum + squad.average, 0) / averageAttendanceBySquad.length
);

// Monthly performance trend across skill, fitness and teamwork scores (out of 100)
const monthlyPerformanceData = [
  { month: "Jan", skill: 12, fitness: 48, teamwork: 75 },
  { month: "Feb", skill: 35, fitness: 61, teamwork: 21 },
  { month: "Mar", skill: 68, fitness: 98, teamwork: 20 },
  { month: "Apr", skill: 71, fitness: 99, teamwork: 72 },
  { month: "May", skill: 25, fitness: 70, teamwork: 95 },
  { month: "Jun", skill: 78, fitness: 94, teamwork: 89 },
];

function StaffReportsPage() {
  return (
    <>
      <PageHeader title="Reports" />

      <div className="space-y-6 p-6">

        {/* Attendance Chart */}
        <Panel title="Total Attendance Rate" subtitle="Percentage of students attending sessions">
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="attendance" stroke="var(--brand)" strokeWidth={3} name="Attendance Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Average Attendance Chart */}
        <Panel
          title="Average Attendance"
          subtitle={`Season average by squad · overall ${overallAverageAttendance}%`}
        >
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={averageAttendanceBySquad} barCategoryGap="35%">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  formatter={(v: number) => `${v}%`}
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }}
                />
                <Legend />
                <Bar dataKey="average" fill="var(--brand)" name="Average Attendance" radius={[6, 6, 0, 0]} maxBarSize={66}>
                  {averageAttendanceBySquad.map((_, i) => (
                    <Cell key={i} fill={`color-mix(in oklab, var(--brand) ${100 - i * 8}%, white)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* Monthly Performance Chart */}
        <Panel title="Monthly Performance" subtitle="Average skill, fitness and teamwork scores over time">
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={monthlyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Line type="monotone" dataKey="skill" stroke="var(--brand)" strokeWidth={3} name="Skill" />
                <Line type="monotone" dataKey="fitness" stroke="#408a5b" strokeWidth={3} name="Fitness" />
                <Line type="monotone" dataKey="teamwork" stroke="#d8a93d" strokeWidth={3} name="Teamwork" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Session Enrollment Chart */}
          <Panel title="Session Enrolment" subtitle="Current enrolment vs total capacity">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={sessionData} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis type="category" dataKey="session" stroke="var(--muted-foreground)" fontSize={12} width={90} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="capacity" fill="var(--muted-foreground)" name="Capacity" opacity={0.3} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="enrolled" fill="var(--brand)" name="Enrolled" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* Squad Chart */}
          <Panel title="My Squad Breakdown" subtitle="Distribution by age group">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={squadData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label
                  >
                    {squadData.map((_, i) => (
                      <Cell key={i} fill={["#0d5026ff", "#408a5bff", "#443c26ff", "#352c4bff"][i % 4]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

      </div>
    </>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" /> Export</Button>
      </div>
      {children}
    </div>
  );
}
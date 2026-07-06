import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Users, DollarSign, Activity, TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell,
  LineChart, Line, PieChart, Pie, AreaChart, Area
} from "recharts";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { monthlyRevenue, funnelData, capacityData } from "@/data/mockReports";

export const Route = createFileRoute("/admin/reports")({
  component: ReportsPage,
});

const SAR = (n: number) => `SAR ${n.toLocaleString()}`;

function MetricCard({ title, value, change, trend, icon: Icon, isActive, onClick }: { title: string, value: string, change: string, trend: "up" | "down" | "neutral", icon: any, isActive?: boolean, onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border bg-card p-5 shadow-sm flex flex-col justify-between cursor-pointer transition-all hover:border-brand/50 ${isActive ? 'ring-2 ring-brand border-transparent' : ''}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isActive ? 'bg-brand text-primary-foreground' : 'bg-primary/10 text-primary'}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold">{value}</h3>
        <div className="mt-1 flex items-center text-xs">
          {trend === "up" && <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />}
          {trend === "down" && <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />}
          {trend === "neutral" && <span className="mr-1 text-muted-foreground">-</span>}
          <span className={trend === "up" ? "text-emerald-500 font-medium" : trend === "down" ? "text-red-500 font-medium" : "text-muted-foreground"}>
            {change}
          </span>
          <span className="ml-1 text-muted-foreground">vs last month</span>
        </div>
      </div>
    </div>
  );
}

function ReportsPage() {
  const [activeMetric, setActiveMetric] = useState("revenue");

  const funnelWithDrop = funnelData.map((f, i) => {
    const prev = i > 0 ? funnelData[i - 1].count : f.count;
    const drop = prev === 0 ? 0 : Math.round(((prev - f.count) / prev) * 100);
    return { ...f, drop: i === 0 ? 0 : drop };
  });
// Revenue vs Target variance
  const varianceData = monthlyRevenue.map(d => ({
    month: d.month,
    variance: d.revenue - d.target,
  }));

  // Cumulative revenue
  let runningTotal = 0;
  const cumulativeData = monthlyRevenue.map(d => {
    runningTotal += d.revenue;
    return { month: d.month, cumulative: runningTotal };
  });

  // Capacity utilization %
  const utilizationData = capacityData.map(c => ({
    location: c.location,
    utilization: Math.round((c.enrolled / c.capacity) * 100),
  }));

  // Overall funnel conversion (first stage vs last stage)
  const funnelStart = funnelData[0]?.count ?? 0;
  const funnelEnd = funnelData[funnelData.length - 1]?.count ?? 0;
  const conversionData = [
    { name: "Converted", value: funnelEnd },
    { name: "Lost", value: Math.max(funnelStart - funnelEnd, 0) },
  ];

  // Payment method % share (same source as existing bar chart)
  const paymentMethods = [
    { method: "Bank Transfer", amount: 154000 },
    { method: "Card", amount: 62000 },
    { method: "Cash", amount: 24900 },
  ];
  // Boys vs Girls registration (confirmed counts from register sheet)
  const registrationData = [
    { group: "U6", count: 32, type: "Boys" },
    { group: "U12", count: 32, type: "Boys" },
    { group: "Girls", count: 27, type: "Girls" },
  ];

  // Enquiries - sample/placeholder data, replace with real Customer Enquiries sheet data
  const enquiriesData = [
    { week: "Week 1", enquiries: 18 },
    { week: "Week 2", enquiries: 24 },
    { week: "Week 3", enquiries: 15 },
    { week: "Week 4", enquiries: 30 },
    { week: "Week 5", enquiries: 22 },
  ];
  return (
    <>
      <PageHeader title="Reports" />
      <div className="space-y-6 p-6">

        {/* Metric Cards (5 columns on large screens) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <MetricCard title="Total Revenue" value="SAR 240.9K" change="18%" trend="up" icon={DollarSign} isActive={activeMetric === "revenue"} onClick={() => setActiveMetric("revenue")} />
          <MetricCard title="Avg. Revenue per User" value="SAR 1,130" change="8.4%" trend="up" icon={Activity} isActive={activeMetric === "avg_revenue"} onClick={() => setActiveMetric("avg_revenue")} />

          <MetricCard title="Total Enrolled Participants" value="215" change="31 new" trend="up" icon={Users} isActive={activeMetric === "participants"} onClick={() => setActiveMetric("participants")} />
          <MetricCard title="Total Waitlist" value="12.4k" change="0.4x" trend="up" icon={TrendingUp} isActive={activeMetric === "growth"} onClick={() => setActiveMetric("growth")} />
          <MetricCard title="Monthly Growth" value="1.7%" change="215 / 12.4K" trend="neutral" icon={BarChart3} isActive={activeMetric === "conversion"} onClick={() => setActiveMetric("conversion")} />
        </div>

        {activeMetric === "revenue" && (
          <Panel title="Total Revenue (2025)" subtitle="">
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <BarChart data={monthlyRevenue}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v: number) => SAR(v)} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="target" fill="var(--muted-foreground)" name="Target" radius={[4, 4, 0, 0]} opacity={0.4} />
                  <Bar dataKey="revenue" fill="var(--brand)" name="Revenue" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        )}

        {activeMetric === "participants" && (
          <Panel title="Total Enrolled Partcipants" subtitle="">
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <LineChart data={monthlyRevenue.map(d => ({ month: d.month, participants: Math.floor(d.revenue / 1200) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="participants" stroke="var(--brand)" strokeWidth={3} name="Participants" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        )}

        {activeMetric === "avg_revenue" && (
          <Panel title="Average Revenue per User" subtitle="">
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <LineChart data={monthlyRevenue.map(d => ({ month: d.month, avg: Math.floor(d.revenue / (d.revenue / 1200)) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip formatter={(v: number) => SAR(v)} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="avg" stroke="var(--brand)" strokeWidth={3} name="Avg Revenue" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        )}

        {activeMetric === "growth" && (
          <Panel title="Total Waitlist" subtitle="">
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <BarChart data={monthlyRevenue.map((d, i) => ({ month: d.month, roas: 1.5 + (i * 0.15) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip formatter={(v: number) => `${v.toFixed(1)}x`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="roas" fill="var(--brand)" name="Waitlist" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        )}

        {activeMetric === "conversion" && (
          <Panel title="Monthly Growth" subtitle="">
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <LineChart data={monthlyRevenue.map((d, i) => ({ month: d.month, rate: 1.2 + (i * 0.05) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="rate" stroke="var(--brand)" strokeWidth={3} name="Monthly Growth (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        )}

        <Panel title="Enrolment Funnel" subtitle="From inquiry to completion">
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={funnelWithDrop} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="stage" stroke="var(--muted-foreground)" fontSize={12} width={100} />
                <Tooltip
                  contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }}
                  formatter={(v: number, _n, p) => [`${v} • drop-off ${p.payload.drop}%`, "Count"]}
                />
                <Bar dataKey="count" fill="var(--brand)" radius={[0, 4, 4, 0]}>
                  {funnelWithDrop.map((_, i) => (
                    <Cell key={i} fill={`color-mix(in oklab, var(--brand) ${100 - i * 12}%, white)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground md:grid-cols-5">
            {funnelWithDrop.map((f) => (
              <li key={f.stage} className="rounded-md border p-2">
                <p className="font-semibold text-foreground">{f.stage}</p>
                <p>{f.count} • drop {f.drop}%</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Capacity Utilisation" subtitle="Enrolled vs total capacity per location">
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <BarChart data={capacityData} layout="vertical" margin={{ left: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis type="category" dataKey="location" stroke="var(--muted-foreground)" fontSize={12} width={130} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
                <Bar dataKey="capacity" fill="var(--muted-foreground)" name="Capacity" opacity={0.3} radius={[0, 4, 4, 0]} />
                <Bar dataKey="enrolled" fill="var(--brand)" name="Enrolled" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
           <Panel title="Payment Methods" subtitle="Revenue collected by payment type">
                  <div className="h-64 w-full">
                    <ResponsiveContainer>
                      <BarChart 
                        data={[
                          { method: "Bank Transfer", amount: 154000 },
                          { method: "Card", amount: 62000 },
                          { method: "Cash", amount: 24900 },
                        ]} 
                        layout="vertical" 
                        margin={{ left: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                        <YAxis type="category" dataKey="method" stroke="var(--muted-foreground)" fontSize={12} width={100} />
                        <Tooltip formatter={(v: number) => SAR(v)} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                        <Legend />
                        <Bar dataKey="amount" fill="var(--brand)" name="Collected (SAR)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Panel>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel title="Revenue vs Target Variance" subtitle="Kitna target se upar ya neechy">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={varianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v: number) => SAR(v)} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="variance" name="Variance" radius={[4, 4, 0, 0]}>
                    {varianceData.map((d, i) => (
                      <Cell key={i} fill={d.variance >= 0 ? "var(--brand)" : "#ef4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Cumulative Revenue Growth" subtitle="Running total over the year">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <AreaChart data={cumulativeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v: number) => SAR(v)} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="cumulative" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.25} name="Cumulative Revenue" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <Panel title="Boys vs Girls Registration" subtitle="U8 & U14/16 not yet counted">
  <div className="h-64 w-full">
    <ResponsiveContainer>
      <BarChart data={registrationData} barCategoryGap="40%">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="group" stroke="var(--muted-foreground)" fontSize={12} />
        <YAxis stroke="var(--muted-foreground)" fontSize={12} />
        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
        <Bar dataKey="count" name="Registered" radius={[4, 4, 0, 0]} barSize={100}>
          {registrationData.map((d, i) => (
            <Cell key={i} fill={d.type === "Girls" ? "var(--brand)" : "var(--brand)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
</Panel>

          <Panel title="Enquiries" subtitle="Sample data — replace with Customer Enquiries sheet">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={enquiriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="enquiries" fill="var(--brand)" name="Enquiries" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div> 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel title="Capacity Utilization %" subtitle="Enrolled as % of total capacity">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <BarChart data={utilizationData} layout="vertical" margin={{ left: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
                  <YAxis type="category" dataKey="location" stroke="var(--muted-foreground)" fontSize={12} width={130} />
                  <Tooltip formatter={(v: number) => `${v}%`} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Bar dataKey="utilization" fill="var(--brand)" name="Utilization %" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Overall Funnel Conversion" subtitle="Inquiry to completion">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={conversionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label
                  >
                    <Cell fill="var(--brand)" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        {/* <Panel title="Payment Method Share" subtitle="% distribution of collected revenue">
          <div className="h-64 w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={paymentMethods}
                  dataKey="amount"
                  nameKey="method"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label={(entry) => `${entry.method} (${Math.round((entry.amount / paymentMethods.reduce((s, p) => s + p.amount, 0)) * 100)}%)`}
                >
                  {paymentMethods.map((_, i) => (
                    <Cell key={i} fill={["#0d5026ff", "#408a5bff", "#443c26ff"][i % 3]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => SAR(v)} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel> */}
  
             

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel title="Fee and Payment Breakdown" subtitle="Distribution of collected amounts">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: "AS Paid", value: 45000 },
                      { name: "JS Paid", value: 72000 },
                      { name: "VAT", value: 17550 },
                      { name: "SignUp", value: 12000 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label
                  >
                    {[0, 1, 2, 3].map((_, i) => (
                      <Cell key={i} fill={["#0d5026ff", "#408a5bff", "#443c26ff", "#352c4bff"][i % 4]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => SAR(v)} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Revenue by Location" subtitle="Jeddah vs Riyadh">
            <div className="h-64 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Jeddah", value: 135400 },
                      { name: "Riyadh", value: 105500 },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    label
                  >
                    {[0, 1].map((_, i) => (
                      <Cell key={i} fill={["#204920ff", "#2d5f68ff"][i % 2]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number) => SAR(v)} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
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

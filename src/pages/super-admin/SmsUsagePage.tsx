import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { smsRecords, smsStats, smsChartData } from "@/data/super-admin-data";
import { MessageSquare, Send, AlertTriangle, DollarSign, Users, TrendingUp } from "lucide-react";
import { EmptyState } from "@/components/shared/EmptyState";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function SmsUsagePage() {
  const [search, setSearch] = useState("");

  const filtered = smsRecords.filter(
    (r) => r.tenantName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Communication & SMS Usage" description="Monitor SMS, WhatsApp, and email usage across all tenants" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Sent (This Month)" value={smsStats.totalSentThisMonth.toLocaleString()} change={`${smsStats.deliveryRate}% delivery rate`} changeType="positive" icon={Send} index={0} />
        <StatCard title="Failed Messages" value={smsStats.totalFailed} change="Across all tenants" changeType="negative" icon={AlertTriangle} index={1} />
        <StatCard title="Total Cost" value={`৳${smsStats.totalCost.toLocaleString()}`} icon={DollarSign} index={2} />
        <StatCard title="Active Senders" value={smsStats.activeSenders} change={`Avg ${smsStats.avgPerTenant}/tenant`} changeType="neutral" icon={Users} index={3} />
      </div>

      {/* SMS Volume Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Message Volume (March 2025)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={smsChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid hsl(214, 20%, 90%)' }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="sent" fill="hsl(172, 66%, 30%)" radius={[4, 4, 0, 0]} name="Sent" />
                  <Bar dataKey="failed" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Failed" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tenant Usage Table */}
      <FilterBar
        searchPlaceholder="Search tenants..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: 'plan', label: 'Plan', options: [{ label: 'Basic', value: 'Basic' }, { label: 'Pro', value: 'Pro' }, { label: 'Enterprise', value: 'Enterprise' }] },
        ]}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Tenant SMS Usage</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Tenant</TableHead>
                  <TableHead className="text-xs">Plan</TableHead>
                  <TableHead className="text-xs text-right">Sent</TableHead>
                  <TableHead className="text-xs text-right">Failed</TableHead>
                  <TableHead className="text-xs">Quota Usage</TableHead>
                  <TableHead className="text-xs">Last Sent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="text-sm font-medium">{r.tenantName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[11px] font-normal">{r.plan}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-right font-medium">{r.totalSent.toLocaleString()}</TableCell>
                    <TableCell className="text-sm text-right text-destructive">{r.totalFailed}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <Progress value={r.used} className="h-2 flex-1" />
                        <span className={`text-xs font-medium ${r.used > 90 ? 'text-destructive' : r.used > 70 ? 'text-warning' : 'text-muted-foreground'}`}>
                          {r.used}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{r.lastSent}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length > 10 && (
              <div className="flex items-center justify-center px-4 py-3 border-t">
                <p className="text-xs text-muted-foreground">Showing {Math.min(filtered.length, 10)} of {filtered.length} tenants</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-0">
            <EmptyState
              icon={<MessageSquare className="h-7 w-7 text-muted-foreground" />}
              title="No tenants found"
              description="Try adjusting your search or filters"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

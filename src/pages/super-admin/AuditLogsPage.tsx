import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { DetailDrawer } from "@/components/shared/DetailDrawer";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { FilterBar } from "@/components/shared/FilterBar";
import { auditLogs, type AuditLogEntry } from "@/data/mock-data-extended";
import { StatCard } from "@/components/dashboard/StatCard";
import { ClipboardList, Info, AlertTriangle, ShieldAlert, Download, FileX } from "lucide-react";
import { motion } from "framer-motion";

const levelConfig = {
  info: { icon: <Info className="h-3.5 w-3.5 text-info" />, color: 'bg-info/10 text-info border-info/20', label: 'Info' },
  warning: { icon: <AlertTriangle className="h-3.5 w-3.5 text-warning" />, color: 'bg-warning/10 text-warning border-warning/20', label: 'Warning' },
  critical: { icon: <ShieldAlert className="h-3.5 w-3.5 text-destructive" />, color: 'bg-destructive/10 text-destructive border-destructive/20', label: 'Critical' },
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AuditLogEntry | null>(null);

  const filtered = auditLogs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.tenant.toLowerCase().includes(search.toLowerCase())
  );

  const infoCount = auditLogs.filter(l => l.level === 'info').length;
  const warningCount = auditLogs.filter(l => l.level === 'warning').length;
  const criticalCount = auditLogs.filter(l => l.level === 'critical').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" description="Track all system activities, security events, and administrative actions">
        <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />Export Logs</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Total Events" value={auditLogs.length} icon={ClipboardList} index={0} />
        <StatCard title="Info" value={infoCount} icon={Info} index={1} />
        <StatCard title="Warnings" value={warningCount} change="Review recommended" changeType="neutral" icon={AlertTriangle} index={2} />
        <StatCard title="Critical" value={criticalCount} change="Immediate attention" changeType="negative" icon={ShieldAlert} index={3} />
      </div>

      <FilterBar
        searchPlaceholder="Search by action, tenant, or details..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={[
          { key: 'level', label: 'Level', options: [{ label: 'Info', value: 'info' }, { label: 'Warning', value: 'warning' }, { label: 'Critical', value: 'critical' }] },
        ]}
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <EmptyState
                icon={<FileX className="h-7 w-7 text-muted-foreground" />}
                title="No logs found"
                description="Try adjusting your search or filters"
              />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs w-10">Level</TableHead>
                    <TableHead className="text-xs">Action</TableHead>
                    <TableHead className="text-xs">User</TableHead>
                    <TableHead className="text-xs">Tenant</TableHead>
                    <TableHead className="text-xs">Details</TableHead>
                    <TableHead className="text-xs">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((log) => {
                    const lc = levelConfig[log.level];
                    return (
                      <TableRow key={log.id} className="cursor-pointer" onClick={() => setSelected(log)}>
                        <TableCell>
                          <span className={`inline-flex items-center justify-center h-6 w-6 rounded-md ${lc.color.split(' ')[0]}`}>
                            {lc.icon}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm font-medium">{log.action}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{log.user}</TableCell>
                        <TableCell className="text-sm">{log.tenant}</TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs">
                          <span className="line-clamp-1">{log.details}</span>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap font-mono">{log.timestamp}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Event Detail Drawer */}
      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Event Details"
        description={selected?.action}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${levelConfig[selected.level].color}`}>
                {levelConfig[selected.level].label}
              </span>
              <span className="text-xs text-muted-foreground font-mono">{selected.timestamp}</span>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Action</p>
                <p className="font-medium">{selected.action}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Actor</p>
                <p className="font-medium">{selected.user}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Tenant</p>
                <p className="font-medium">{selected.tenant}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Severity</p>
                <p className="font-medium capitalize">{selected.level}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-xs text-muted-foreground mb-1 font-medium">Details</p>
              <p className="text-sm text-foreground bg-muted/30 p-3 rounded-lg border">{selected.details}</p>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}

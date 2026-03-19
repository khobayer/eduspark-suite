import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auditLogs } from "@/data/mock-data-extended";
import { FilterBar } from "@/components/shared/FilterBar";
import { motion } from "framer-motion";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";

const levelIcons = {
  info: <Info className="h-3.5 w-3.5 text-info" />,
  warning: <AlertTriangle className="h-3.5 w-3.5 text-warning" />,
  critical: <ShieldAlert className="h-3.5 w-3.5 text-destructive" />,
};

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" description="Track all system activities and security events" />

      <FilterBar
        searchPlaceholder="Search logs..."
        filters={[
          { key: 'level', label: 'Level', options: [{ label: 'Info', value: 'info' }, { label: 'Warning', value: 'warning' }, { label: 'Critical', value: 'critical' }] },
        ]}
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs w-8"></TableHead>
                  <TableHead className="text-xs">Action</TableHead>
                  <TableHead className="text-xs">User</TableHead>
                  <TableHead className="text-xs">Tenant</TableHead>
                  <TableHead className="text-xs">Details</TableHead>
                  <TableHead className="text-xs">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{levelIcons[log.level]}</TableCell>
                    <TableCell className="text-sm font-medium">{log.action}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{log.user}</TableCell>
                    <TableCell className="text-sm">{log.tenant}</TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{log.details}</TableCell>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

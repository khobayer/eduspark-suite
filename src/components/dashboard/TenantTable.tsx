import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tenants, type Tenant } from "@/data/mock-data";
import { motion } from "framer-motion";

function StatusBadge({ status }: { status: Tenant['status'] }) {
  const variants: Record<Tenant['status'], string> = {
    active: 'bg-success/10 text-success border-success/20',
    suspended: 'bg-destructive/10 text-destructive border-destructive/20',
    trial: 'bg-warning/10 text-warning border-warning/20',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${variants[status]}`}>
      {status}
    </span>
  );
}

function ModeBadge({ mode }: { mode: Tenant['mode'] }) {
  return (
    <Badge variant="secondary" className="text-[11px] font-normal">
      {mode === 'school' ? '🏫 School' : '📚 Coaching'}
    </Badge>
  );
}

export function TenantTable() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Tenants Overview</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs">Institution</TableHead>
                <TableHead className="text-xs">Mode</TableHead>
                <TableHead className="text-xs">Plan</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right">Students</TableHead>
                <TableHead className="text-xs text-right">Teachers</TableHead>
                <TableHead className="text-xs">Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((t) => (
                <TableRow key={t.id} className="cursor-pointer">
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{t.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.nameBn}</p>
                    </div>
                  </TableCell>
                  <TableCell><ModeBadge mode={t.mode} /></TableCell>
                  <TableCell className="text-sm capitalize">{t.plan}</TableCell>
                  <TableCell><StatusBadge status={t.status} /></TableCell>
                  <TableCell className="text-right text-sm font-medium">{t.students.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">{t.teachers}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{t.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}

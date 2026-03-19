import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supportTickets } from "@/data/mock-data-extended";
import { motion } from "framer-motion";

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/10 text-info border-info/20",
  high: "bg-warning/10 text-warning border-warning/20",
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function SupportTicketsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Support Tickets" description="Manage tenant support requests" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs">Ticket</TableHead>
                  <TableHead className="text-xs">Subject</TableHead>
                  <TableHead className="text-xs">Tenant</TableHead>
                  <TableHead className="text-xs">Priority</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Last Reply</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supportTickets.map((t) => (
                  <TableRow key={t.id} className="cursor-pointer">
                    <TableCell className="text-sm font-mono text-muted-foreground">{t.ticketNo}</TableCell>
                    <TableCell className="text-sm font-medium">{t.subject}</TableCell>
                    <TableCell className="text-sm">{t.tenant}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${priorityColors[t.priority]}`}>
                        {t.priority}
                      </span>
                    </TableCell>
                    <TableCell><StatusBadge status={t.status} /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.lastReply}</TableCell>
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

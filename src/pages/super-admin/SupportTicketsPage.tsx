import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { supportTickets } from "@/data/mock-data-extended";
import { StatCard } from "@/components/dashboard/StatCard";
import { LifeBuoy, Clock, CheckCircle2, AlertTriangle, Plus, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground border-border",
  medium: "bg-info/10 text-info border-info/20",
  high: "bg-warning/10 text-warning border-warning/20",
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function SupportTicketsPage() {
  const openCount = supportTickets.filter(t => t.status === 'open').length;
  const pendingCount = supportTickets.filter(t => t.status === 'pending').length;
  const closedCount = supportTickets.filter(t => t.status === 'closed').length;
  const urgentCount = supportTickets.filter(t => t.priority === 'urgent' || t.priority === 'high').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Support Tickets" description="Manage tenant support requests and track resolution">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Ticket</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard title="Open Tickets" value={openCount} icon={LifeBuoy} index={0} />
        <StatCard title="Pending Reply" value={pendingCount} change="Awaiting response" changeType="neutral" icon={Clock} index={1} />
        <StatCard title="Resolved" value={closedCount} icon={CheckCircle2} index={2} />
        <StatCard title="High Priority" value={urgentCount} change="Needs attention" changeType="negative" icon={AlertTriangle} index={3} />
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="open">Open ({openCount})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="closed">Closed ({closedCount})</TabsTrigger>
        </TabsList>

        {['all', 'open', 'pending', 'closed'].map(tab => (
          <TabsContent key={tab} value={tab}>
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
                        <TableHead className="text-xs">Created</TableHead>
                        <TableHead className="text-xs">Last Reply</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supportTickets
                        .filter(t => tab === 'all' || t.status === tab)
                        .map((t) => (
                          <TableRow key={t.id} className="cursor-pointer">
                            <TableCell className="text-sm font-mono text-muted-foreground">{t.ticketNo}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                <span className="text-sm font-medium">{t.subject}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{t.tenant}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${priorityColors[t.priority]}`}>
                                {t.priority}
                              </span>
                            </TableCell>
                            <TableCell><StatusBadge status={t.status} /></TableCell>
                            <TableCell className="text-sm text-muted-foreground">{t.createdAt}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{t.lastReply}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

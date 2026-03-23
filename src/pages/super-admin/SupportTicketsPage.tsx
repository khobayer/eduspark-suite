import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DetailDrawer } from "@/components/shared/DetailDrawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { supportTickets, type SupportTicket } from "@/data/mock-data-extended";
import { StatCard } from "@/components/dashboard/StatCard";
import { LifeBuoy, Clock, CheckCircle2, AlertTriangle, Plus, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground border-border",
  medium: "bg-info/10 text-info border-info/20",
  high: "bg-warning/10 text-warning border-warning/20",
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
};

const ticketTimeline = [
  { time: '2 hours ago', user: 'Farhan Ahmed (Support)', message: 'Looking into this issue. Can you share a screenshot of the error?', isInternal: false },
  { time: '3 hours ago', user: 'Dhaka Model School', message: 'We are unable to generate report cards for Class 10 students. The page shows a blank screen.', isInternal: false },
  { time: '3 hours ago', user: 'System', message: 'Ticket created and assigned to Support team.', isInternal: true },
];

export default function SupportTicketsPage() {
  const [selected, setSelected] = useState<SupportTicket | null>(null);
  const [reply, setReply] = useState("");

  const openCount = supportTickets.filter(t => t.status === 'open').length;
  const pendingCount = supportTickets.filter(t => t.status === 'pending').length;
  const closedCount = supportTickets.filter(t => t.status === 'closed').length;
  const urgentCount = supportTickets.filter(t => t.priority === 'urgent' || t.priority === 'high').length;

  const handleReply = () => {
    if (reply.trim()) {
      toast.success("Reply sent successfully!");
      setReply("");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Support Tickets" titleBn="সাপোর্ট টিকেট" description="Manage tenant support requests and track resolution" descriptionBn="প্রতিষ্ঠানের সাপোর্ট অনুরোধ পরিচালনা এবং সমাধান ট্র্যাক করুন">
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
                          <TableRow key={t.id} className="cursor-pointer" onClick={() => setSelected(t)}>
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

      {/* Ticket Detail Drawer */}
      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.subject || ""}
        description={selected?.ticketNo}
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Tenant</p>
                <p className="font-medium">{selected.tenant}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Priority</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border capitalize ${priorityColors[selected.priority]}`}>
                  {selected.priority}
                </span>
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Status</p>
                <StatusBadge status={selected.status} />
              </div>
              <div>
                <p className="text-muted-foreground text-xs mb-0.5">Created</p>
                <p className="font-medium">{selected.createdAt}</p>
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">Conversation</p>
              <div className="space-y-4">
                {ticketTimeline.map((entry, i) => (
                  <div key={i} className={`p-3 rounded-lg border ${entry.isInternal ? 'bg-muted/30 border-dashed' : 'bg-card'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-medium text-foreground">{entry.user}</p>
                      <span className="text-[10px] text-muted-foreground">{entry.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.message}</p>
                    {entry.isInternal && <Badge variant="outline" className="text-[9px] mt-1">System</Badge>}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Reply */}
            <div className="space-y-2">
              <Textarea
                placeholder="Type your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="bg-secondary border-0 min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button size="sm" className="flex-1" onClick={handleReply}>
                  <Send className="h-3.5 w-3.5 mr-1" />Reply
                </Button>
                {selected.status !== 'closed' && (
                  <Button size="sm" variant="outline" onClick={() => { toast.success("Ticket closed."); setSelected(null); }}>
                    Close Ticket
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}

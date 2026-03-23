import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { DetailDrawer } from "@/components/shared/DetailDrawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  admissionApplications, admissionStats, admissionFunnelData, admissionSourceData,
  admissionMonthlyData, stageLabels, sourceLabels, type AdmissionApplication,
} from "@/data/admission-data";
import {
  UserPlus, Users, CheckCircle2, XCircle, Clock, TrendingUp, Plus,
  MoreHorizontal, Eye, FileCheck, Calendar, UserCheck, Ban, ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { useLocale } from "@/contexts/LocaleContext";
import { LocaleLabel } from "@/components/shared/LocaleLabel";

const stageColors: Record<string, string> = {
  inquiry: 'bg-muted text-muted-foreground border-border',
  applied: 'bg-info/10 text-info border-info/20',
  document_review: 'bg-warning/10 text-warning border-warning/20',
  test_scheduled: 'bg-accent text-accent-foreground border-border',
  interview: 'bg-primary/10 text-primary border-primary/20',
  approved: 'bg-success/10 text-success border-success/20',
  enrolled: 'bg-success/10 text-success border-success/20',
  rejected: 'bg-destructive/10 text-destructive border-destructive/20',
  cancelled: 'bg-muted text-muted-foreground border-border',
};

export default function AdmissionPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AdmissionApplication | null>(null);

  const filtered = admissionApplications.filter(
    (a) =>
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.applicationNo.toLowerCase().includes(search.toLowerCase()) ||
      a.applyingFor.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Admission" titleBn="ভর্তি" description="Manage admission applications, inquiries, and enrollment flow">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />New Application</Button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Applications" titleBn="মোট আবেদন" value={admissionStats.totalApplications} icon={UserPlus} index={0} />
        <StatCard title="In Progress" titleBn="চলমান" value={admissionStats.inProgress} change="Under review" changeType="neutral" icon={Clock} index={1} />
        <StatCard title="Enrolled" titleBn="ভর্তি হয়েছে" value={admissionStats.enrolled} change={`${admissionStats.conversionRate}% conversion`} changeType="positive" icon={CheckCircle2} index={2} />
        <StatCard title="Avg Processing" titleBn="গড় সময়" value={`${admissionStats.avgProcessingDays}d`} icon={TrendingUp} index={3} />
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="applications">Applications / আবেদন</TabsTrigger>
          <TabsTrigger value="funnel">Funnel / ফানেল</TabsTrigger>
          <TabsTrigger value="analytics">Analytics / বিশ্লেষণ</TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <FilterBar
            searchPlaceholder="Search by name, application no, class..."
            searchValue={search}
            onSearchChange={setSearch}
            filters={[
              { key: 'stage', label: 'Stage', options: Object.entries(stageLabels).map(([v, l]) => ({ label: l, value: v })) },
              { key: 'class', label: 'Class', options: ['Class 6', 'Class 7', 'Class 8', 'Class 9'].map(c => ({ label: c, value: c })) },
              { key: 'source', label: 'Source', options: Object.entries(sourceLabels).map(([v, l]) => ({ label: l, value: v })) },
            ]}
          />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Applicant</TableHead>
                      <TableHead className="text-xs">Application #</TableHead>
                      <TableHead className="text-xs">Applying For</TableHead>
                      <TableHead className="text-xs">Source</TableHead>
                      <TableHead className="text-xs">Stage</TableHead>
                      <TableHead className="text-xs">Submitted</TableHead>
                      <TableHead className="text-xs">Fee</TableHead>
                      <TableHead className="text-xs w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((app) => (
                      <TableRow key={app.id} className="cursor-pointer" onClick={() => setSelected(app)}>
                        <TableCell>
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                                {app.studentName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{app.studentName}</p>
                              <p className="text-[11px] text-muted-foreground">{app.studentNameBn}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm font-mono text-muted-foreground">{app.applicationNo}</TableCell>
                        <TableCell className="text-sm">{app.applyingFor}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="text-[10px] font-normal capitalize">{sourceLabels[app.source]}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${stageColors[app.stage]}`}>
                            {stageLabels[app.stage]}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{app.submittedAt}</TableCell>
                        <TableCell>
                          {app.admissionFee.paid ? (
                            <Badge variant="secondary" className="text-[10px] bg-success/10 text-success border-success/20">Paid</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-[10px]">Unpaid</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setSelected(app)}><Eye className="h-3.5 w-3.5 mr-2" />View</DropdownMenuItem>
                              <DropdownMenuItem><FileCheck className="h-3.5 w-3.5 mr-2" />Review Documents</DropdownMenuItem>
                              <DropdownMenuItem><Calendar className="h-3.5 w-3.5 mr-2" />Schedule Test</DropdownMenuItem>
                              <DropdownMenuItem><UserCheck className="h-3.5 w-3.5 mr-2" />Approve</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive"><Ban className="h-3.5 w-3.5 mr-2" />Reject</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Funnel Tab */}
        <TabsContent value="funnel" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Admission Funnel / ভর্তি ফানেল</CardTitle>
                <p className="text-xs text-muted-foreground">Current admission cycle conversion rates</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {admissionFunnelData.map((stage, i) => {
                    const maxCount = admissionFunnelData[0].count;
                    const pct = Math.round((stage.count / maxCount) * 100);
                    return (
                      <div key={stage.stage} className="flex items-center gap-4">
                        <span className="text-sm font-medium w-28 shrink-0">{stage.stage}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="h-full rounded-full flex items-center justify-end pr-3"
                                style={{ backgroundColor: stage.color }}
                              >
                                <span className="text-xs font-bold text-white">{stage.count}</span>
                              </motion.div>
                            </div>
                            <span className="text-xs text-muted-foreground w-10">{pct}%</span>
                          </div>
                        </div>
                        {i < admissionFunnelData.length - 1 && (
                          <ArrowRight className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Monthly Applications vs Enrollment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={admissionMonthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                        <Legend wrapperStyle={{ fontSize: 12 }} />
                        <Bar dataKey="applications" fill="hsl(210, 14%, 70%)" radius={[4, 4, 0, 0]} name="Applications" />
                        <Bar dataKey="enrolled" fill="hsl(172, 66%, 30%)" radius={[4, 4, 0, 0]} name="Enrolled" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">Application Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={admissionSourceData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                          {admissionSourceData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    {admissionSourceData.map(d => (
                      <div key={d.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: d.fill }} />
                          <span className="text-muted-foreground">{d.name}</span>
                        </div>
                        <span className="font-medium">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detail Drawer */}
      <DetailDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.studentName || ""}
        description={selected?.applicationNo}
      >
        {selected && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {selected.studentName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{selected.studentName}</p>
                <p className="text-sm text-muted-foreground">{selected.studentNameBn}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border mt-1 ${stageColors[selected.stage]}`}>
                  {stageLabels[selected.stage]}
                </span>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-muted-foreground text-xs mb-0.5">Applying For</p><p className="font-medium">{selected.applyingFor}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Date of Birth</p><p className="font-medium">{selected.dob}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Father</p><p className="font-medium">{selected.fatherName}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Mother</p><p className="font-medium">{selected.motherName}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Previous School</p><p className="font-medium">{selected.previousSchool}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Previous Result</p><p className="font-medium">{selected.previousResult}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Phone</p><p className="font-medium">{selected.phone}</p></div>
              <div><p className="text-muted-foreground text-xs mb-0.5">Source</p><p className="font-medium">{sourceLabels[selected.source]}</p></div>
              {selected.testScore && (
                <div><p className="text-muted-foreground text-xs mb-0.5">Test Score</p><p className="font-semibold text-primary">{selected.testScore}/100</p></div>
              )}
              {selected.interviewDate && (
                <div><p className="text-muted-foreground text-xs mb-0.5">Interview Date</p><p className="font-medium">{selected.interviewDate}</p></div>
              )}
            </div>

            <Separator />

            {/* Documents */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Documents</p>
              {selected.documents.length > 0 ? (
                <div className="space-y-2">
                  {selected.documents.map(doc => (
                    <div key={doc.name} className="flex items-center justify-between p-2 rounded-lg border">
                      <span className="text-sm">{doc.name}</span>
                      <StatusBadge status={doc.status} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">No documents uploaded</p>
              )}
            </div>

            <Separator />

            {/* Guardians */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Guardians</p>
              <div className="space-y-2">
                {selected.guardians.map((g, i) => (
                  <div key={i} className="p-3 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{g.name}</p>
                      <Badge variant="secondary" className="text-[10px]">{g.relation}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{g.phone} · {g.occupation}</p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Admission Fee */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border">
              <div>
                <p className="text-xs text-muted-foreground">Admission Fee</p>
                <p className="text-lg font-bold text-foreground">৳{selected.admissionFee.amount.toLocaleString()}</p>
              </div>
              {selected.admissionFee.paid ? (
                <Badge className="bg-success/10 text-success border-success/20">Paid via {selected.admissionFee.method}</Badge>
              ) : (
                <Badge variant="secondary">Unpaid</Badge>
              )}
            </div>

            {selected.notes && (
              <div className="p-3 rounded-lg bg-muted/30 border">
                <p className="text-xs text-muted-foreground mb-1">Notes</p>
                <p className="text-sm">{selected.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-2 flex-wrap">
              {selected.stage === 'approved' && (
                <Button size="sm" className="flex-1"><UserCheck className="h-3.5 w-3.5 mr-1" />Convert to Student</Button>
              )}
              {['inquiry', 'applied', 'document_review'].includes(selected.stage) && (
                <Button size="sm" className="flex-1"><ArrowRight className="h-3.5 w-3.5 mr-1" />Advance Stage</Button>
              )}
              {!['enrolled', 'rejected', 'cancelled'].includes(selected.stage) && (
                <Button size="sm" variant="destructive" className="flex-1"><Ban className="h-3.5 w-3.5 mr-1" />Reject</Button>
              )}
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}

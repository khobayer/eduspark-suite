import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  studentProfile, studentAttendanceSummary, studentMonthlyAttendance,
  studentFees, studentResults, studentNotices,
} from "@/data/student-portal-data";
import {
  User, CalendarCheck, Wallet, Award, Bell, IdCard, CreditCard,
  Download, FileText, CheckCircle2, Clock, AlertTriangle,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { useLocale } from "@/contexts/LocaleContext";
import { LocaleLabel } from "@/components/shared/LocaleLabel";

const categoryIcons: Record<string, string> = {
  event: '🎉', exam: '📝', holiday: '🏖️', academic: '📚', general: '📋',
};

export default function StudentPortalPage() {
  const totalFees = studentFees.reduce((a, f) => a + f.amount, 0);
  const totalPaid = studentFees.reduce((a, f) => a + f.paid, 0);
  const totalDue = totalFees - totalPaid;
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title="Student Portal" titleBn="ছাত্র পোর্টাল" description="Your academic dashboard, results, fees, and notices" descriptionBn="আপনার একাডেমিক ড্যাশবোর্ড, ফলাফল, ফি এবং নোটিশ" />

      {/* Profile Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                  {studentProfile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">{studentProfile.name}</h2>
                <p className="text-sm text-muted-foreground">{studentProfile.nameBn}</p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <Badge variant="secondary">{studentProfile.class} · Section {studentProfile.section}</Badge>
                  <Badge variant="outline">Roll: {studentProfile.roll}</Badge>
                  <Badge variant="outline">ID: {studentProfile.id}</Badge>
                  <Badge variant="outline">Session: {studentProfile.session}</Badge>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button size="sm" variant="outline"><IdCard className="h-3.5 w-3.5 mr-1" />{t("ID Card", "আইডি কার্ড")}</Button>
                <Button size="sm" variant="outline"><CreditCard className="h-3.5 w-3.5 mr-1" />{t("Admit Card", "প্রবেশপত্র")}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Attendance" titleBn="উপস্থিতি" value={`${studentAttendanceSummary.percentage}%`} change={`${studentAttendanceSummary.present}/${studentAttendanceSummary.totalDays} days`} changeType="positive" icon={CalendarCheck} index={0} />
        <StatCard title="Total Due" titleBn="বকেয়া" value={`৳${totalDue.toLocaleString()}`} change={totalDue > 0 ? 'Payment due' : 'All clear'} changeType={totalDue > 0 ? 'negative' : 'positive'} icon={Wallet} index={1} />
        <StatCard title="Last GPA" titleBn="সর্বশেষ জিপিএ" value={studentResults[0].gpa.toFixed(2)} change={`Grade ${studentResults[0].grade}`} changeType="positive" icon={Award} index={2} />
        <StatCard title="Notices" titleBn="নোটিশ" value={studentNotices.length} change="This week" changeType="neutral" icon={Bell} index={3} />
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="profile"><LocaleLabel en="Profile" bn="প্রোফাইল" /></TabsTrigger>
          <TabsTrigger value="attendance"><LocaleLabel en="Attendance" bn="উপস্থিতি" /></TabsTrigger>
          <TabsTrigger value="fees"><LocaleLabel en="Fees" bn="ফি" /></TabsTrigger>
          <TabsTrigger value="results"><LocaleLabel en="Results" bn="ফলাফল" /></TabsTrigger>
          <TabsTrigger value="notices"><LocaleLabel en="Notices" bn="নোটিশ" /></TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Personal Information / ব্যক্তিগত তথ্য</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                  {[
                    { label: 'Full Name', value: studentProfile.name },
                    { label: 'Date of Birth', value: studentProfile.dob },
                    { label: 'Gender', value: studentProfile.gender },
                    { label: 'Blood Group', value: studentProfile.bloodGroup },
                    { label: 'Phone', value: studentProfile.phone },
                    { label: 'Email', value: studentProfile.email },
                    { label: 'Address', value: studentProfile.address },
                    { label: 'Admission Date', value: studentProfile.admissionDate },
                    { label: 'Father\'s Name', value: studentProfile.fatherName },
                    { label: 'Mother\'s Name', value: studentProfile.motherName },
                    { label: 'Guardian Phone', value: studentProfile.guardianPhone },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="border"><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{studentAttendanceSummary.present}</p>
              <p className="text-xs text-muted-foreground">Present</p>
            </CardContent></Card>
            <Card className="border"><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{studentAttendanceSummary.absent}</p>
              <p className="text-xs text-muted-foreground">Absent</p>
            </CardContent></Card>
            <Card className="border"><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">{studentAttendanceSummary.late}</p>
              <p className="text-xs text-muted-foreground">Late</p>
            </CardContent></Card>
            <Card className="border"><CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{studentAttendanceSummary.percentage}%</p>
              <p className="text-xs text-muted-foreground">Overall</p>
            </CardContent></Card>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">Monthly Attendance / মাসিক উপস্থিতি</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentMonthlyAttendance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                      <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                      <Bar dataKey="present" fill="hsl(142, 60%, 40%)" radius={[4, 4, 0, 0]} name="Present" />
                      <Bar dataKey="absent" fill="hsl(0, 72%, 51%)" radius={[4, 4, 0, 0]} name="Absent" />
                      <Bar dataKey="late" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} name="Late" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border"><CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Total Fees</p>
              <p className="text-xl font-bold text-foreground">৳{totalFees.toLocaleString()}</p>
            </CardContent></Card>
            <Card className="border"><CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Paid</p>
              <p className="text-xl font-bold text-success">৳{totalPaid.toLocaleString()}</p>
            </CardContent></Card>
            <Card className="border"><CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Due</p>
              <p className="text-xl font-bold text-destructive">৳{totalDue.toLocaleString()}</p>
            </CardContent></Card>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs">Fee Head</TableHead>
                      <TableHead className="text-xs">Period</TableHead>
                      <TableHead className="text-xs text-right">Amount</TableHead>
                      <TableHead className="text-xs text-right">Paid</TableHead>
                      <TableHead className="text-xs text-right">Due</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentFees.map(fee => (
                      <TableRow key={fee.id}>
                        <TableCell className="text-sm font-medium">{fee.feeHead}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{fee.month}</TableCell>
                        <TableCell className="text-sm text-right">৳{fee.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-right text-success font-medium">৳{fee.paid.toLocaleString()}</TableCell>
                        <TableCell className="text-sm text-right text-destructive font-medium">{fee.due > 0 ? `৳${fee.due.toLocaleString()}` : '—'}</TableCell>
                        <TableCell><StatusBadge status={fee.status} /></TableCell>
                        <TableCell>
                          {fee.status === 'paid' && (
                            <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Results Tab */}
        <TabsContent value="results" className="space-y-4">
          {studentResults.map((result, i) => (
            <motion.div key={result.examName} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base font-semibold">{result.examName}</CardTitle>
                      <p className="text-xs text-muted-foreground">Session {result.session} · Position: {result.position}/{result.totalStudents}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{result.gpa.toFixed(2)}</p>
                      <Badge variant="secondary" className="text-xs">Grade {result.grade}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs">Subject</TableHead>
                        <TableHead className="text-xs text-center">Full Marks</TableHead>
                        <TableHead className="text-xs text-center">Obtained</TableHead>
                        <TableHead className="text-xs text-center">Grade</TableHead>
                        <TableHead className="text-xs">Progress</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.subjects.map(sub => (
                        <TableRow key={sub.name}>
                          <TableCell className="text-sm font-medium">{sub.name}</TableCell>
                          <TableCell className="text-sm text-center text-muted-foreground">{sub.fullMarks}</TableCell>
                          <TableCell className="text-sm text-center font-semibold">{sub.obtained}</TableCell>
                          <TableCell className="text-sm text-center">
                            <Badge variant={sub.grade.startsWith('A') ? 'default' : 'secondary'} className="text-[10px]">{sub.grade}</Badge>
                          </TableCell>
                          <TableCell>
                            <Progress value={(sub.obtained / sub.fullMarks) * 100} className="h-2 w-24" />
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-muted/30 font-semibold">
                        <TableCell className="text-sm">Total</TableCell>
                        <TableCell className="text-sm text-center">{result.totalMarks}</TableCell>
                        <TableCell className="text-sm text-center">{result.obtained}</TableCell>
                        <TableCell className="text-sm text-center">
                          <Badge className="text-[10px]">{result.grade}</Badge>
                        </TableCell>
                        <TableCell>
                          <Progress value={(result.obtained / result.totalMarks) * 100} className="h-2 w-24" />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        {/* Notices Tab */}
        <TabsContent value="notices" className="space-y-3">
          {studentNotices.map((notice, i) => (
            <motion.div key={notice.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{categoryIcons[notice.category]}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">{notice.title}</h3>
                        <span className="text-[11px] text-muted-foreground">{notice.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notice.content}</p>
                      <Badge variant="secondary" className="text-[10px] mt-2 capitalize">{notice.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Wallet, FileText, CalendarCheck, TrendingUp, Download, Printer } from "lucide-react";
import { motion } from "framer-motion";

const reportCategories = [
  {
    title: 'Student Reports',
    titleBn: 'শিক্ষার্থী রিপোর্ট',
    icon: Users,
    reports: [
      { name: 'Student List by Class', description: 'Complete student roster by class and section' },
      { name: 'Student Profile Summary', description: 'Detailed profile with academic history' },
      { name: 'Admission Report', description: 'New admissions by month/year' },
      { name: 'Gender Ratio Report', description: 'Male/Female distribution across classes' },
    ],
  },
  {
    title: 'Financial Reports',
    titleBn: 'আর্থিক রিপোর্ট',
    icon: Wallet,
    reports: [
      { name: 'Fee Collection Summary', description: 'Monthly collection vs target' },
      { name: 'Due Fee Report', description: 'Students with outstanding fees' },
      { name: 'Expense Report', description: 'Category-wise expense breakdown' },
      { name: 'Income Statement', description: 'Revenue vs expense overview' },
    ],
  },
  {
    title: 'Academic Reports',
    titleBn: 'একাডেমিক রিপোর্ট',
    icon: FileText,
    reports: [
      { name: 'Exam Result Summary', description: 'Pass/fail rates by class and subject' },
      { name: 'GPA Distribution', description: 'GPA spread across classes' },
      { name: 'Subject-wise Performance', description: 'Average marks per subject' },
      { name: 'Merit List', description: 'Top performers per class' },
    ],
  },
  {
    title: 'Attendance Reports',
    titleBn: 'উপস্থিতি রিপোর্ট',
    icon: CalendarCheck,
    reports: [
      { name: 'Daily Attendance Summary', description: 'Present/absent count by date' },
      { name: 'Monthly Attendance Register', description: 'Full month attendance sheet' },
      { name: 'Absentee List', description: 'Chronically absent students' },
      { name: 'Teacher Attendance', description: 'Staff attendance tracking' },
    ],
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" titleBn="রিপোর্ট" description="Generate academic, financial, and administrative reports">
        <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />Export All</Button>
      </PageHeader>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {reportCategories.map((cat, i) => (
          <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card className="border">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                  <cat.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{cat.reports.length}</p>
                  <p className="text-xs text-muted-foreground">{cat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Report Categories */}
      {reportCategories.map((cat, i) => (
        <motion.div key={cat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                  <cat.icon className="h-4 w-4 text-accent-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">{cat.title} <span className="text-muted-foreground font-normal">/ {cat.titleBn}</span></CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.reports.map(report => (
                  <div key={report.name} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-colors group cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.name}</p>
                      <p className="text-xs text-muted-foreground">{report.description}</p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-7 w-7"><Printer className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

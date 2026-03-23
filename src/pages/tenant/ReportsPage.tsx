import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { BarChart3, Users, Wallet, FileText, CalendarCheck, Download, Printer, Filter, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useLocale } from "@/contexts/LocaleContext";

interface ReportItem {
  name: string;
  description: string;
  filters: string[];
}

const reportCategories: { title: string; titleBn: string; icon: typeof Users; reports: ReportItem[] }[] = [
  {
    title: 'Student Reports',
    titleBn: 'শিক্ষার্থী রিপোর্ট',
    icon: Users,
    reports: [
      { name: 'Student List by Class', description: 'Complete student roster by class and section', filters: ['class', 'section', 'session'] },
      { name: 'Student Profile Summary', description: 'Detailed profile with academic history', filters: ['student', 'session'] },
      { name: 'Admission Report', description: 'New admissions by month/year', filters: ['dateRange', 'class'] },
      { name: 'Gender Ratio Report', description: 'Male/Female distribution across classes', filters: ['session'] },
    ],
  },
  {
    title: 'Financial Reports',
    titleBn: 'আর্থিক রিপোর্ট',
    icon: Wallet,
    reports: [
      { name: 'Fee Collection Summary', description: 'Monthly collection vs target', filters: ['month', 'class', 'feeCategory'] },
      { name: 'Due Fee Report', description: 'Students with outstanding fees', filters: ['class', 'month', 'status'] },
      { name: 'Student Ledger', description: 'Individual student fee ledger with payment history', filters: ['student', 'session'] },
      { name: 'Income Statement', description: 'Revenue vs expense overview', filters: ['dateRange'] },
    ],
  },
  {
    title: 'Academic Reports',
    titleBn: 'একাডেমিক রিপোর্ট',
    icon: FileText,
    reports: [
      { name: 'Exam Result Summary', description: 'Pass/fail rates by class and subject', filters: ['exam', 'class'] },
      { name: 'GPA Distribution', description: 'GPA spread across classes', filters: ['exam', 'class'] },
      { name: 'Subject-wise Performance', description: 'Average marks per subject', filters: ['exam', 'subject'] },
      { name: 'Merit List', description: 'Top performers per class', filters: ['exam', 'class', 'topN'] },
    ],
  },
  {
    title: 'Attendance Reports',
    titleBn: 'উপস্থিতি রিপোর্ট',
    icon: CalendarCheck,
    reports: [
      { name: 'Daily Attendance Summary', description: 'Present/absent count by date', filters: ['date', 'class'] },
      { name: 'Monthly Attendance Register', description: 'Full month attendance sheet', filters: ['month', 'class', 'section'] },
      { name: 'Absentee List', description: 'Chronically absent students', filters: ['dateRange', 'threshold'] },
      { name: 'Teacher Attendance', description: 'Staff attendance tracking', filters: ['month', 'department'] },
    ],
  },
];

const filterOptions: Record<string, { label: string; options: string[] }> = {
  class: { label: 'Class', options: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'] },
  section: { label: 'Section', options: ['A', 'B', 'C'] },
  session: { label: 'Session', options: ['2025', '2024', '2023'] },
  month: { label: 'Month', options: ['January', 'February', 'March', 'April', 'May', 'June'] },
  exam: { label: 'Exam', options: ['Mid-Term 2025', 'Final 2024', 'SSC Mock 2025'] },
  feeCategory: { label: 'Fee Category', options: ['Tuition', 'Exam Fee', 'Lab Fee', 'Transport'] },
  department: { label: 'Department', options: ['Science', 'Mathematics', 'English', 'Bangla'] },
};

export default function ReportsPage() {
  const [activeReport, setActiveReport] = useState<ReportItem | null>(null);

  const handleGenerate = (format: 'view' | 'pdf' | 'excel') => {
    const label = format === 'view' ? 'Preview generated' : format === 'pdf' ? 'PDF downloading...' : 'Excel downloading...';
    toast.success(label);
  };
  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" titleBn="রিপোর্ট" description="Generate academic, financial, and administrative reports" descriptionBn="একাডেমিক, আর্থিক এবং প্রশাসনিক রিপোর্ট তৈরি করুন">
        <Button size="sm" variant="outline"><Download className="h-4 w-4 mr-1" />{t("Export All", "সব রপ্তানি")}</Button>
      </PageHeader>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report List */}
        <div className="lg:col-span-2 space-y-4">
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
                      <div
                        key={report.name}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer group ${activeReport?.name === report.name ? 'border-primary bg-primary/5' : 'hover:bg-muted/30'}`}
                        onClick={() => setActiveReport(report)}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{report.name}</p>
                          <p className="text-xs text-muted-foreground">{report.description}</p>
                          <div className="flex gap-1 mt-1.5 flex-wrap">
                            {report.filters.slice(0, 3).map(f => (
                              <Badge key={f} variant="outline" className="text-[9px] font-normal capitalize">{f}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); setActiveReport(report); }}>
                            <Eye className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Report Generator Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-primary/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base font-semibold">Report Generator</CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activeReport ? `Configure "${activeReport.name}"` : 'Select a report from the list'}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeReport ? (
                    <>
                      <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm font-semibold text-foreground">{activeReport.name}</p>
                        <p className="text-xs text-muted-foreground">{activeReport.description}</p>
                      </div>

                      {activeReport.filters.map(filterKey => {
                        const config = filterOptions[filterKey];
                        if (!config) return (
                          <div key={filterKey} className="space-y-1.5">
                            <label className="text-xs font-medium text-foreground capitalize">{filterKey}</label>
                            <Select>
                              <SelectTrigger className="h-9 bg-secondary border-0"><SelectValue placeholder={`Select ${filterKey}`} /></SelectTrigger>
                              <SelectContent><SelectItem value="all">All</SelectItem></SelectContent>
                            </Select>
                          </div>
                        );
                        return (
                          <div key={filterKey} className="space-y-1.5">
                            <label className="text-xs font-medium text-foreground">{config.label}</label>
                            <Select>
                              <SelectTrigger className="h-9 bg-secondary border-0"><SelectValue placeholder={`Select ${config.label}`} /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {config.options.map(opt => (
                                  <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        );
                      })}

                      <Separator />

                      <div className="space-y-2">
                        <Button className="w-full" size="sm" onClick={() => handleGenerate('view')}>
                          <Eye className="h-3.5 w-3.5 mr-1" />Generate Preview
                        </Button>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleGenerate('pdf')}>
                            <Download className="h-3.5 w-3.5 mr-1" />PDF
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleGenerate('excel')}>
                            <Download className="h-3.5 w-3.5 mr-1" />Excel
                          </Button>
                        </div>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => handleGenerate('view')}>
                          <Printer className="h-3.5 w-3.5 mr-1" />Print
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <BarChart3 className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Click any report to configure filters and generate</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

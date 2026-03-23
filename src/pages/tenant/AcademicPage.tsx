import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { classStructure, academicSessions } from "@/data/tenant-data";
import { BookOpen, Users, Layers, Calendar, Plus, Settings, GraduationCap, Clock, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

// Coaching mode data
const courses = [
  { id: '1', name: 'SSC Preparation', nameBn: 'এসএসসি প্রস্তুতি', batches: 3, students: 120, subjects: ['Bangla', 'English', 'Math', 'Physics', 'Chemistry'], status: 'active' },
  { id: '2', name: 'HSC Science', nameBn: 'এইচএসসি বিজ্ঞান', batches: 2, students: 80, subjects: ['Physics', 'Chemistry', 'Biology', 'Math'], status: 'active' },
  { id: '3', name: 'Admission Coaching', nameBn: 'ভর্তি কোচিং', batches: 4, students: 200, subjects: ['Bangla', 'English', 'Math', 'GK'], status: 'active' },
  { id: '4', name: 'IELTS Preparation', nameBn: 'আইইএলটিএস', batches: 1, students: 25, subjects: ['Listening', 'Reading', 'Writing', 'Speaking'], status: 'upcoming' },
];

const batches = [
  { id: '1', name: 'Batch A – Morning', course: 'SSC Preparation', schedule: 'Sat-Thu, 8:00-10:00 AM', students: 45, mentor: 'Mr. Karim Ahmed', status: 'active' },
  { id: '2', name: 'Batch B – Evening', course: 'SSC Preparation', schedule: 'Sat-Thu, 4:00-6:00 PM', students: 42, mentor: 'Ms. Fatima Begum', status: 'active' },
  { id: '3', name: 'Batch C – Friday Only', course: 'SSC Preparation', schedule: 'Fri, 10:00 AM-1:00 PM', students: 33, mentor: 'Mr. Rahman', status: 'active' },
  { id: '4', name: 'HSC Batch 1', course: 'HSC Science', schedule: 'Sat-Wed, 3:00-5:00 PM', students: 48, mentor: 'Dr. Hasan Ali', status: 'active' },
  { id: '5', name: 'HSC Batch 2', course: 'HSC Science', schedule: 'Sat-Wed, 6:00-8:00 PM', students: 32, mentor: 'Mr. Alam', status: 'active' },
  { id: '6', name: 'Admission Batch – Morning', course: 'Admission Coaching', schedule: 'Daily, 7:00-9:00 AM', students: 55, mentor: 'Ms. Nusrat', status: 'active' },
];

export default function AcademicPage() {
  const [mode, setMode] = useState<'school' | 'coaching'>('school');

  const totalSections = classStructure.reduce((acc, c) => acc + c.sections.length, 0);
  const totalEnrolled = classStructure.reduce((acc, c) => acc + c.sections.reduce((a, s) => a + s.enrolled, 0), 0);
  const totalCapacity = classStructure.reduce((acc, c) => acc + c.sections.reduce((a, s) => a + s.capacity, 0), 0);
  const totalCoachingStudents = courses.reduce((a, c) => a + c.students, 0);
  const totalBatches = courses.reduce((a, c) => a + c.batches, 0);

  const { t } = useLocale();

  return (
    <div className="space-y-6">
      <PageHeader title="Academic Structure" titleBn="একাডেমিক কাঠামো" description="Manage classes, sections, subjects, courses, and batches" descriptionBn="শ্রেণি, শাখা, বিষয়, কোর্স এবং ব্যাচ পরিচালনা করুন">
        <div className="flex items-center gap-2 p-1 bg-secondary rounded-lg">
          <Button
            size="sm"
            variant={mode === 'school' ? 'default' : 'ghost'}
            className="h-8 text-xs"
            onClick={() => setMode('school')}
          >
            🏫 {t("School", "স্কুল")}
          </Button>
          <Button
            size="sm"
            variant={mode === 'coaching' ? 'default' : 'ghost'}
            className="h-8 text-xs"
            onClick={() => setMode('coaching')}
          >
            📚 {t("Coaching", "কোচিং")}
          </Button>
        </div>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />{mode === 'school' ? t('Add Class', 'শ্রেণি যোগ') : t('Add Course', 'কোর্স যোগ')}</Button>
      </PageHeader>

      {mode === 'school' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatCard title="Classes" titleBn="শ্রেণি" value={classStructure.length} icon={BookOpen} index={0} />
            <StatCard title="Sections" titleBn="শাখা" value={totalSections} icon={Layers} index={1} />
            <StatCard title="Total Enrolled" titleBn="মোট ভর্তি" value={totalEnrolled} change={`${Math.round(totalEnrolled / totalCapacity * 100)}% capacity`} changeType="positive" icon={Users} index={2} />
            <StatCard title="Sessions" titleBn="সেশন" value={academicSessions.length} icon={Calendar} index={3} />
          </div>

          <Tabs defaultValue="classes" className="space-y-4">
            <TabsList>
              <TabsTrigger value="classes">Classes & Sections / শ্রেণি ও শাখা</TabsTrigger>
              <TabsTrigger value="sessions">Academic Sessions / শিক্ষাবর্ষ</TabsTrigger>
            </TabsList>

            <TabsContent value="classes" className="space-y-4">
              {classStructure.map((cls, i) => (
                <motion.div key={cls.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
                            <span className="text-sm font-bold text-accent-foreground">{cls.name.split(' ')[1]}</span>
                          </div>
                          <div>
                            <CardTitle className="text-sm font-semibold">{cls.name} <span className="text-muted-foreground font-normal">/ {cls.nameBn}</span></CardTitle>
                            <p className="text-xs text-muted-foreground">{cls.sections.length} sections · {cls.subjects.length} subjects</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cls.sections.map(sec => {
                          const pct = Math.round(sec.enrolled / sec.capacity * 100);
                          return (
                            <div key={sec.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border">
                              <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-primary">{sec.name}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="text-sm font-medium">Section {sec.name}</p>
                                  <span className="text-xs text-muted-foreground">{sec.enrolled}/{sec.capacity}</span>
                                </div>
                                <Progress value={pct} className="h-1.5" />
                                <p className="text-[11px] text-muted-foreground mt-1">Class Teacher: {sec.classTeacher}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1.5 font-medium">Subjects</p>
                        <div className="flex gap-1.5 flex-wrap">
                          {cls.subjects.map(s => (
                            <Badge key={s} variant="secondary" className="text-[10px] font-normal">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="sessions">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">Academic Sessions / শিক্ষাবর্ষ</CardTitle>
                      <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5 mr-1" />Add Session</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-xs">Session</TableHead>
                          <TableHead className="text-xs">Start Date</TableHead>
                          <TableHead className="text-xs">End Date</TableHead>
                          <TableHead className="text-xs">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {academicSessions.map(s => (
                          <TableRow key={s.id}>
                            <TableCell className="text-sm font-semibold">{s.name}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{s.startDate}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{s.endDate}</TableCell>
                            <TableCell><StatusBadge status={s.status} /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <StatCard title="Courses" titleBn="কোর্স" value={courses.length} icon={GraduationCap} index={0} />
            <StatCard title="Batches" titleBn="ব্যাচ" value={totalBatches} icon={LayoutGrid} index={1} />
            <StatCard title="Total Students" titleBn="মোট শিক্ষার্থী" value={totalCoachingStudents} icon={Users} index={2} />
            <StatCard title="Active Courses" value={courses.filter(c => c.status === 'active').length} icon={BookOpen} index={3} />
          </div>

          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList>
              <TabsTrigger value="courses">Courses / কোর্স</TabsTrigger>
              <TabsTrigger value="batches">Batches & Schedule / ব্যাচ</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course, i) => (
                  <motion.div key={course.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <Card className="border hover:shadow-sm transition-shadow">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-sm font-semibold text-foreground">{course.name}</h3>
                            <p className="text-xs text-muted-foreground">{course.nameBn}</p>
                          </div>
                          <StatusBadge status={course.status} />
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><LayoutGrid className="h-3 w-3" />{course.batches} batches</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{course.students} students</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                          {course.subjects.map(s => (
                            <Badge key={s} variant="secondary" className="text-[10px] font-normal">{s}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4 pt-3 border-t">
                          <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">Edit</Button>
                          <Button size="sm" className="flex-1 h-8 text-xs"><Plus className="h-3 w-3 mr-1" />Add Batch</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="batches">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">Batches & Schedule / ব্যাচ তালিকা</CardTitle>
                      <Button size="sm" variant="outline"><Plus className="h-3.5 w-3.5 mr-1" />Add Batch</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-xs">Batch Name</TableHead>
                          <TableHead className="text-xs">Course</TableHead>
                          <TableHead className="text-xs">Schedule</TableHead>
                          <TableHead className="text-xs text-right">Students</TableHead>
                          <TableHead className="text-xs">Mentor</TableHead>
                          <TableHead className="text-xs">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {batches.map(b => (
                          <TableRow key={b.id} className="cursor-pointer hover:bg-muted/30">
                            <TableCell className="text-sm font-medium">{b.name}</TableCell>
                            <TableCell><Badge variant="secondary" className="text-[10px] font-normal">{b.course}</Badge></TableCell>
                            <TableCell className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />{b.schedule}</TableCell>
                            <TableCell className="text-sm text-right font-medium">{b.students}</TableCell>
                            <TableCell className="text-sm text-muted-foreground">{b.mentor}</TableCell>
                            <TableCell><StatusBadge status={b.status} /></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}

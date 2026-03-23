import { type StudentFull, documentTypeLabels } from "@/data/student-data";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  User, Phone, Mail, MapPin, Calendar, Droplets, BookOpen, Heart,
  FileText, Upload, Download, Shield, Clock, ArrowUpRight, ArrowDownRight,
  Printer, Edit, GraduationCap,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface StudentProfileDrawerProps {
  student: StudentFull | null;
  onClose: () => void;
}

function InfoRow({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

const resultLabels: Record<string, { label: string; color: string }> = {
  promoted: { label: "Promoted", color: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]" },
  retained: { label: "Retained", color: "bg-destructive/10 text-destructive" },
  transferred_in: { label: "Transferred In", color: "bg-[hsl(var(--info))]/10 text-[hsl(var(--info))]" },
  transferred_out: { label: "Transferred Out", color: "bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))]" },
  current: { label: "Current", color: "bg-primary/10 text-primary" },
};

export function StudentProfileDrawer({ student, onClose }: StudentProfileDrawerProps) {
  if (!student) return null;

  const initials = student.name.split(" ").map((n) => n[0]).join("");
  const primaryGuardian = student.guardians.find((g) => g.isPrimary) || student.guardians[0];

  return (
    <Sheet open={!!student} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/30 p-6 border-b">
          <SheetHeader className="flex-row items-start gap-4 space-y-0">
            <Avatar className="h-16 w-16 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <SheetTitle className="text-lg text-foreground">{student.name}</SheetTitle>
              <SheetDescription className="text-sm">{student.nameBn}</SheetDescription>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <StatusBadge status={student.status} />
                <Badge variant="outline" className="text-[11px] font-mono">{student.studentId}</Badge>
              </div>
            </div>
          </SheetHeader>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-card/80 rounded-lg p-2.5 text-center border">
              <p className="text-[11px] text-muted-foreground">Attendance</p>
              <p className={`text-lg font-bold ${student.attendanceRate >= 85 ? "text-[hsl(var(--success))]" : student.attendanceRate >= 70 ? "text-[hsl(var(--warning))]" : "text-destructive"}`}>
                {student.attendanceRate}%
              </p>
            </div>
            <div className="bg-card/80 rounded-lg p-2.5 text-center border">
              <p className="text-[11px] text-muted-foreground">Last GPA</p>
              <p className="text-lg font-bold text-foreground">{student.lastExamGpa ?? "—"}</p>
            </div>
            <div className="bg-card/80 rounded-lg p-2.5 text-center border">
              <p className="text-[11px] text-muted-foreground">Fee Status</p>
              <StatusBadge status={student.feeStatus === "overdue" ? "overdue" : student.feeStatus === "partial" ? "partial" : "paid"} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="p-4">
          <TabsList className="w-full grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="guardians" className="text-xs">Guardians</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs">Documents</TabsTrigger>
            <TabsTrigger value="history" className="text-xs">History</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {t("Personal Information", "ব্যক্তিগত তথ্য")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0 divide-y">
                <InfoRow icon={User} label="Gender" value={student.gender === "male" ? t("Male", "ছেলে") : t("Female", "মেয়ে")} />
                <InfoRow icon={Calendar} label="Date of Birth" value={student.dob} />
                <InfoRow icon={Droplets} label="Blood Group" value={student.bloodGroup} />
                <InfoRow icon={Heart} label="Religion" value={student.religion} />
                <InfoRow icon={Phone} label="Phone" value={student.phone} />
                {student.email && <InfoRow icon={Mail} label="Email" value={student.email} />}
                <InfoRow icon={MapPin} label="Address" value={student.address} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  {t("Academic Details", "একাডেমিক তথ্য")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-0 divide-y">
                <InfoRow icon={BookOpen} label="Class & Section" value={`${student.class} — ${student.section}`} />
                <InfoRow icon={GraduationCap} label="Roll Number" value={String(student.roll)} />
                <InfoRow icon={Calendar} label="Admission Date" value={student.admissionDate} />
              </CardContent>
            </Card>

            {primaryGuardian && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {t("Primary Guardian", "প্রধান অভিভাবক")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {primaryGuardian.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{primaryGuardian.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{primaryGuardian.relation} • {primaryGuardian.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1"><Edit className="h-3.5 w-3.5 mr-1" />Edit Profile</Button>
              <Button size="sm" variant="outline" className="flex-1"><Printer className="h-3.5 w-3.5 mr-1" />Print ID Card</Button>
            </div>
          </TabsContent>

          {/* Guardians Tab */}
          <TabsContent value="guardians" className="space-y-4 mt-0">
            {student.guardians.map((g) => (
              <Card key={g.id}>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-11 w-11">
                      <AvatarFallback className="bg-accent text-accent-foreground text-xs font-medium">
                        {g.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-foreground">{g.name}</p>
                        {g.isPrimary && <Badge variant="secondary" className="text-[10px] h-5">Primary</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{g.nameBn}</p>
                    </div>
                  </div>
                  <div className="space-y-0 divide-y">
                    <InfoRow icon={Shield} label="Relation" value={g.relation.charAt(0).toUpperCase() + g.relation.slice(1)} />
                    <InfoRow icon={Phone} label="Phone" value={g.phone} />
                    {g.email && <InfoRow icon={Mail} label="Email" value={g.email} />}
                    <InfoRow icon={User} label="Occupation" value={g.occupation} />
                    {g.nid && <InfoRow icon={FileText} label="NID" value={g.nid} />}
                    <InfoRow icon={MapPin} label="Address" value={g.address} />
                  </div>
                </CardContent>
              </Card>
            ))}
            {student.guardians.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No guardian information added yet.
              </div>
            )}
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-4 mt-0">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                Uploaded Documents ({student.documents.length})
              </p>
              <Button size="sm" variant="outline">
                <Upload className="h-3.5 w-3.5 mr-1" />Upload
              </Button>
            </div>

            {student.documents.map((doc) => (
              <Card key={doc.id} className="group">
                <CardContent className="py-3 px-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{documentTypeLabels[doc.type]}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <span>{doc.uploadedAt}</span>
                    </div>
                  </div>
                  <StatusBadge status={doc.status} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}

            {student.documents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No documents uploaded yet.
              </div>
            )}

            {/* Upload Zone */}
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</p>
            </div>
          </TabsContent>

          {/* Enrollment History Tab */}
          <TabsContent value="history" className="space-y-4 mt-0">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {t("Enrollment History", "ভর্তির ইতিহাস")}
            </p>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border" />

              <div className="space-y-0">
                {student.enrollmentHistory.map((record, idx) => {
                  const res = resultLabels[record.result] || { label: record.result, color: "bg-muted text-muted-foreground" };
                  const isCurrent = record.result === "current";
                  return (
                    <div key={record.id} className="relative flex gap-4 py-3">
                      <div className={`relative z-10 h-10 w-10 rounded-full flex items-center justify-center shrink-0 border-2 ${isCurrent ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"}`}>
                        <span className="text-xs font-bold">{record.session.slice(-2)}</span>
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium text-foreground">{record.class} — {record.section}</p>
                          <Badge variant="outline" className={`text-[10px] h-5 ${res.color} border-0`}>
                            {res.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                          <span>Session {record.session}</span>
                          <span>Roll: {record.roll}</span>
                          {record.gpa && <span>GPA: {record.gpa.toFixed(2)}</span>}
                        </div>
                        {record.remarks && (
                          <p className="text-xs text-muted-foreground mt-1 italic">{record.remarks}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

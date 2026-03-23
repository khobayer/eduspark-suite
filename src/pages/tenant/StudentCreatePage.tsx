import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useLocale } from "@/contexts/LocaleContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Plus, Trash2, Upload, FileText } from "lucide-react";
import { useTenant } from "@/contexts/TenantContext";

const guardianSchema = z.object({
  name: z.string().min(2, "Name is required"),
  nameBn: z.string().optional(),
  relation: z.string().min(1, "Relation is required"),
  phone: z.string().min(11, "Valid phone required"),
  email: z.string().email().optional().or(z.literal("")),
  occupation: z.string().optional(),
  nid: z.string().optional(),
  address: z.string().optional(),
});

const studentSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  nameBn: z.string().optional(),
  class: z.string().min(1, "Class is required"),
  section: z.string().min(1, "Section is required"),
  roll: z.coerce.number().min(1, "Roll is required"),
  gender: z.enum(["male", "female"]),
  dob: z.string().min(1, "Date of birth is required"),
  phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  bloodGroup: z.string().optional(),
  religion: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  previousSchool: z.string().optional(),
  medicalNotes: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface GuardianEntry {
  id: number;
  name: string;
  nameBn: string;
  relation: string;
  phone: string;
  email: string;
  occupation: string;
  nid: string;
  address: string;
}

export default function StudentCreatePage() {
  const navigate = useNavigate();
  const { labels } = useTenant();
  const [guardians, setGuardians] = useState<GuardianEntry[]>([
    { id: 1, name: "", nameBn: "", relation: "father", phone: "", email: "", occupation: "", nid: "", address: "" },
  ]);
  const [documents, setDocuments] = useState<{ id: number; name: string; type: string }[]>([]);

  const {
    register, handleSubmit, setValue, formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: { nationality: "Bangladeshi" },
  });

  const addGuardian = () => {
    setGuardians((prev) => [...prev, {
      id: Date.now(), name: "", nameBn: "", relation: "guardian", phone: "", email: "", occupation: "", nid: "", address: "",
    }]);
  };

  const removeGuardian = (id: number) => {
    if (guardians.length <= 1) return;
    setGuardians((prev) => prev.filter((g) => g.id !== id));
  };

  const updateGuardian = (id: number, field: string, value: string) => {
    setGuardians((prev) => prev.map((g) => g.id === id ? { ...g, [field]: value } : g));
  };

  const onSubmit = (data: StudentFormData) => {
    console.log("Student data:", data, "Guardians:", guardians);
    toast.success("Student enrolled successfully!", { description: `${data.name} has been added.` });
    navigate("/tenant/students");
  };

  const cardAnim = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader title={`New ${labels.student}`} titleBn={`নতুন ${labels.studentBn}`} description={`Enroll a new ${labels.student.toLowerCase()} into the institution`}>
        <Button variant="ghost" size="sm" onClick={() => navigate("/tenant/students")}>
          <ArrowLeft className="h-4 w-4 mr-1" />Back
        </Button>
      </PageHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <motion.div {...cardAnim(0)}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {t("Personal Information", "ব্যক্তিগত তথ্য")}
              </CardTitle>
              <CardDescription>Basic personal details of the student</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" placeholder="e.g. Ahmed Khan" {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="nameBn">{t("Name in Bangla", "বাংলায় নাম")}</Label>
                  <Input id="nameBn" placeholder="যেমন: আহমেদ খান" {...register("nameBn")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input id="dob" type="date" {...register("dob")} />
                  {errors.dob && <p className="text-xs text-destructive">{errors.dob.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Gender *</Label>
                  <Select onValueChange={(v) => setValue("gender", v as "male" | "female")}>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t("Male", "ছেলে")}</SelectItem>
                      <SelectItem value="female">{t("Female", "মেয়ে")}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="01XXXXXXXXX" {...register("phone")} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="student@mail.com" {...register("email")} />
                </div>
                <div className="space-y-1.5">
                  <Label>Blood Group</Label>
                  <Select onValueChange={(v) => setValue("bloodGroup", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                        <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Religion</Label>
                  <Select onValueChange={(v) => setValue("religion", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Islam">Islam</SelectItem>
                      <SelectItem value="Hindu">Hindu</SelectItem>
                      <SelectItem value="Christian">Christian</SelectItem>
                      <SelectItem value="Buddhist">Buddhist</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Full Address</Label>
                <Textarea id="address" placeholder="House, Road, Area, District" {...register("address")} rows={2} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Academic Details */}
        <motion.div {...cardAnim(0.05)}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Academic Details / একাডেমিক তথ্য
              </CardTitle>
              <CardDescription>Class, section, and enrollment info</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label>{labels.class} *</Label>
                  <Select onValueChange={(v) => setValue("class", v)}>
                    <SelectTrigger><SelectValue placeholder={`Select ${labels.class.toLowerCase()}`} /></SelectTrigger>
                    <SelectContent>
                      {[6, 7, 8, 9, 10].map((c) => (
                        <SelectItem key={c} value={`Class ${c}`}>{labels.class} {c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.class && <p className="text-xs text-destructive">{errors.class.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>{labels.section} *</Label>
                  <Select onValueChange={(v) => setValue("section", v)}>
                    <SelectTrigger><SelectValue placeholder={labels.section} /></SelectTrigger>
                    <SelectContent>
                      {["A", "B", "C"].map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.section && <p className="text-xs text-destructive">{errors.section.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="roll">{labels.roll} Number *</Label>
                  <Input id="roll" type="number" placeholder="1" {...register("roll")} />
                  {errors.roll && <p className="text-xs text-destructive">{errors.roll.message}</p>}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="previousSchool">Previous Institution</Label>
                <Input id="previousSchool" placeholder="Name of previous school (if any)" {...register("previousSchool")} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Guardian Information */}
        <motion.div {...cardAnim(0.1)}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {labels.guardian} Information / {labels.guardianBn} তথ্য
                  </CardTitle>
                  <CardDescription>Add one or more guardians</CardDescription>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addGuardian}>
                  <Plus className="h-3.5 w-3.5 mr-1" />Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {guardians.map((g, idx) => (
                <div key={g.id}>
                  {idx > 0 && <Separator className="mb-4" />}
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-medium text-muted-foreground">Guardian {idx + 1}</p>
                    {guardians.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => removeGuardian(g.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Name *</Label>
                      <Input placeholder="e.g. Karim Khan" value={g.name} onChange={(e) => updateGuardian(g.id, "name", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Name (Bangla)</Label>
                      <Input placeholder="যেমন: করিম খান" value={g.nameBn} onChange={(e) => updateGuardian(g.id, "nameBn", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Relation *</Label>
                      <Select value={g.relation} onValueChange={(v) => updateGuardian(g.id, "relation", v)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="father">Father / বাবা</SelectItem>
                          <SelectItem value="mother">Mother / মা</SelectItem>
                          <SelectItem value="guardian">Other Guardian / অভিভাবক</SelectItem>
                          <SelectItem value="uncle">Uncle / চাচা</SelectItem>
                          <SelectItem value="sibling">Sibling / ভাই/বোন</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Phone *</Label>
                      <Input placeholder="01XXXXXXXXX" value={g.phone} onChange={(e) => updateGuardian(g.id, "phone", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Occupation</Label>
                      <Input placeholder="e.g. Business Owner" value={g.occupation} onChange={(e) => updateGuardian(g.id, "occupation", e.target.value)} />
                    </div>
                    <div className="space-y-1.5">
                      <Label>NID Number</Label>
                      <Input placeholder="National ID" value={g.nid} onChange={(e) => updateGuardian(g.id, "nid", e.target.value)} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Documents */}
        <motion.div {...cardAnim(0.15)}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Documents / নথিপত্র
              </CardTitle>
              <CardDescription>Upload required documents for enrollment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {["Birth Certificate", "Passport Photo", "Previous Marksheet", "Transfer Certificate"].map((doc) => (
                  <div key={doc} className="border rounded-lg p-3 flex items-center gap-3 hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center shrink-0">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{doc}</p>
                      <p className="text-[11px] text-muted-foreground">Click to upload</p>
                    </div>
                    <Upload className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-1.5" />
                <p className="text-sm font-medium text-foreground">Drop other documents here</p>
                <p className="text-xs text-muted-foreground">PDF, JPG, PNG up to 5MB each</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Medical Notes */}
        <motion.div {...cardAnim(0.2)}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Additional Notes / অতিরিক্ত তথ্য
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                <Label htmlFor="medicalNotes">Medical or Special Notes</Label>
                <Textarea id="medicalNotes" placeholder="Any medical conditions, allergies, or special requirements..." {...register("medicalNotes")} rows={3} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 pb-8">
          <Button type="button" variant="outline" onClick={() => navigate("/tenant/students")}>Cancel</Button>
          <Button type="submit">
            <Save className="h-4 w-4 mr-1" />
            Save & Enroll
          </Button>
        </div>
      </form>
    </div>
  );
}

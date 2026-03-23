import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { subscriptionPlans } from "@/data/mock-data-extended";
import { motion } from "framer-motion";
import { Check, Plus, X, Edit } from "lucide-react";

const comparisonFeatures = [
  { name: 'Max Students', basic: '200', pro: '1,000', enterprise: 'Unlimited' },
  { name: 'Attendance Module', basic: 'Basic', pro: 'Full', enterprise: 'Full + Biometric' },
  { name: 'Exam Module', basic: '—', pro: '✓', enterprise: '✓' },
  { name: 'Report Cards', basic: '—', pro: '✓', enterprise: '✓' },
  { name: 'Custom Branding', basic: '—', pro: '—', enterprise: '✓' },
  { name: 'API Access', basic: '—', pro: '—', enterprise: '✓' },
  { name: 'Priority Support', basic: '—', pro: '—', enterprise: '✓' },
  { name: 'SMS Quota', basic: '100/mo', pro: '500/mo', enterprise: '2,000/mo' },
  { name: 'Multi-Branch', basic: '—', pro: '—', enterprise: '✓' },
  { name: 'WhatsApp', basic: '—', pro: 'Beta', enterprise: '✓' },
];

export default function SubscriptionPlansPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Subscription Plans" description="Manage pricing plans for your tenants">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Plan</Button>
      </PageHeader>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="comparison">Feature Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className={`relative ${plan.name === 'Pro' ? 'border-primary shadow-md' : ''}`}>
                  {plan.name === 'Pro' && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground text-[10px]">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">৳{plan.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground">/{plan.period === 'monthly' ? 'mo' : 'yr'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{plan.tenantCount} active tenants</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 mt-4">
                      <Button variant={plan.name === 'Pro' ? 'default' : 'outline'} className="flex-1" size="sm">
                        <Edit className="h-3.5 w-3.5 mr-1" />Edit Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold">Feature Comparison Matrix</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs w-[200px]">Feature</TableHead>
                      <TableHead className="text-xs text-center">Basic (৳2,000)</TableHead>
                      <TableHead className="text-xs text-center font-semibold text-primary">Pro (৳5,000)</TableHead>
                      <TableHead className="text-xs text-center">Enterprise (৳12,000)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonFeatures.map((feat) => (
                      <TableRow key={feat.name}>
                        <TableCell className="text-sm font-medium">{feat.name}</TableCell>
                        {[feat.basic, feat.pro, feat.enterprise].map((val, i) => (
                          <TableCell key={i} className="text-center">
                            {val === '✓' ? (
                              <Check className="h-4 w-4 text-success mx-auto" />
                            ) : val === '—' ? (
                              <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />
                            ) : (
                              <span className="text-sm text-muted-foreground">{val}</span>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

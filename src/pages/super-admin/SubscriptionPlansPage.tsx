import { PageHeader } from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { subscriptionPlans } from "@/data/mock-data-extended";
import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";

export default function SubscriptionPlansPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Subscription Plans" description="Manage pricing plans for your tenants">
        <Button size="sm"><Plus className="h-4 w-4 mr-1" />Create Plan</Button>
      </PageHeader>

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
                <Button variant={plan.name === 'Pro' ? 'default' : 'outline'} className="w-full mt-4" size="sm">
                  Edit Plan
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

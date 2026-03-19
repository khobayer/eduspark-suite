import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Building2, GraduationCap, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center space-y-8"
      >
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary mx-auto">
            <GraduationCap className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">EduSaaS Platform</h1>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Multi-tenant ERP for schools and coaching centers in Bangladesh
          </p>
          <p className="text-muted-foreground/70 text-sm">
            বাংলাদেশের স্কুল ও কোচিং সেন্টারের জন্য মাল্টি-টেন্যান্ট ইআরপি
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <Link to="/super-admin">
            <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2 border-border hover:border-primary hover:bg-accent transition-all group">
              <Building2 className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-semibold text-foreground">Super Admin</span>
              <span className="text-xs text-muted-foreground">Platform Control Panel</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Button>
          </Link>
          <Link to="/tenant">
            <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center gap-2 border-border hover:border-primary hover:bg-accent transition-all group">
              <GraduationCap className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-semibold text-foreground">Tenant Dashboard</span>
              <span className="text-xs text-muted-foreground">School / Coaching Panel</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Index;

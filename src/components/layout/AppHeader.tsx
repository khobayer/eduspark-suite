import { useState, useEffect } from "react";
import { Bell, Search, Globe, Moon, Sun, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useLocale, type LabelDisplayMode } from "@/contexts/LocaleContext";

interface AppHeaderProps {
  breadcrumbs?: { label: string; labelBn?: string; href?: string }[];
}

const labelModeOptions: { value: LabelDisplayMode; label: string; labelBn: string }[] = [
  { value: "en", label: "English Only", labelBn: "শুধু ইংরেজি" },
  { value: "bn", label: "Bangla Only", labelBn: "শুধু বাংলা" },
  { value: "both", label: "Both / উভয়", labelBn: "উভয়" },
];

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  const [isDark, setIsDark] = useState(false);
  const { lang, labelMode, setLang, setLabelMode, t } = useLocale();

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 gap-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        {breadcrumbs.length > 0 && (
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="text-muted-foreground">/</span>}
                <span className={i === breadcrumbs.length - 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {crumb.labelBn ? t(crumb.label, crumb.labelBn) : crumb.label}
                </span>
              </span>
            ))}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <div className="hidden md:flex relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("Search...", "অনুসন্ধান...")} className="pl-8 w-64 h-9 bg-secondary border-0" />
        </div>

        {/* Language & Label Mode Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              {t("Interface Language", "ইন্টারফেস ভাষা")}
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setLang("en")} className="flex items-center justify-between">
              English {lang === "en" && <Check className="h-3.5 w-3.5 text-primary" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLang("bn")} className="flex items-center justify-between">
              বাংলা {lang === "bn" && <Check className="h-3.5 w-3.5 text-primary" />}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
              {t("Label Display", "লেবেল প্রদর্শন")}
            </DropdownMenuLabel>
            {labelModeOptions.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => setLabelMode(opt.value)}
                className="flex items-center justify-between"
              >
                {t(opt.label, opt.labelBn)}
                {labelMode === opt.value && <Check className="h-3.5 w-3.5 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="icon" className="h-9 w-9 relative text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">SA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>{t("My Profile", "আমার প্রোফাইল")}</DropdownMenuItem>
            <DropdownMenuItem>{t("Preferences", "পছন্দসমূহ")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">{t("Sign Out", "সাইন আউট")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

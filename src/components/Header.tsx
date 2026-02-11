import { useApp, PersonaId } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Moon, Sun } from "lucide-react";
import { alexData, saraData, carlosData, lisaData } from "@/data/demoPersonas";

const Header = () => {
  const { currentDemo, setCurrentDemo, theme, toggleTheme, setStudentData, setBusinessData } = useApp();
  const navigate = useNavigate();

  const handleDemoChange = (val: string) => {
    const persona = val === "live" ? null : (val as PersonaId);
    setCurrentDemo(persona);

    if (persona === "alex") { setStudentData(alexData); navigate("/student/apply"); }
    else if (persona === "sara") { setStudentData(saraData); navigate("/student/apply"); }
    else if (persona === "carlos") { setBusinessData(carlosData); navigate("/business/apply"); }
    else if (persona === "lisa") { setBusinessData(lisaData); navigate("/business/apply"); }
    else navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="/" className="text-xl font-bold tracking-tight" onClick={e => { e.preventDefault(); navigate("/"); }}>
          Sero
        </a>
        <div className="flex items-center gap-3">
          {currentDemo && (
            <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
              DEMO
            </span>
          )}
          <Select value={currentDemo || "live"} onValueChange={handleDemoChange}>
            <SelectTrigger className="w-[170px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="alex">Alex – MIT</SelectItem>
              <SelectItem value="sara">Sara – HKS</SelectItem>
              <SelectItem value="carlos">Carlos – Restaurant</SelectItem>
              <SelectItem value="lisa">Lisa – E-commerce</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

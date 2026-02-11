import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type PersonaId = "alex" | "sara" | "carlos" | "lisa" | null;

interface AppState {
  currentDemo: PersonaId;
  setCurrentDemo: (p: PersonaId) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  studentData: StudentData;
  setStudentData: (d: StudentData) => void;
  businessData: BusinessData;
  setBusinessData: (d: BusinessData) => void;
}

export interface StudentData {
  school: string;
  program: string;
  degreeType: string;
  coa: number;
  existingAid: number;
  loanNeeded: number;
  citizenship: string;
  expectedSalary: number;
  connections: Record<string, boolean>;
  habitScore: number;
  savedScholarships: string[];
}

export interface BusinessData {
  businessName: string;
  businessType: string;
  yearsInBusiness: number;
  loanPurpose: string;
  loanAmount: number;
  annualRevenue: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  connections: Record<string, boolean>;
  healthScore: number;
}

const defaultStudent: StudentData = {
  school: "", program: "", degreeType: "MBA",
  coa: 0, existingAid: 0, loanNeeded: 0,
  citizenship: "US Citizen", expectedSalary: 0,
  connections: {}, habitScore: 0, savedScholarships: [],
};

const defaultBusiness: BusinessData = {
  businessName: "", businessType: "", yearsInBusiness: 0,
  loanPurpose: "Working Capital", loanAmount: 0,
  annualRevenue: 0, monthlyRevenue: 0, monthlyExpenses: 0,
  connections: {}, healthScore: 0,
};

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentDemo, setCurrentDemo] = useState<PersonaId>(() => {
    const saved = localStorage.getItem("sero-demo");
    return (saved as PersonaId) || null;
  });
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("sero-theme") as "light" | "dark") || "light";
  });
  const [studentData, setStudentData] = useState<StudentData>(defaultStudent);
  const [businessData, setBusinessData] = useState<BusinessData>(defaultBusiness);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("sero-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (currentDemo) localStorage.setItem("sero-demo", currentDemo);
    else localStorage.removeItem("sero-demo");
  }, [currentDemo]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <AppContext.Provider value={{
      currentDemo, setCurrentDemo, theme, toggleTheme,
      studentData, setStudentData, businessData, setBusinessData,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

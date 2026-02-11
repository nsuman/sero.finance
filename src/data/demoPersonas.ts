import type { StudentData, BusinessData } from "@/contexts/AppContext";

export const alexData: StudentData = {
  school: "MIT Sloan", program: "MBA", degreeType: "MBA",
  coa: 230000, existingAid: 35000, loanNeeded: 195000,
  citizenship: "US Citizen", expectedSalary: 175000,
  connections: { bank: true, cards: true, savings: true },
  habitScore: 84, savedScholarships: ["Legatum Fellowship", "Siebel Scholars", "Social Impact Fellowship"],
};

export const saraData: StudentData = {
  school: "Harvard Kennedy School", program: "MPA", degreeType: "MPA",
  coa: 195000, existingAid: 28000, loanNeeded: 167000,
  citizenship: "US Citizen", expectedSalary: 145000,
  connections: { bank: true, cards: true },
  habitScore: 82, savedScholarships: ["Carr Center Fellowship", "Belfer Center Grant"],
};

export const carlosData: BusinessData = {
  businessName: "Casa Carlos", businessType: "Restaurant",
  yearsInBusiness: 4, loanPurpose: "Working Capital",
  loanAmount: 120000, annualRevenue: 680000,
  monthlyRevenue: 62000, monthlyExpenses: 48000,
  connections: { bank: true, pos: true, accounting: true },
  healthScore: 78,
};

export const lisaData: BusinessData = {
  businessName: "Bloom & Thread", businessType: "E-commerce",
  yearsInBusiness: 3, loanPurpose: "Inventory",
  loanAmount: 85000, annualRevenue: 520000,
  monthlyRevenue: 48000, monthlyExpenses: 35000,
  connections: { bank: true, ecommerce: true },
  healthScore: 75,
};

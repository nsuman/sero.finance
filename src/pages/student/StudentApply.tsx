import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ConnectionCard, { ConnectionItem } from "@/components/ConnectionCard";
import ScoreReveal from "@/components/ScoreReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const schools = ["MIT Sloan", "Harvard Kennedy School", "HBS", "Stanford GSB", "Wharton", "Other"];
const programs = ["MBA", "MPA", "MPP", "MS", "PhD", "Other"];

const studentConnections: ConnectionItem[] = [
  { emoji: "🏦", title: "Bank Accounts", description: "Checking & savings accounts", key: "bank" },
  { emoji: "💳", title: "Credit Cards", description: "All credit card accounts", key: "cards" },
  { emoji: "💰", title: "Savings / Investments", description: "Robinhood, Acorns, etc.", key: "savings" },
  { emoji: "🏠", title: "Rent Reporting", description: "Apartments.com, Zillow Rent", key: "rent" },
  { emoji: "📱", title: "Mobile Wallets", description: "Venmo, Cash App, PayPal", key: "wallets" },
  { emoji: "🎓", title: "Student Loan Servicer", description: "Nelnet, Navient, etc.", key: "loans" },
];

const scholarshipsBySchool: Record<string, { name: string; match: number; desc: string }[]> = {
  "MIT Sloan": [
    { name: "Legatum Fellowship", match: 82, desc: "Emerging markets founders" },
    { name: "Siebel Scholars", match: 75, desc: "Academic excellence" },
    { name: "Social Impact Fellowship", match: 70, desc: "ESG / nonprofit focus" },
  ],
  "Harvard Kennedy School": [
    { name: "Carr Center Fellowship", match: 80, desc: "Human rights and policy" },
    { name: "Belfer Center Grant", match: 72, desc: "Science & international affairs" },
    { name: "Public Service Grant", match: 68, desc: "Government service track" },
  ],
};

const habitScoreItems = [
  { emoji: "🏦", label: "Bank: On-time payments 95%", status: "good" as const },
  { emoji: "💳", label: "Cards: Utilization 12% (excellent)", status: "good" as const },
  { emoji: "💰", label: "Savings: 1.2 months runway", status: "warning" as const },
  { emoji: "🏠", label: "Rent: 18 months on-time", status: "good" as const },
  { emoji: "📱", label: "Wallets: Consistent peer payments", status: "good" as const },
  { emoji: "🎓", label: "Loans: No late payments", status: "good" as const },
];

const StudentApply = () => {
  const navigate = useNavigate();
  const { studentData, setStudentData, currentDemo } = useApp();
  const [step, setStep] = useState(1);
  const [showScholarships, setShowScholarships] = useState(false);

  const s = studentData;
  const update = (partial: Partial<typeof s>) => setStudentData({ ...s, ...partial });
  const connectedCount = Object.values(s.connections).filter(Boolean).length;
  const loanNeeded = Math.max(0, s.coa - s.existingAid);
  const schoolScholarships = scholarshipsBySchool[s.school] || scholarshipsBySchool["MIT Sloan"];

  const handleConnect = (key: string) => {
    const newConn = { ...s.connections, [key]: true };
    const count = Object.values(newConn).filter(Boolean).length;
    update({ connections: newConn, habitScore: count >= 2 ? (currentDemo === "sara" ? 82 : 84) : 0 });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-10 w-full">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`h-2 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
              <span className={`text-xs font-medium ${i === step ? "text-primary" : "text-muted-foreground"}`}>
                {i}/{4}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: School */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">School & Program</h2>
            <div className="grid gap-4">
              <div>
                <Label>School</Label>
                <Select value={s.school} onValueChange={v => update({ school: v })}>
                  <SelectTrigger><SelectValue placeholder="Select school" /></SelectTrigger>
                  <SelectContent>{schools.map(sc => <SelectItem key={sc} value={sc}>{sc}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Program</Label>
                <Select value={s.program} onValueChange={v => update({ program: v })}>
                  <SelectTrigger><SelectValue placeholder="Select program" /></SelectTrigger>
                  <SelectContent>{programs.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            {s.school === "MIT Sloan" && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4 text-sm">
                  <p className="font-medium">Typical MIT Sloan MBA fellowships:</p>
                  <p className="text-muted-foreground">$42k/year + named awards like Legatum, Siebel</p>
                </CardContent>
              </Card>
            )}
            <Button onClick={() => setStep(2)} disabled={!s.school}>Next →</Button>
          </div>
        )}

        {/* Step 2: Cost + Scholarships */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Cost & Scholarships</h2>
            <div className="grid gap-4">
              <div>
                <Label>Cost of Attendance ($)</Label>
                <Input type="number" value={s.coa || ""} onChange={e => update({ coa: Number(e.target.value) })} placeholder="230000" />
              </div>
              <div>
                <Label>Existing Aid ($)</Label>
                <Input type="number" value={s.existingAid || ""} onChange={e => update({ existingAid: Number(e.target.value) })} placeholder="35000" />
              </div>
            </div>
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Loan needed</p>
                <p className="text-3xl font-bold text-primary">${loanNeeded.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Button variant="outline" onClick={() => setShowScholarships(true)}>🔍 Scholarship Finder</Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>← Back</Button>
              <Button onClick={() => { update({ loanNeeded }); setStep(3); }}>Next →</Button>
            </div>

            <Dialog open={showScholarships} onOpenChange={setShowScholarships}>
              <DialogContent>
                <DialogHeader><DialogTitle>Scholarships for {s.school || "your school"}</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  {schoolScholarships.map(sc => (
                    <Card key={sc.name}>
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{sc.name}</p>
                          <p className="text-xs text-muted-foreground">{sc.desc}</p>
                        </div>
                        <span className="text-sm font-bold text-primary">{sc.match}% match</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button onClick={() => {
                  update({ savedScholarships: schoolScholarships.map(s => s.name) });
                  setShowScholarships(false);
                }}>Save {schoolScholarships.length} scholarships</Button>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Step 3: Data Connections */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Prove Your Financial Habits</h2>
            <p className="text-muted-foreground">Connect accounts to build your Financial Habit Score (optional but powerful).</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {studentConnections.map(item => (
                <ConnectionCard key={item.key} item={item} connected={!!s.connections[item.key]} onConnect={handleConnect} />
              ))}
            </div>
            <ScoreReveal
              title="FINANCIAL HABIT SCORE"
              score={s.habitScore || 84}
              items={habitScoreItems}
              visible={connectedCount >= 2}
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>← Back</Button>
              <Button onClick={() => setStep(4)}>Next →</Button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Review & Submit</h2>
            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between"><span className="text-muted-foreground">School</span><span className="font-medium">{s.school} {s.program}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Loan needed</span><span className="font-medium">${(s.loanNeeded || loanNeeded).toLocaleString()}</span></div>
                {s.habitScore > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Financial Habit Score</span><span className="font-bold text-primary">{s.habitScore}/100</span></div>}
                {s.savedScholarships.length > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Scholarships saved</span><span className="font-medium">{s.savedScholarships.length} ✓</span></div>}
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)}>← Back</Button>
              <Button onClick={() => navigate("/student/quotes")}>Submit & See Offers →</Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StudentApply;

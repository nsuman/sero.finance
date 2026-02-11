import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const { studentData, businessData } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto max-w-4xl px-4 py-10 w-full">
        <h1 className="text-2xl font-bold mb-8">Your Applications</h1>

        <div className="space-y-4 mb-10">
          {studentData.school && (
            <Card className="hover:border-primary/30 transition-all cursor-pointer" onClick={() => navigate("/student/quotes")}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="font-bold">Student Loan – {studentData.school}</p>
                  <p className="text-sm text-muted-foreground">3 offers received</p>
                </div>
                <Button variant="outline" size="sm">View →</Button>
              </CardContent>
            </Card>
          )}
          {businessData.businessName && (
            <Card className="hover:border-primary/30 transition-all cursor-pointer" onClick={() => navigate("/business/quotes")}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <p className="font-bold">Business Loan – {businessData.businessName}</p>
                  <p className="text-sm text-muted-foreground">Submitted</p>
                </div>
                <Button variant="outline" size="sm">View →</Button>
              </CardContent>
            </Card>
          )}
          {!studentData.school && !businessData.businessName && (
            <p className="text-muted-foreground">No applications yet. <a href="/student/start" className="text-primary underline">Start one →</a></p>
          )}
        </div>

        {studentData.savedScholarships.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4">Saved Scholarships</h2>
            <div className="space-y-2 mb-10">
              {studentData.savedScholarships.map(s => (
                <Card key={s}><CardContent className="p-4"><p className="text-sm font-medium">{s}</p></CardContent></Card>
              ))}
            </div>
          </>
        )}

        <h2 className="text-xl font-bold mb-4">Opportunities</h2>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm">💡 Refinance alert: You could save $3.6k by refinancing at current rates.</p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const StudentStart = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 mx-auto max-w-3xl px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-2">Student Loans & Refinancing</h1>
        <p className="text-muted-foreground text-center mb-10">AI-powered rate matching for graduate and professional students.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="cursor-pointer hover:border-primary/50 transition-all" onClick={() => navigate("/student/apply")}>
            <CardContent className="p-8 text-center">
              <span className="text-4xl mb-4 block">🎓</span>
              <h2 className="text-xl font-bold mb-2">Fund my degree</h2>
              <p className="text-sm text-muted-foreground mb-4">New loans for MBA, MPA, MS, and more.</p>
              <Button className="w-full">Start application →</Button>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50 transition-all" onClick={() => navigate("/student/apply")}>
            <CardContent className="p-8 text-center">
              <span className="text-4xl mb-4 block">🔄</span>
              <h2 className="text-xl font-bold mb-2">Refinance loans</h2>
              <p className="text-sm text-muted-foreground mb-4">Lower your rate on existing student debt.</p>
              <Button variant="outline" className="w-full">Start refinance →</Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentStart;

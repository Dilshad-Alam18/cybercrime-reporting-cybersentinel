import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, CheckCircle, AlertCircle, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const mockCases = [
  { id: "CS-A8F3B2D1", type: "OTP Fraud", status: "investigating", date: "2026-03-28", updates: 3 },
  { id: "CS-7C2E9F4A", type: "Online Harassment", status: "resolved", date: "2026-03-15", updates: 7 },
  { id: "CS-D5B1E8C3", type: "Data Theft", status: "pending", date: "2026-04-01", updates: 1 },
];

const statusConfig: Record<string, { label: string; icon: typeof Clock; className: string }> = {
  pending: { label: "Pending Review", icon: Clock, className: "text-cyber-amber" },
  investigating: { label: "Under Investigation", icon: AlertCircle, className: "text-primary" },
  resolved: { label: "Resolved", icon: CheckCircle, className: "text-cyber-green" },
};

const TrackCase = () => {
  const [caseId, setCaseId] = useState("");
  const [searched, setSearched] = useState(false);

  const foundCase = mockCases.find((c) => c.id.toLowerCase() === caseId.toLowerCase());

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Track <span className="text-primary">Case</span></h1>
            <p className="text-muted-foreground">Enter your case ID to view real-time status updates.</p>
          </div>

          <div className="flex gap-3 mb-10">
            <Input
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              placeholder="Enter Case ID (e.g., CS-A8F3B2D1)"
              className="bg-card border-border font-mono"
            />
            <Button onClick={() => setSearched(true)} className="glow-blue-sm shrink-0">
              <Search className="h-4 w-4 mr-2" /> Track
            </Button>
          </div>

          {searched && foundCase && (
            <div className="border border-border rounded-xl bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-muted-foreground">{foundCase.id}</span>
                <span className={`flex items-center gap-1.5 text-sm font-medium ${statusConfig[foundCase.status].className}`}>
                  {(() => { const Icon = statusConfig[foundCase.status].icon; return <Icon className="h-4 w-4" />; })()}
                  {statusConfig[foundCase.status].label}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div><span className="text-muted-foreground block text-xs">Type</span>{foundCase.type}</div>
                <div><span className="text-muted-foreground block text-xs">Filed</span>{foundCase.date}</div>
                <div><span className="text-muted-foreground block text-xs">Updates</span>{foundCase.updates}</div>
              </div>
              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-medium mb-3">Timeline</h4>
                <div className="space-y-3">
                  {[
                    { time: "2 hours ago", text: "Evidence verified on IPFS" },
                    { time: "1 day ago", text: "Case assigned to investigator" },
                    { time: "3 days ago", text: "Complaint recorded on blockchain" },
                  ].map((t, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {i < 2 && <div className="w-px h-full bg-border" />}
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">{t.time}</span>
                        <p>{t.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {searched && !foundCase && (
            <div className="text-center py-10 text-muted-foreground">
              <AlertCircle className="h-8 w-8 mx-auto mb-3 text-cyber-amber" />
              <p>No case found. Check your Case ID and try again.</p>
              <p className="text-xs mt-2">Try: CS-A8F3B2D1, CS-7C2E9F4A, or CS-D5B1E8C3</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TrackCase;

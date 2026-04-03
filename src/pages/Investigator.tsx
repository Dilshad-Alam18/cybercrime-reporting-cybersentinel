import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCases, subscribe, type CaseRecord } from "@/lib/caseStore";

const priorityConfig: Record<string, { label: string; className: string }> = {
  high: { label: "High", className: "bg-cyber-red/10 text-cyber-red border-cyber-red/20" },
  medium: { label: "Medium", className: "bg-cyber-amber/10 text-cyber-amber border-cyber-amber/20" },
  low: { label: "Low", className: "bg-cyber-green/10 text-cyber-green border-cyber-green/20" },
};

const statusConfig: Record<string, { label: string; icon: typeof Clock }> = {
  open: { label: "Open", icon: AlertTriangle },
  investigating: { label: "Investigating", icon: Eye },
  resolved: { label: "Resolved", icon: CheckCircle },
};

const Investigator = () => {
  const [search, setSearch] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<CaseRecord | null>(null);
  const cases = useSyncExternalStore(subscribe, getCases);

  const filtered = cases.filter((c) => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) || c.type.toLowerCase().includes(search.toLowerCase());
    const matchPriority = filterPriority === "all" || c.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Investigator <span className="text-primary">Command Queue</span></h1>
            <p className="text-muted-foreground">AI-triaged case queue for authorized law enforcement.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Open Cases", value: cases.filter(c => c.status === "open").length, color: "text-cyber-red" },
              { label: "Investigating", value: cases.filter(c => c.status === "investigating").length, color: "text-primary" },
              { label: "Resolved", value: cases.filter(c => c.status === "resolved").length, color: "text-cyber-green" },
              { label: "Total", value: cases.length, color: "text-foreground" },
            ].map((s) => (
              <div key={s.label} className="border border-border rounded-lg bg-card p-4">
                <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search cases..." className="pl-10 bg-card border-border" />
            </div>
            <div className="flex gap-2">
              {["all", "high", "medium", "low"].map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={filterPriority === p ? "default" : "outline"}
                  onClick={() => setFilterPriority(p)}
                  className="capitalize"
                >
                  {p === "all" ? "All" : p}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((c) => {
              const StatusIcon = (statusConfig[c.status] || statusConfig.open).icon;
              const statusLabel = (statusConfig[c.status] || statusConfig.open).label;
              return (
                <div key={c.id} className="border border-border rounded-xl bg-card p-5 hover:border-primary/30 transition-all flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm text-primary">{c.id}</span>
                      <Badge variant="outline" className={priorityConfig[c.priority]?.className}>
                        {priorityConfig[c.priority]?.label}
                      </Badge>
                    </div>
                    <h3 className="font-medium">{c.type}</h3>
                    <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{c.location}</span>
                      <span>{c.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <StatusIcon className="h-4 w-4" /> {statusLabel}
                    </span>
                    <Button size="sm" variant="outline" className="border-border" onClick={() => setSelectedCase(c)}>
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />

      <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
        <DialogContent className="max-w-lg">
          {selectedCase && (() => {
            const StatusIcon = (statusConfig[selectedCase.status] || statusConfig.open).icon;
            const statusLabel = (statusConfig[selectedCase.status] || statusConfig.open).label;
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <span className="font-mono text-primary">{selectedCase.id}</span>
                    <Badge variant="outline" className={priorityConfig[selectedCase.priority]?.className}>
                      {priorityConfig[selectedCase.priority]?.label}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedCase.type}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{selectedCase.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Location</span>
                      <p className="font-medium">{selectedCase.location}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Date</span>
                      <p className="font-medium">{selectedCase.date}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status</span>
                      <p className="font-medium flex items-center gap-1.5"><StatusIcon className="h-4 w-4" /> {statusLabel}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Evidence Files</span>
                      <p className="font-medium">{selectedCase.files.length > 0 ? selectedCase.files.join(", ") : "None"}</p>
                    </div>
                  </div>
                  {selectedCase.updates.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Case Updates</h4>
                      <div className="space-y-2 border-l-2 border-primary/20 pl-4">
                        {selectedCase.updates.map((u, i) => (
                          <div key={i}>
                            <p className="text-sm">{u.text}</p>
                            <p className="text-xs text-muted-foreground">{u.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Investigator;

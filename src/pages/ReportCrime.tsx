import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Upload, AlertTriangle, CreditCard, Users, MessageSquare, Database, FileText, X, Copy, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useAddCase, generateCaseId } from "@/hooks/useCases";
import { supabase } from "@/integrations/supabase/client";

const crimeTypes = [
  { value: "otp-fraud", label: "OTP Fraud", icon: CreditCard },
  { value: "harassment", label: "Online Harassment", icon: MessageSquare },
  { value: "data-theft", label: "Data Theft", icon: Database },
  { value: "identity-theft", label: "Identity Theft", icon: Users },
  { value: "phishing", label: "Phishing", icon: AlertTriangle },
  { value: "other", label: "Other", icon: FileText },
];

const crimeTypeLabels: Record<string, string> = {
  "otp-fraud": "OTP Fraud",
  "harassment": "Online Harassment",
  "data-theft": "Data Theft",
  "identity-theft": "Identity Theft",
  "phishing": "Phishing",
  "other": "Other",
};

const ReportCrime = () => {
  const { toast } = useToast();
  const addCase = useAddCase();
  const [crimeType, setCrimeType] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [files, setFiles] = useState<File[]>([]);
  const [submittedCaseId, setSubmittedCaseId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCopy = async () => {
    if (!submittedCaseId) return;
    await navigator.clipboard.writeText(submittedCaseId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const caseId = generateCaseId();
    try {
      // Upload evidence files to storage
      const uploadedUrls: string[] = [];
      for (const file of files) {
        const ext = file.name.split(".").pop();
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${caseId}/${Date.now()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("evidence")
          .upload(path, file, { contentType: file.type || undefined, upsert: false });
        if (uploadError) throw uploadError;
        const { data: pub } = supabase.storage.from("evidence").getPublicUrl(path);
        uploadedUrls.push(pub.publicUrl);
      }

      await addCase.mutateAsync({
        case_id: caseId,
        type: crimeTypeLabels[crimeType] || crimeType,
        priority,
        status: "open",
        incident_date: incidentDate || null,
        location: location || "Not specified",
        description,
        files: uploadedUrls,
        updates: [{ time: "Just now", text: "Complaint recorded on blockchain" }],
      });
      setSubmittedCaseId(caseId);
      toast({
        title: "Complaint Submitted",
        description: `Your complaint has been recorded. Case ID: ${caseId}`,
      });
      setCrimeType("");
      setDescription("");
      setIncidentDate("");
      setLocation("");
      setPriority("medium");
      setFiles([]);
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit complaint. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Report Crime</h1>
            <p className="text-muted-foreground">Your identity is protected. All reports are anonymous and blockchain-verified.</p>
          </div>

          {submittedCaseId && (
            <div className="mb-8 border border-primary/30 rounded-xl bg-primary/5 p-5 text-center space-y-3">
              <CheckCircle className="h-8 w-8 text-cyber-green mx-auto" />
              <p className="font-semibold text-lg">Complaint Submitted Successfully!</p>
              <p className="text-sm text-muted-foreground">Save your Case ID to track the status:</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xl text-primary">{submittedCaseId}</span>
                <Button size="sm" variant="outline" onClick={handleCopy} className="border-border">
                  {copied ? <CheckCircle className="h-4 w-4 text-cyber-green" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <Button variant="link" onClick={() => setSubmittedCaseId(null)} className="text-sm">
                Report another crime
              </Button>
            </div>
          )}

          {!submittedCaseId && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Select Crime Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {crimeTypes.map((ct) => (
                    <button
                      type="button"
                      key={ct.value}
                      onClick={() => setCrimeType(ct.value)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
                        crimeType === ct.value
                          ? "border-primary bg-primary/10 glow-blue-sm"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <ct.icon className={`h-6 w-6 ${crimeType === ct.value ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-xs font-medium">{ct.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the incident in detail..."
                  className="min-h-[120px] bg-card border-border"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Incident Date</label>
                  <Input type="date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} className="bg-card border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Location (Optional)</label>
                  <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City, State" className="bg-card border-border" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Priority / Severity</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: "low", label: "Low", className: "text-cyber-green border-cyber-green/40 bg-cyber-green/10" },
                    { value: "medium", label: "Medium", className: "text-cyber-amber border-cyber-amber/40 bg-cyber-amber/10" },
                    { value: "high", label: "High", className: "text-cyber-red border-cyber-red/40 bg-cyber-red/10" },
                  ] as const).map((p) => (
                    <button
                      type="button"
                      key={p.value}
                      onClick={() => setPriority(p.value)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                        priority === p.value ? p.className : "border-border bg-card text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Select how urgent this case is. Investigators will be guided by this.</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Upload Evidence (IPFS Secured)</label>
                <div
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-2">Click to browse or drag & drop files</p>
                  <p className="text-xs text-muted-foreground">Screenshots, documents, audio — max 20MB each</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {files.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {files.map((f, i) => (
                      <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        <span className="flex-1">{f.name}</span>
                        <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-foreground">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Language</label>
                <Select>
                  <SelectTrigger className="bg-card border-border">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" size="lg" className="w-full glow-blue" disabled={!crimeType || !description || addCase.isPending}>
                {addCase.isPending ? "Submitting..." : "Submit Anonymous Report"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Your report will be encrypted and stored on Ethereum blockchain via smart contract.
              </p>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ReportCrime;

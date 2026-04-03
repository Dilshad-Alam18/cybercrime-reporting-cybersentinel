import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Upload, AlertTriangle, CreditCard, Users, MessageSquare, Database, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const crimeTypes = [
  { value: "otp-fraud", label: "OTP Fraud", icon: CreditCard },
  { value: "harassment", label: "Online Harassment", icon: MessageSquare },
  { value: "data-theft", label: "Data Theft", icon: Database },
  { value: "identity-theft", label: "Identity Theft", icon: Users },
  { value: "phishing", label: "Phishing", icon: AlertTriangle },
  { value: "other", label: "Other", icon: FileText },
];

const ReportCrime = () => {
  const { toast } = useToast();
  const [crimeType, setCrimeType] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been recorded on the blockchain. Case ID: CS-" + Math.random().toString(36).substr(2, 8).toUpperCase(),
    });
    setCrimeType("");
    setDescription("");
    setFiles([]);
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Crime Type Selection */}
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

            {/* Description */}
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

            {/* Date & Location */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Incident Date</label>
                <Input type="date" className="bg-card border-border" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location (Optional)</label>
                <Input placeholder="City, State" className="bg-card border-border" />
              </div>
            </div>

            {/* Evidence Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Upload Evidence (IPFS Secured)</label>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">Drag & drop files or click to browse</p>
                <p className="text-xs text-muted-foreground">Screenshots, documents, audio — max 20MB each</p>
                <input
                  type="file"
                  multiple
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  style={{ position: "relative" }}
                />
              </div>
              {files.length > 0 && (
                <div className="mt-3 space-y-1">
                  {files.map((f, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                      <FileText className="h-3 w-3" /> {f.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Language */}
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

            <Button type="submit" size="lg" className="w-full glow-blue" disabled={!crimeType || !description}>
              Submit Anonymous Report
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Your report will be encrypted and stored on Ethereum blockchain via smart contract.
            </p>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ReportCrime;

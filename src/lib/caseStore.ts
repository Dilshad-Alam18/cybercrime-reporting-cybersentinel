export interface CaseRecord {
  id: string;
  type: string;
  priority: "high" | "medium" | "low";
  status: "open" | "investigating" | "resolved";
  date: string;
  location: string;
  description: string;
  files: string[];
  updates: { time: string; text: string }[];
}

const defaultCases: CaseRecord[] = [
  {
    id: "CS-A8F3B2D1",
    type: "OTP Fraud",
    priority: "high",
    status: "investigating",
    date: "2026-04-01",
    location: "Mumbai, MH",
    description: "Received fraudulent OTP request",
    files: [],
    updates: [
      { time: "2 hours ago", text: "Evidence verified on IPFS" },
      { time: "1 day ago", text: "Case assigned to investigator" },
      { time: "3 days ago", text: "Complaint recorded on blockchain" },
    ],
  },
  {
    id: "CS-7C2E9F4A",
    type: "Online Harassment",
    priority: "medium",
    status: "investigating",
    date: "2026-03-28",
    location: "Delhi, DL",
    description: "Persistent online harassment via social media",
    files: [],
    updates: [
      { time: "1 day ago", text: "Case under review" },
      { time: "5 days ago", text: "Complaint recorded on blockchain" },
    ],
  },
  {
    id: "CS-D5B1E8C3",
    type: "Data Theft",
    priority: "high",
    status: "open",
    date: "2026-03-25",
    location: "Bangalore, KA",
    description: "Unauthorized access to personal data",
    files: [],
    updates: [
      { time: "Just now", text: "Complaint recorded on blockchain" },
    ],
  },
  {
    id: "CS-F2A9C7E1",
    type: "Phishing",
    priority: "low",
    status: "resolved",
    date: "2026-03-20",
    location: "Chennai, TN",
    description: "Phishing email received",
    files: [],
    updates: [
      { time: "3 days ago", text: "Case resolved" },
      { time: "10 days ago", text: "Complaint recorded on blockchain" },
    ],
  },
  {
    id: "CS-B4D6E8F2",
    type: "Identity Theft",
    priority: "high",
    status: "open",
    date: "2026-04-02",
    location: "Pune, MH",
    description: "Identity stolen and used for fraud",
    files: [],
    updates: [
      { time: "Just now", text: "Complaint recorded on blockchain" },
    ],
  },
  {
    id: "CS-E1C3A5B7",
    type: "OTP Fraud",
    priority: "medium",
    status: "investigating",
    date: "2026-03-30",
    location: "Kolkata, WB",
    description: "OTP fraud attempt via phone call",
    files: [],
    updates: [
      { time: "2 days ago", text: "Case assigned to investigator" },
      { time: "4 days ago", text: "Complaint recorded on blockchain" },
    ],
  },
];

let cases: CaseRecord[] = [...defaultCases];
let listeners: (() => void)[] = [];

export function getCases(): CaseRecord[] {
  return cases;
}

export function addCase(c: CaseRecord) {
  cases = [c, ...cases];
  listeners.forEach((fn) => fn());
}

export function subscribe(fn: () => void) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((l) => l !== fn);
  };
}

export function generateCaseId(): string {
  return "CS-" + Math.random().toString(36).substr(2, 8).toUpperCase();
}

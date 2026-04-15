import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CaseRecord {
  id: string;
  case_id: string;
  type: string;
  priority: string;
  status: string;
  incident_date: string | null;
  location: string | null;
  description: string;
  files: string[];
  updates: { time: string; text: string }[];
  reporter_id: string | null;
  created_at: string;
}

export function useCases() {
  return useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as CaseRecord[];
    },
  });
}

export function useCaseByIdQuery(caseId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["case", caseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .ilike("case_id", caseId)
        .maybeSingle();
      if (error) throw error;
      return data as CaseRecord | null;
    },
    enabled,
  });
}

export function useAddCase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newCase: {
      case_id: string;
      type: string;
      priority: string;
      status: string;
      incident_date: string | null;
      location: string;
      description: string;
      files: string[];
      updates: { time: string; text: string }[];
    }) => {
      const { data, error } = await supabase
        .from("cases")
        .insert(newCase)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}

export function generateCaseId(): string {
  return "CS-" + Math.random().toString(36).substr(2, 8).toUpperCase();
}

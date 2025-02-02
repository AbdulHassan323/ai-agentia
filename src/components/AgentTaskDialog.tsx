import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, Loader2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from 'react-markdown';

interface AgentTaskDialogProps {
  agent: {
    name: string;
    description: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TaskFormData = {
  objective: string;
  context: string;
  deadline: string;
  [key: string]: string;
};

const getAgentSpecificFields = (agentName: string) => {
  switch (agentName) {
    case "Competitor Analyst":
      return [
        {
          name: "competitorUrls",
          label: "Competitor URLs",
          type: "textarea",
          placeholder: "Enter competitor URLs (one per line)",
          tooltip: "Add the main URLs of competitors you want to analyze",
        },
        {
          name: "targetMetrics",
          label: "Target Metrics",
          type: "select",
          options: ["Pricing", "SEO", "Features", "Marketing Strategy"],
          tooltip: "Select the aspects you want to analyze",
        },
        {
          name: "reportFrequency",
          label: "Report Frequency",
          type: "select",
          options: ["Daily", "Weekly", "Monthly"],
          tooltip: "How often should the analysis be updated?",
        },
      ];
    case "Code Generator":
      return [
        {
          name: "programmingLanguage",
          label: "Programming Language",
          type: "select",
          options: ["Python", "JavaScript", "TypeScript", "Java", "C++"],
          tooltip: "Select the target programming language",
        },
        {
          name: "functionality",
          label: "Functionality Description",
          type: "textarea",
          placeholder: "Describe the desired functionality in detail...",
          tooltip: "Provide a clear description of what the code should do",
        },
      ];
    // Add more cases for other agents
    default:
      return [];
  }
};

export function AgentTaskDialog({ agent, open, onOpenChange }: AgentTaskDialogProps) {
  const { toast } = useToast();
  const form = useForm<TaskFormData>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const agentFields = getAgentSpecificFields(agent.name);

  const onSubmit = async (data: TaskFormData) => {
    setIsProcessing(true);
    setResponse(null); // Reset response when submitting new task
    
    try {
      console.log("Submitting task with data:", { agent: agent.name, ...data });
      
      const { data: result, error } = await supabase.functions.invoke('process-agent-task', {
        body: {
          agent: agent.name,
          ...data,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to process task");
      }

      console.log("Task result:", result);
      
      if (result?.result) {
        setResponse(result.result);
        toast({
          title: "Task Completed",
          description: "Your task has been processed successfully. Check the results below.",
        });
      } else {
        console.error("Invalid response format:", result);
        throw new Error("Invalid response format from the server");
      }

    } catch (error) {
      console.error("Error processing task:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to process task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-cyber-black border-cyber-purple/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-cyber-cyan">{agent.name}</DialogTitle>
          <DialogDescription className="text-cyber-white/70">
            {agent.description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyber-white">Task Objective</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What do you want to achieve?"
                      className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {agentFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-cyber-white">{field.label}</FormLabel>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-cyber-cyan/60" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{field.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <FormControl>
                      {field.type === "textarea" ? (
                        <Textarea
                          placeholder={field.placeholder}
                          className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white min-h-[100px]"
                          {...formField}
                        />
                      ) : field.type === "select" ? (
                        <Select
                          onValueChange={formField.onChange}
                          defaultValue={formField.value}
                        >
                          <SelectTrigger className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option} value={option.toLowerCase()}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          placeholder={field.placeholder}
                          className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
                          {...formField}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyber-white">Additional Context</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional details or requirements..."
                      className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                disabled={isProcessing}
                className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Submit Task"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>

        {response && (
          <div className="mt-6 p-4 bg-cyber-black/40 rounded-lg border border-cyber-purple/30">
            <h3 className="text-lg font-semibold text-cyber-cyan mb-4">Response:</h3>
            <div className="prose prose-invert max-w-none overflow-y-auto max-h-[400px] text-cyber-white">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
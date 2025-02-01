import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [llmEngine, setLlmEngine] = useState<string>("openai");

  const agentFields = getAgentSpecificFields(agent.name);

  const onSubmit = async (data: TaskFormData) => {
    console.log("Task data to be sent to LLM:", {
      agent: agent.name,
      llmEngine,
      ...data,
    });

    toast({
      title: "Task Submitted",
      description: `Your task has been queued for processing with ${llmEngine.toUpperCase()}. We'll notify you once it's complete.`,
    });

    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-cyber-black border-cyber-purple/30">
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

            <div className="space-y-4">
              <FormItem>
                <FormLabel className="text-cyber-white">LLM Engine (Coming Soon)</FormLabel>
                <Select
                  disabled
                  value={llmEngine}
                  onValueChange={setLlmEngine}
                >
                  <SelectTrigger className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white/50">
                    <SelectValue placeholder="Select LLM Engine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="gemini">Gemini</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-gradient-to-r from-cyber-purple to-cyber-cyan hover:opacity-90 text-white"
              >
                Submit Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

interface AgentTaskDialogProps {
  agent: {
    name: string;
    description: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TaskFormData {
  objective: string;
  context: string;
  deadline: string;
}

export function AgentTaskDialog({ agent, open, onOpenChange }: AgentTaskDialogProps) {
  const { toast } = useToast();
  const form = useForm<TaskFormData>({
    defaultValues: {
      objective: "",
      context: "",
      deadline: "",
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    // This will be replaced with actual LLM integration later
    console.log("Task data to be sent to LLM:", {
      agent: agent.name,
      ...data,
    });

    toast({
      title: "Task Submitted",
      description: `Your task has been assigned to ${agent.name}. We'll notify you once it's processed.`,
    });

    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-cyber-black border-cyber-purple/30">
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
                  <FormDescription className="text-cyber-white/50">
                    Clearly state your main goal for this task
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyber-white">Context & Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide any relevant context or specific requirements..."
                      className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-cyber-white">Preferred Deadline</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      className="bg-cyber-black/50 border-cyber-purple/30 text-cyber-white"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
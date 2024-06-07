"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ToastDestructiveProps {
  errorMessage: any;
}

export const ToastDestructive = ({ errorMessage }: ToastDestructiveProps) => {
  const { toast } = useToast();
  useEffect(() => {
    if (errorMessage) {
      toast({
        variant: "destructive",
        title: errorMessage,
       
      });
    }
  }, [errorMessage, toast]);

  return null;
};

export default ToastDestructive;

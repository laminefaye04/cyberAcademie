import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-cyber-500/40 bg-cyber-500/10 shadow-[0_0_12px_rgba(79,209,197,0.35)]">
        <Terminal className="h-4 w-4 text-cyber-500" />
      </div>
      <span className="text-lg font-semibold tracking-tight">
        Cyber<span className="text-cyber-500">Academy</span>
      </span>
    </div>
  );
}

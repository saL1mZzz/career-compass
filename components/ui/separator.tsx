import { cn } from "@/lib/utils";

export function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-[color:var(--line)]"
          : "h-full w-px bg-[color:var(--line)]",
        className,
      )}
    />
  );
}

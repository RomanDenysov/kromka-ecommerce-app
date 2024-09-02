import { Loader2 } from "lucide-react";
import { Button, type ButtonProps } from "~/shared/ui/components/button";
import { cn } from "~/shared/lib/utils";

export function LoaderButton({
  children,
  isLoading,
  className,
  ...props
}: ButtonProps & { isLoading: boolean }) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      {...props}
      className={cn("flex justify-center gap-2 px-3", className)}
    >
      {isLoading && <Loader2 size={20} className="animate-spin" />}
      {children}
    </Button>
  );
}
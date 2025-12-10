import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";

type PageTitleProps = {
  title: string;
  children?: React.ReactNode;
  className?: string;
};

export function PageTitle({ title, children, className }: PageTitleProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3 mb-8", className)}>
      <h1 className="text-4xl font-bold text-foreground">
        {title}
      </h1>
      <div className="flex items-center gap-3 flex-wrap justify-end">
        {children}
        <Button asChild variant="outline" size="sm" className="whitespace-nowrap">
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
}

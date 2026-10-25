import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-violeta-500 text-white hover:bg-violeta-700",
  outline: "border border-violeta-500 text-violeta-700 hover:bg-violeta-700 hover:text-white",
  // Para fondos oscuros.
  light: "bg-lavanda-50 text-violeta-950 hover:bg-white",
  "outline-light": "border border-lavanda-300 text-lavanda-50 hover:bg-lavanda-50/10",
};

type ButtonProps = React.ComponentProps<"a"> & { variant?: Variant };

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const external = typeof props.href === "string" && /^https?:/.test(props.href);
  return (
    <a
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium tracking-wide transition-colors duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
    </a>
  );
}

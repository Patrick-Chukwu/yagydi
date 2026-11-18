import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-transparent font-bold leading-none no-underline transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid disabled:pointer-events-none disabled:opacity-50";

const buttonSizes = {
  sm: "min-h-11 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-3 text-base",
  lg: "min-h-14 px-8 py-3.5 text-lg",
} as const;

const buttonVariants = {
  primary:
    "bg-orange-100 text-black hover:brightness-95 active:brightness-90 focus-visible:outline-wisteria-900",
  secondary:
    "bg-wisteria-100 text-white hover:bg-wisteria-700 active:bg-wisteria-900 focus-visible:outline-orange-100",
  outline:
    "border-wisteria-100 bg-transparent text-wisteria-900 hover:bg-wisteria-20 active:bg-wisteria-40 focus-visible:outline-wisteria-700",
  ghost:
    "bg-transparent text-wisteria-900 hover:bg-lavender-40 active:bg-lavender-80 focus-visible:outline-wisteria-700",
  white:
    "bg-white text-wisteria-900 hover:bg-lavender-20 active:bg-lavender-40 focus-visible:outline-wisteria-700",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;

type ButtonShared = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = ButtonShared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonShared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function buttonClassName(
  variant: ButtonVariant = "primary",
  className?: string,
  size: ButtonSize = "md",
) {
  return cn(buttonBase, buttonSizes[size], buttonVariants[variant], className);
}

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Button(props: ButtonProps) {
  if (typeof props.href === "string") {
    const { href, variant = "primary", size = "md", className, children, ...rest } = props;
    const classes = buttonClassName(variant, className, size);
    if (isExternal(href)) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant = "primary", size = "md", className, type = "button", children, ...rest } =
    props;
  return (
    <button type={type} className={buttonClassName(variant, className, size)} {...rest}>
      {children}
    </button>
  );
}

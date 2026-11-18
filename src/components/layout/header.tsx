"use client";

import { ChevronDown, Handshake, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { SocialLinks } from "@/components/layout/social-links";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { donateCta, donateMonthlyCta, mainNav } from "@/content/navigation";
import { programmes } from "@/content/programmes";
import { partnership } from "@/content/partnership";
import { site } from "@/content/site";
import { ProgrammeGlyph } from "@/lib/programme-icons";
import { cn, focusRing, focusRingOnDark } from "@/lib/utils";

type HeaderProps = {
  logoReady: boolean;
};

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  const path = href.split("#")[0] ?? href;
  return pathname === path || pathname.startsWith(`${path}/`);
}

export function Header({ logoReady }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState({ open: false, path: pathname });
  const [whatState, setWhatState] = useState({ open: false, path: pathname });
  const menuOpen = menuState.open && menuState.path === pathname;
  const whatOpen = whatState.open && whatState.path === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const whatButtonRef = useRef<HTMLButtonElement>(null);
  const whatItemRef = useRef<HTMLLIElement>(null);
  const openedByHover = useRef(false);

  function closeMenu() {
    setMenuState({ open: false, path: pathname });
  }

  function toggleMenu() {
    setMenuState((state) => ({
      open: !(state.open && state.path === pathname),
      path: pathname,
    }));
  }

  function closeWhat() {
    setWhatState({ open: false, path: pathname });
  }

  function openWhat() {
    setWhatState({ open: true, path: pathname });
  }

  const whatWeDo = mainNav.find((item) => item.children);
  const whatChildren = whatWeDo?.children ?? [];
  const programmeLinks = whatChildren.flatMap((child) => {
    const programme = programmes.find((item) => `/what-we-do/${item.slug}` === child.href);
    return programme ? [{ child, programme }] : [];
  });
  const extraLinks = whatChildren.filter(
    (child) => !programmes.some((item) => `/what-we-do/${item.slug}` === child.href),
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setMenuState((state) => ({ ...state, open: false }));
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!whatOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setWhatState((state) => ({ ...state, open: false }));
      whatButtonRef.current?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (!(target instanceof Node) || !whatItemRef.current?.contains(target)) {
        setWhatState((state) => ({ ...state, open: false }));
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [whatOpen]);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-wisteria-900 text-white">
        <Container className="flex items-center justify-between gap-2 py-1.5 text-xs sm:gap-3 sm:text-sm">
          <p className="flex min-w-0 items-center gap-2 font-medium">
            <span
              aria-hidden="true"
              className="hidden shrink-0 tracking-[0.35em] text-orange-100 min-[420px]:inline"
            >
              ••••
            </span>
            <span className="truncate">{site.tagline}</span>
          </p>
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <SocialLinks tone="dark" className="hidden sm:flex" />
            <Link
              href={donateMonthlyCta.href}
              className={cn(
                "whitespace-nowrap rounded-full px-1 font-semibold text-white no-underline hover:underline",
                focusRingOnDark,
              )}
            >
              {donateMonthlyCta.label}
            </Link>
          </div>
        </Container>
      </div>

      <div
        className={cn(
          "relative border-b border-lavender-40 bg-white transition-[box-shadow] duration-200 motion-reduce:transition-none",
          scrolled && "shadow-[0_8px_24px_rgba(59,42,71,0.08)]",
        )}
      >
        <Container
          className={cn(
            "flex items-center gap-3 transition-[padding] duration-200 motion-reduce:transition-none",
            scrolled ? "py-2" : "py-3",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} home`}
            className={cn("shrink-0 rounded-md", focusRing)}
          >
            <Logo
              available={logoReady}
              size={scrolled ? "sm" : "md"}
              preload
              className={
                scrolled
                  ? "max-sm:h-9 max-sm:w-28"
                  : "max-sm:h-10 max-sm:w-32 sm:h-11 sm:w-36 xl:h-12 xl:w-44"
              }
            />
          </Link>

          <nav aria-label="Primary" className="ml-auto hidden min-w-0 lg:block">
            <ul className="flex items-center gap-x-0.5 xl:gap-x-1.5">
              {mainNav.map((item) =>
                item.children && whatWeDo ? (
                  <li
                    key={item.label}
                    ref={whatItemRef}
                    className="static"
                    onMouseEnter={() => {
                      openedByHover.current = true;
                      openWhat();
                    }}
                    onMouseLeave={() => {
                      openedByHover.current = false;
                      const active = document.activeElement;
                      if (
                        active instanceof Node &&
                        whatItemRef.current?.contains(active) &&
                        active !== whatItemRef.current
                      ) {
                        return;
                      }
                      closeWhat();
                    }}
                    onFocus={openWhat}
                    onBlur={(event) => {
                      const next = event.relatedTarget;
                      if (!(next instanceof Node) || !whatItemRef.current?.contains(next)) {
                        closeWhat();
                      }
                    }}
                  >
                    <button
                      ref={whatButtonRef}
                      type="button"
                      aria-expanded={whatOpen}
                      aria-controls="what-we-do-menu"
                      onClick={() => {
                        if (whatOpen && openedByHover.current) return;
                        if (whatOpen) closeWhat();
                        else openWhat();
                      }}
                      className={cn(
                        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-1 py-2 text-[0.7rem] font-semibold text-foreground xl:px-2 xl:text-sm",
                        focusRing,
                        isCurrent(pathname, item.href) && "text-wisteria-700",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn("size-4 transition", whatOpen && "rotate-180")}
                      />
                    </button>
                    {whatOpen ? (
                      <div
                        id="what-we-do-menu"
                        role="region"
                        aria-label="What we do"
                        className="absolute inset-x-0 top-full z-40 px-4 pt-3"
                      >
                        <div className="mx-auto w-full max-w-7xl rounded-3xl border border-lavender-100 bg-white p-5 shadow-[0_18px_50px_rgba(59,42,71,0.12)]">
                          <ul className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
                            {programmeLinks.map(({ child, programme }) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={closeWhat}
                                  className={cn(
                                    "flex h-full gap-3 rounded-2xl p-3 text-foreground no-underline hover:bg-lavender-20",
                                    focusRing,
                                  )}
                                >
                                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-wisteria-20 text-wisteria-700">
                                    <ProgrammeGlyph name={programme.icon} className="size-5" />
                                  </span>
                                  <span className="text-sm font-bold leading-snug text-wisteria-900">
                                    {programme.title}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-lavender-40 pt-4">
                            <Link
                              href={whatWeDo.href}
                              onClick={closeWhat}
                              className={cn("text-sm font-bold no-underline", focusRing)}
                            >
                              All programmes
                            </Link>
                            {extraLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeWhat}
                                className={cn(
                                  "inline-flex items-center gap-2 rounded-full bg-wisteria-20 px-4 py-2 text-sm font-bold text-wisteria-900 no-underline hover:bg-wisteria-40",
                                  focusRing,
                                )}
                              >
                                <Handshake aria-hidden="true" className="size-4" />
                                <span>
                                  {link.label}
                                  <span className="mt-0.5 block text-xs font-medium text-wisteria-700">
                                    {partnership.intro}
                                  </span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                      className={cn(
                        "inline-flex whitespace-nowrap rounded-full px-1 py-2 text-[0.7rem] font-semibold text-foreground no-underline hover:text-wisteria-700 xl:px-2 xl:text-sm",
                        focusRing,
                        isCurrent(pathname, item.href) && "text-wisteria-700 underline decoration-orange-100 decoration-2 underline-offset-4",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-3">
            <Button href={donateCta.href} variant="primary" size="sm" className="px-3 sm:px-4 xl:px-5">
              {donateCta.label}
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              className={cn(
                "grid size-11 place-items-center rounded-full text-wisteria-900 lg:hidden",
                focusRing,
              )}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={toggleMenu}
            >
              <Menu aria-hidden="true" className="size-6" />
            </button>
          </div>
        </Container>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        logoReady={logoReady}
        triggerRef={menuButtonRef}
      />
    </header>
  );
}

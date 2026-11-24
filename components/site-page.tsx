"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { cn } from "@/lib/utils";
import {
  footerNote,
  formatTitle,
  formats,
  gallery,
  headline,
  phoneDisplay,
  phoneTel,
  photos,
  vkUrl,
  type FormatId,
} from "@/lib/site";

/* Container is max-w-6xl (72rem) with px-4 / sm:px-8. The rail bleeds to the
   viewport edge while its first card stays aligned with that container. */
const railPadding =
  "px-[max(1rem,calc((100vw-72rem)/2+1rem))] sm:px-[max(2rem,calc((100vw-72rem)/2+2rem))]";
const railScrollPadding =
  "scroll-px-[max(1rem,calc((100vw-72rem)/2+1rem))] sm:scroll-px-[max(2rem,calc((100vw-72rem)/2+2rem))]";

function CallLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Button
      nativeButton={false}
      className={className}
      render={<a href={`tel:${phoneTel}`} />}
    >
      {children}
    </Button>
  );
}

function VkLink({
  className,
  children,
  variant = "outline",
}: {
  className?: string;
  children: ReactNode;
  variant?: "outline" | "default" | "ghost";
}) {
  return (
    <Button
      nativeButton={false}
      variant={variant}
      className={className}
      render={<a href={vkUrl} target="_blank" rel="noopener noreferrer" />}
    >
      {children}
    </Button>
  );
}

function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("flex items-center gap-3 text-sm text-muted-foreground", className)}>
      <span aria-hidden className="h-px w-7 bg-sand" />
      {children}
    </p>
  );
}

function draftFromSearch(search: string) {
  const params = new URLSearchParams(search);
  const one = (key: string) => params.get(key)?.trim() ?? "";
  const name = one("name");
  const phone = one("phone");
  const date = one("date");
  if (!name || !phone || !date) return null;
  const city = one("city");
  const note = one("note");
  const format = one("format");
  return [
    "Здравствуйте! Хочу обсудить мероприятие.",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Дата: ${date}`,
    `Формат: ${format ? formatTitle(format) : "не выбран"}`,
    city ? `Город: ${city}` : null,
    note ? `Комментарий: ${note}` : null,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");
}

export function SitePage() {
  const [formatId, setFormatId] = useState<FormatId>("svadba");
  const [activeFormat, setActiveFormat] = useState<FormatId>("svadba");
  const [initialDraft, setInitialDraft] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const draft = draftFromSearch(window.location.search);
    if (!draft) return;
    setInitialDraft(draft);
    document.getElementById("napisat")?.scrollIntoView();
  }, []);

  // The photo next to the list follows the format that is closest to the centre of the screen.
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-format]");
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            setActiveFormat(entry.target.dataset.format as FormatId);
          }
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function scrollRail(direction: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.7, behavior: "smooth" });
  }

  const hero = photos.hero;

  return (
    <>
      <a
        href="#formats"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-card focus:px-4 focus:py-2"
      >
        К форматам
      </a>

      <header className="site-header fixed inset-x-0 top-0 z-20 border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <a href="#top" className="font-display text-base leading-none font-medium tracking-[-0.02em]">
            Сергей Емелин
          </a>
          <nav aria-label="Форматы" className="hidden items-center gap-7 lg:flex">
            {formats.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                {item.nav}
              </a>
            ))}
          </nav>
          <a href={`tel:${phoneTel}`} className="text-sm font-medium tabular-nums">
            {phoneDisplay}
          </a>
        </div>
      </header>

      <main id="top">
        <section className="relative lg:grid lg:min-h-svh lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
          <div className="relative h-[62svh] overflow-hidden bg-card lg:hidden">
            <Image
              src={hero.src}
              alt={hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 10%" }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background/70 to-transparent"
            />
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-b from-transparent via-background/75 to-background"
            />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 relative z-10 -mt-32 flex flex-col justify-end px-4 pb-10 duration-700 lg:mt-0 lg:pt-36 lg:pr-12 lg:pb-14 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))]">
            <Eyebrow>Ведущий</Eyebrow>
            <h1 className="font-display mt-5 text-[clamp(3.25rem,15.5vw,5.5rem)] leading-[0.94] font-medium tracking-[-0.04em] lg:text-[clamp(4.5rem,6.6vw,7rem)]">
              Сергей
              <br />
              <em className="text-sand not-italic">Емелин</em>
            </h1>
            <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-pretty text-foreground/80 sm:text-lg">
              {headline}
            </p>
            {/* On phones both actions live in the fixed bottom bar. */}
            <div className="mt-8 hidden flex-wrap items-center gap-x-7 gap-y-4 sm:flex">
              <CallLink className="h-13 px-7 text-base">Позвонить</CallLink>
              <a
                href={vkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-b border-white/25 pb-0.5 text-base font-medium transition-colors hover:border-white/70"
              >
                Написать во ВК
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="animate-in fade-in relative h-svh overflow-hidden rounded-bl-[48px] bg-card duration-1000">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                style={{ objectPosition: hero.position }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/60 to-transparent"
              />
            </div>
          </div>
        </section>

        <section id="kadry" aria-labelledby="look-title" className="pt-24 sm:pt-32">
          <div className="reveal mx-auto flex max-w-6xl flex-col gap-7 px-4 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="look-title"
              className="font-display text-[2.25rem] leading-[1] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl"
            >
              Кадры <em className="text-sand not-italic">с праздников</em>
            </h2>
            <div className="flex flex-col gap-5 lg:max-w-sm">
              <p className="text-base leading-relaxed text-pretty text-foreground/75">
                Несколько кадров с моих праздников: выездные, банкеты и дневные программы.
                Здесь только фото, полные альбомы лежат у меня во ВК.
              </p>
              <div className="flex items-center gap-3">
                <VkLink className="h-11 px-5">Альбомы во ВК</VkLink>
                <div className="ml-auto hidden items-center gap-2 lg:flex">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-lg"
                    className="size-11"
                    aria-label="Предыдущие кадры"
                    onClick={() => scrollRail(-1)}
                  >
                    <ArrowLeft />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon-lg"
                    className="size-11"
                    aria-label="Следующие кадры"
                    onClick={() => scrollRail(1)}
                  >
                    <ArrowRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div
            ref={railRef}
            className={cn(
              "no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 sm:mt-12 sm:gap-4",
              railPadding,
              railScrollPadding,
            )}
          >
            {gallery.map((id) => {
              const photo = photos[id];
              return (
                <div
                  key={id}
                  className={cn(
                    "group relative h-[52svh] max-h-[560px] min-h-[340px] shrink-0 snap-start overflow-hidden rounded-[20px] bg-card",
                    photo.orientation === "landscape" ? "aspect-[3/2]" : "aspect-[3/4]",
                  )}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes={
                      photo.orientation === "landscape"
                        ? "(min-width: 1024px) 60vw, 90vw"
                        : "(min-width: 1024px) 40vw, 70vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ objectPosition: photo.position }}
                  />
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="formats"
          aria-labelledby="formats-title"
          className="scroll-mt-24 pt-24 sm:pt-32"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-8">
            <h2
              id="formats-title"
              className="reveal font-display text-[2.25rem] leading-[1] font-medium tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              Что <em className="text-sand not-italic">веду</em>
            </h2>

            <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
              <div className="sticky top-[4.25rem] z-[1] self-start bg-background pb-4 lg:top-28 lg:bg-transparent lg:pb-0">
                <div className="relative h-[34svh] overflow-hidden rounded-[20px] bg-card lg:h-[min(68svh,36rem)]">
                  {formats.map((item) => {
                    const photo = photos[item.photo];
                    return (
                      <Image
                        key={item.id}
                        src={photo.src}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className={cn(
                          "object-cover transition-opacity duration-700 ease-out",
                          activeFormat === item.id ? "opacity-100" : "opacity-0",
                        )}
                        style={{ objectPosition: photo.position }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Extra bottom space keeps the sticky photo in place while the last format is in view. */}
              <div className="lg:pb-24">
                <ol className="flex flex-col">
                  {formats.map((item) => {
                    const isActive = activeFormat === item.id;
                    return (
                      <li
                        key={item.id}
                        id={item.id}
                        data-format={item.id}
                        onMouseEnter={() => setActiveFormat(item.id)}
                        className="reveal scroll-mt-[calc(34svh+6rem)] py-6 first:pt-0 lg:scroll-mt-32 lg:py-8"
                      >
                        <a
                          href="#napisat"
                          onClick={() => setFormatId(item.id)}
                          className="group grid gap-3 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-baseline md:gap-8"
                        >
                          <h3
                            className={cn(
                              "font-display flex items-start gap-3 text-2xl leading-[1.05] font-medium tracking-[-0.03em] transition-colors duration-500 sm:text-3xl",
                              isActive ? "text-sand" : "text-foreground",
                            )}
                          >
                            <span>{item.title}</span>
                            <ArrowUpRight
                              aria-hidden
                              className="mt-1.5 size-5 shrink-0 text-sand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                          </h3>
                          <p
                            className={cn(
                              "max-w-md text-base leading-relaxed text-pretty transition-colors duration-500",
                              isActive ? "text-foreground/85" : "text-muted-foreground",
                            )}
                          >
                            {item.line}
                          </p>
                        </a>
                      </li>
                    );
                  })}
                </ol>
                <div className="mt-10 lg:mt-12">
                  <Button
                    nativeButton={false}
                    className="h-13 px-7 text-base"
                    render={<a href="#napisat" />}
                  >
                    Проверить дату
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="napisat" className="scroll-mt-20 pt-24 sm:pt-32">
          <div className="reveal mx-auto max-w-6xl px-4 sm:px-8">
            <ContactForm
              formatId={formatId}
              onFormatChange={setFormatId}
              initialDraft={initialDraft}
            />
          </div>
        </section>
      </main>

      <footer
        id="kontakt"
        className="mt-24 rounded-t-[32px] bg-foreground pb-28 text-background sm:mt-32 sm:rounded-t-[48px] sm:pb-0"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-16 pb-10 sm:px-8 sm:pt-24 sm:pb-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <a
              href={`tel:${phoneTel}`}
              className="font-display block text-[clamp(1.5rem,7vw,4.5rem)] leading-none font-normal tracking-[-0.04em] tabular-nums"
            >
              {phoneDisplay}
            </a>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-background/70">
              {footerNote}
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <Button
              nativeButton={false}
              className="h-13 bg-background px-7 text-base text-foreground hover:bg-background/85"
              render={<a href={vkUrl} target="_blank" rel="noopener noreferrer" />}
            >
              Написать во ВК
            </Button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-8 text-xs text-background/60 sm:px-8">
          <span>Сергей Емелин</span>
          <span>Ведущий</span>
        </div>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-20 grid grid-cols-2 gap-1 rounded-full border border-white/10 bg-card/90 p-1 backdrop-blur-md sm:hidden">
        <CallLink className="h-11">Позвонить</CallLink>
        <VkLink variant="ghost" className="h-11">
          ВК
        </VkLink>
      </div>
    </>
  );
}

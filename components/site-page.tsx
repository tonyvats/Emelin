"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import {
  formats,
  headline,
  phoneDisplay,
  phoneTel,
  vkUrl,
  type FormatId,
} from "@/lib/site";

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
  variant?: "outline" | "default";
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

export function SitePage({ initialDraft = null }: { initialDraft?: string | null }) {
  const [formatId, setFormatId] = useState<FormatId>("svadba");

  useEffect(() => {
    if (!initialDraft) return;
    document.getElementById("napisat")?.scrollIntoView();
  }, [initialDraft]);

  return (
    <>
      <a
        href="#formats"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-card focus:px-3 focus:py-2"
      >
        К форматам
      </a>

      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <a href="#top" className="text-sm font-medium tracking-[0.22em] uppercase">
            Емелин
          </a>
          <div className="flex items-center gap-3 sm:gap-5">
            <a href={`tel:${phoneTel}`} className="text-sm tabular-nums">
              {phoneDisplay}
            </a>
            <CallLink className="hidden h-10 px-4 sm:inline-flex">Позвонить</CallLink>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-4 pt-24 pb-8 sm:px-8 sm:pb-12">
          <p className="text-xs tracking-[0.28em] text-muted-foreground uppercase">
            Ведущий
          </p>
          <h1 className="font-display mt-4 text-[3.4rem] leading-[0.88] font-bold tracking-[-0.045em] text-balance sm:text-8xl lg:text-[7.5rem]">
            Сергей
            <br />
            Емелин
          </h1>
          <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-base leading-relaxed text-pretty text-foreground/85 sm:text-lg">
              {headline}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <CallLink className="h-12 px-5 text-base">Позвонить</CallLink>
              <VkLink className="h-12 px-5 text-base">Написать во ВК</VkLink>
            </div>
          </div>
        </section>

        <nav aria-label="Форматы" className="border-y border-white/10">
          <ul className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-5">
            {formats.map((item, index) => (
              <li
                key={item.id}
                className="border-white/10 not-last:border-b sm:border-b-0 sm:not-last:border-r"
              >
                <a
                  href={`#${item.id}`}
                  className="flex h-14 items-center gap-3 px-4 text-sm transition-colors hover:bg-white/5 sm:px-6"
                >
                  <span className="text-xs text-muted-foreground tabular-nums">
                    0{index + 1}
                  </span>
                  {item.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section
          aria-labelledby="look-title"
          className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"
        >
          <h2
            id="look-title"
            className="font-display text-4xl leading-[0.95] font-bold tracking-[-0.04em] text-balance sm:text-6xl"
          >
            Кадры с праздников пока в группе
          </h2>
          <div>
            <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">
              Как это выглядит
            </p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-pretty text-foreground/85">
              Свадебные альбомы уже лежат во ВК. На эту страницу перенесём
              короткую подборку, когда будет ясно, какие кадры можно показать.
              Видео здесь нет.
            </p>
            <VkLink className="mt-6 h-11 px-4">Открыть группу</VkLink>
          </div>
        </section>

        <section
          id="formats"
          aria-labelledby="formats-title"
          className="scroll-mt-20 border-t border-white/10"
        >
          <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-8 sm:pt-20">
            <h2
              id="formats-title"
              className="text-xs tracking-[0.22em] text-muted-foreground uppercase"
            >
              Что веду
            </h2>
          </div>
          <div className="mx-auto mt-6 max-w-6xl border-t border-white/10">
            {formats.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-24 border-b border-white/10 px-4 py-7 sm:px-8 sm:py-9"
              >
                <div className="grid gap-3 md:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1fr)] md:items-baseline md:gap-8">
                  <p className="text-sm text-muted-foreground tabular-nums">0{index + 1}</p>
                  <h3 className="font-display text-3xl leading-none font-bold tracking-[-0.04em] sm:text-5xl">
                    {item.title}
                  </h3>
                  <p className="max-w-md text-base leading-relaxed text-pretty text-foreground/80">
                    {item.line}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
            <Button
              nativeButton={false}
              className="h-12 px-5 text-base"
              render={<a href="#napisat" />}
            >
              Написать дату
            </Button>
          </div>
        </section>

        <section id="napisat" className="scroll-mt-20 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-24">
            <ContactForm
              formatId={formatId}
              onFormatChange={setFormatId}
              initialDraft={initialDraft}
            />
          </div>
        </section>
      </main>

      <footer id="kontakt" className="border-t border-white/10 pb-24 sm:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
          <a
            href={`tel:${phoneTel}`}
            className="font-display text-4xl leading-none font-bold tracking-[-0.04em] sm:text-6xl"
          >
            {phoneDisplay}
          </a>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {headline} Напишите дату и формат. Цену и программу обсудим лично.
            </p>
            <a
              href={vkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm tracking-[0.16em] uppercase underline-offset-4 hover:underline"
            >
              ВКонтакте
            </a>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-background/90 p-3 backdrop-blur-md sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <CallLink className="h-11">Позвонить</CallLink>
          <VkLink className="h-11">ВК</VkLink>
        </div>
      </div>
    </>
  );
}

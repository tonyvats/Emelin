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
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-3 focus:py-2"
      >
        К форматам
      </a>

      <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <a href="#top" className="font-display block text-3xl leading-none">
              Емелин
            </a>
            <a
              href={`tel:${phoneTel}`}
              className="mt-1 block text-sm tracking-tight text-foreground"
            >
              {phoneDisplay}
            </a>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <CallLink className="h-10 px-3 sm:h-11 sm:px-4">Позвонить</CallLink>
            <VkLink className="hidden h-11 bg-card px-4 sm:inline-flex">
              Написать во ВК
            </VkLink>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto max-w-5xl px-4 pt-12 pb-8 sm:px-6 sm:pt-20 sm:pb-12">
          <p className="text-sm tracking-[0.18em] text-muted-foreground uppercase">
            Ведущий
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-6xl leading-[0.88] text-balance sm:text-7xl md:text-8xl">
            Сергей Емелин
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty sm:text-xl">
            {headline}
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row">
            <CallLink className="h-12 px-5 text-base">Позвонить</CallLink>
            <VkLink className="h-12 bg-card px-5 text-base sm:inline-flex">
              Написать во ВК
            </VkLink>
          </div>
        </section>

        <nav aria-label="Форматы" className="mx-auto max-w-5xl px-4 pb-10 sm:px-6">
          <ul className="flex gap-2 overflow-x-auto pb-1">
            {formats.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="inline-flex h-10 items-center rounded-full border border-border bg-card px-4 text-sm hover:bg-secondary"
                >
                  {item.nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section
          aria-labelledby="look-title"
          className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 sm:pb-20"
        >
          <div className="rounded-3xl border border-border bg-card px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-sm tracking-[0.16em] text-muted-foreground uppercase">
              Как это выглядит
            </p>
            <h2
              id="look-title"
              className="font-display mt-3 max-w-2xl text-4xl leading-none text-balance sm:text-5xl"
            >
              Кадры с праздников пока в группе
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-pretty">
              Свадебные альбомы уже лежат во ВК. На эту страницу перенесём
              короткую подборку, когда будет ясно, какие кадры можно показать.
              Видео здесь нет.
            </p>
            <VkLink className="mt-6 h-11 bg-card px-4">Открыть группу</VkLink>
          </div>
        </section>

        <section
          id="formats"
          aria-labelledby="formats-title"
          className="mx-auto max-w-5xl scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-24"
        >
          <h2
            id="formats-title"
            className="font-display text-4xl leading-none sm:text-5xl"
          >
            Что веду
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {formats.map((item, index) => (
              <article
                key={item.id}
                id={item.id}
                className={`scroll-mt-28 rounded-3xl border border-border bg-card p-6 sm:p-7 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <p className="text-sm text-primary">0{index + 1}</p>
                <h3 className="font-display mt-3 text-4xl leading-none sm:text-5xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty">
                  {item.line}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Button
              nativeButton={false}
              className="h-12 px-5 text-base"
              render={<a href="#napisat" />}
            >
              Написать дату
            </Button>
          </div>
        </section>

        <section
          id="napisat"
          className="scroll-mt-24 border-t border-border bg-secondary/50"
        >
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <ContactForm
              formatId={formatId}
              onFormatChange={setFormatId}
              initialDraft={initialDraft}
            />
          </div>
        </section>
      </main>

      <footer id="kontakt" className="border-t border-border pb-24 sm:pb-0">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-12">
          <p className="font-display text-4xl leading-none">Сергей Емелин</p>
          <p className="max-w-xl text-base leading-relaxed">{headline}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href={`tel:${phoneTel}`} className="text-lg">
              {phoneDisplay}
            </a>
            <a
              href={vkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg underline-offset-4 hover:underline"
            >
              ВКонтакте
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Напишите дату и формат. Цену и программу обсудим лично.
          </p>
        </div>
      </footer>

      <div className="sticky bottom-0 z-20 border-t border-border bg-background/95 p-3 backdrop-blur-md sm:hidden">
        <div className="grid grid-cols-2 gap-2">
          <CallLink className="h-11">Позвонить</CallLink>
          <VkLink className="h-11 bg-card">ВК</VkLink>
        </div>
      </div>
    </>
  );
}

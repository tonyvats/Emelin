"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatTitle, formats, phoneTel, vkUrl, type FormatId } from "@/lib/site";

const fieldClass = "h-12 rounded-xl bg-card px-4 text-base md:text-base";

type ContactFormProps = {
  formatId: FormatId;
  onFormatChange: (id: FormatId) => void;
  initialDraft?: string | null;
};

export function ContactForm({
  formatId,
  onFormatChange,
  initialDraft = null,
}: ContactFormProps) {
  const [draft, setDraft] = useState<string | null>(initialDraft);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialDraft) setDraft(initialDraft);
  }, [initialDraft]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const lines = [
      "Сергей, здравствуйте! Хочу обсудить праздник.",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Дата: ${date}`,
      `Формат: ${formatTitle(formatId)}`,
      city ? `Город: ${city}` : null,
      note ? `Комментарий: ${note}` : null,
    ].filter((line): line is string => Boolean(line));
    const text = lines.join("\n");
    setDraft(text);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function copyAgain() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
      <div>
        <p className="flex items-center gap-3 text-sm text-muted-foreground">
          <span aria-hidden className="h-px w-7 bg-sand" />
          Написать мне
        </p>
        <h2 className="font-display mt-4 text-[2.25rem] leading-[1] font-medium tracking-[-0.035em] text-balance sm:text-5xl">
          Начнём <em className="text-sand not-italic">с даты</em>
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-pretty">
          Напишите дату, город и формат. Скажу, свободен ли, и предложу
          созвониться: цену и программу обсудим лично.
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Форма ничего никуда не отправляет. Она соберёт текст заявки:
          скопируйте его мне во ВК или просто позвоните.
        </p>
      </div>

      {draft ? (
        <div className="rounded-[20px] border border-white/10 bg-card p-5 sm:p-6">
          <p className="text-base font-medium">
            {copied
              ? "Текст скопирован. Отправьте его мне во ВК или позвоните."
              : "Заявка собрана. Скопируйте текст и отправьте мне во ВК."}
          </p>
          <pre className="mt-4 rounded-xl bg-background p-4 font-sans text-sm leading-relaxed whitespace-pre-wrap">
            {draft}
          </pre>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button
              nativeButton={false}
              className="h-11 px-4"
              render={<a href={`tel:${phoneTel}`} />}
            >
              Позвонить
            </Button>
            <Button
              nativeButton={false}
              variant="outline"
              className="h-11 bg-card px-4"
              render={
                <a href={vkUrl} target="_blank" rel="noopener noreferrer" />
              }
            >
              Написать во ВК
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 bg-card px-4"
              onClick={copyAgain}
            >
              Скопировать ещё раз
            </Button>
          </div>
          <button
            type="button"
            className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline"
            onClick={() => {
              setDraft(null);
              setCopied(false);
            }}
          >
            Заполнить заново
          </button>
        </div>
      ) : (
        <form className="grid gap-4" method="get" action="/#napisat" onSubmit={onSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                name="name"
                required
                autoComplete="name"
                className={fieldClass}
                placeholder="Как к вам обращаться"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={fieldClass}
                placeholder="+7"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="date">Дата</Label>
              <Input id="date" name="date" type="date" required className={fieldClass} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="format">Формат</Label>
              <select
                id="format"
                name="format"
                required
                value={formatId}
                onChange={(event) => onFormatChange(event.target.value as FormatId)}
                className="h-12 w-full rounded-xl border border-input bg-card px-4 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {formats.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="city">Город</Label>
            <Input
              id="city"
              name="city"
              className={fieldClass}
              placeholder="Сергиев Посад"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note">Пара слов</Label>
            <Textarea
              id="note"
              name="note"
              className="min-h-28 rounded-xl bg-card px-4 py-3 text-base md:text-base"
              placeholder="Сколько гостей, где, что для вас важно"
            />
          </div>
          <Button type="submit" className="mt-2 h-13 justify-self-start px-7 text-base">
            Собрать заявку
          </Button>
        </form>
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatTitle, formats, phoneTel, vkUrl, type FormatId } from "@/lib/site";

const fieldClass = "h-11 bg-card px-3 text-base md:text-base";

type ContactFormProps = {
  formatId: FormatId;
  onFormatChange: (id: FormatId) => void;
};

export function ContactForm({ formatId, onFormatChange }: ContactFormProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const lines = [
      "Здравствуйте! Хочу обсудить мероприятие.",
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
        <p className="text-sm tracking-[0.16em] text-muted-foreground uppercase">
          Написать
        </p>
        <h2 className="font-display mt-3 text-4xl leading-none text-balance sm:text-5xl">
          Дата, формат и телефон
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-pretty">
          Цену и программу обсудим лично. Напишите дату, город и формат.
          Детали за кофе или по телефону.
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Форма ничего не отправляет: почты на странице нет. Текст заявки
          останется здесь, его можно скопировать во ВК или продиктовать по
          телефону.
        </p>
      </div>

      {draft ? (
        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <p className="text-base font-medium">
            {copied
              ? "Текст заявки скопирован."
              : "Заявка собрана. Скопируйте текст вручную."}
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-muted p-4 font-sans text-sm leading-relaxed">
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
              Открыть ВК
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
        <form className="grid gap-4" onSubmit={onSubmit}>
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
                className="h-11 w-full rounded-lg border border-input bg-card px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
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
              className="min-h-24 bg-card px-3 py-2 text-base md:text-base"
              placeholder="Сколько гостей, площадка, что важно"
            />
          </div>
          <Button type="submit" className="h-11 px-5 text-base">
            Собрать текст заявки
          </Button>
        </form>
      )}
    </div>
  );
}

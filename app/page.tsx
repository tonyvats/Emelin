import { SitePage } from "@/components/site-page";
import { formatTitle } from "@/lib/site";

type Search = Record<string, string | string[] | undefined>;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function compose(params: Search) {
  const name = one(params.name).trim();
  const phone = one(params.phone).trim();
  const date = one(params.date).trim();
  if (!name || !phone || !date) return null;
  const city = one(params.city).trim();
  const note = one(params.note).trim();
  const format = one(params.format).trim();
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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  return <SitePage initialDraft={compose(params)} />;
}

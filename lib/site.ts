export const phoneDisplay = "+7 (926) 173-27-12";
export const phoneTel = "+79261732712";
export const vkUrl = "https://vk.ru/sergeyemelinofficial";

export const headline =
  "Свадьбы, корпоративы и свои праздники. Сергиев Посад и Большое Бетонное Кольцо.";

export const formats = [
  {
    id: "svadba",
    nav: "Свадьба",
    title: "Свадьба",
    line: "Банкет и выездная, чтобы гостям было легко, а паре не пришлось вести вечер самим.",
  },
  {
    id: "korporativ",
    nav: "Корпоративы",
    title: "Корпоративы",
    line: "Вечер компании: держит зал и не превращает его в конкурсный конвейер.",
  },
  {
    id: "den-rozhdeniya",
    nav: "Дни рождения",
    title: "Дни рождения и юбилеи",
    line: "Свой праздник, не сценарий «на 50 лет вообще».",
  },
  {
    id: "massovye",
    nav: "Массовые",
    title: "Массовые мероприятия",
    line: "Открытие, презентация, зал больше банкета.",
  },
  {
    id: "kviz",
    nav: "Квизы",
    title: "Квизы",
    line: "Частный квиз: темп, шутка, счёт. Не свадебный банкет с вопросами.",
  },
] as const;

export type FormatId = (typeof formats)[number]["id"];

export function formatTitle(id: string) {
  return formats.find((item) => item.id === id)?.title ?? id;
}

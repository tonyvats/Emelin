export const phoneDisplay = "+7 (926) 173-27-12";
export const phoneTel = "+79261732712";
export const vkUrl = "https://vk.ru/sergeyemelinofficial";

// Copy is written in Sergey's own voice. Only facts from his public page: name, phone, geography.
export const headline =
  "Веду свадьбы, корпоративы и дни рождения. Работаю в Сергиевом Посаде и по всему Большому Бетонному Кольцу.";

export const footerNote =
  "Напишите дату и формат, остальное обсудим лично. Работаю в Сергиевом Посаде и по всему Большому Бетонному Кольцу.";

export const photos = {
  hero: {
    src: "/photos/hero.jpg",
    alt: "Сергей Емелин в бежевом пиджаке на летней террасе",
    orientation: "portrait",
    position: "center 15%",
  },
  ceremony: {
    src: "/photos/ceremony.jpg",
    alt: "Сергей Емелин ведёт выездную регистрацию в лесу: гости вдоль белой дорожки, цветы и белая ткань",
    orientation: "portrait",
    position: "center 30%",
  },
  speech: {
    src: "/photos/speech.jpg",
    alt: "Сергей Емелин в смокинге говорит в микрофон на фоне цветочной стены",
    orientation: "portrait",
    position: "center 20%",
  },
  terrace: {
    src: "/photos/terrace.jpg",
    alt: "Сергей Емелин в бежевом пиджаке с микрофоном на открытой террасе",
    orientation: "landscape",
    position: "center 40%",
  },
  bouquet: {
    src: "/photos/bouquet.jpg",
    alt: "Сергей Емелин в белом костюме держит букет розовых бутонов и микрофон",
    orientation: "portrait",
    position: "center 30%",
  },
  river: {
    src: "/photos/river.jpg",
    alt: "Сергей Емелин с микрофоном на катере на Москве-реке, позади памятник Петру I",
    orientation: "portrait",
    position: "center 30%",
  },
  evening: {
    src: "/photos/evening.jpg",
    alt: "Сергей Емелин в белом костюме на вечернем празднике в зале",
    orientation: "portrait",
    position: "center 30%",
  },
  // Photos below are for the formats list only and do not repeat the rail.
  wedding: {
    src: "/photos/wedding.jpg",
    alt: "Сергей Емелин в белом костюме ведёт церемонию у розового подиума с цветами, на переднем плане гостья",
    orientation: "portrait",
    position: "center 28%",
  },
  corporate: {
    src: "/photos/corporate.jpg",
    alt: "Сергей Емелин с микрофоном на летней площадке под жёлтыми зонтами среди гостей",
    orientation: "landscape",
    position: "54% center",
  },
  toast: {
    src: "/photos/toast.jpg",
    alt: "Сергей Емелин в белом костюме поднимает бокал",
    orientation: "portrait",
    position: "center 30%",
  },
  stage: {
    src: "/photos/stage.jpg",
    alt: "Сергей Емелин с микрофоном на открытой сцене с декорациями и синей машиной",
    orientation: "landscape",
    position: "right center",
  },
  quiz: {
    src: "/photos/quiz.jpg",
    alt: "Сергей Емелин в белом костюме с микрофоном, крупный план",
    orientation: "portrait",
    position: "center 26%",
  },
} as const;

export type PhotoId = keyof typeof photos;

export const gallery: readonly PhotoId[] = [
  "ceremony",
  "speech",
  "terrace",
  "bouquet",
  "river",
  "evening",
];

export const formats = [
  {
    id: "svadba",
    nav: "Свадьба",
    title: "Свадьба",
    line: "Выездная и банкет. Беру вечер на себя, чтобы вы были парой, а не организаторами.",
    photo: "wedding",
  },
  {
    id: "korporativ",
    nav: "Корпоративы",
    title: "Корпоративы",
    line: "Держу зал без конкурсного конвейера и знаю, когда отпустить всех танцевать.",
    photo: "corporate",
  },
  {
    id: "den-rozhdeniya",
    nav: "Дни рождения",
    title: "Дни рождения и юбилеи",
    line: "Программа под именинника, а не шаблонный сценарий юбилея. Кто за столом, узнаю заранее.",
    photo: "toast",
  },
  {
    id: "massovye",
    nav: "Массовые",
    title: "Массовые мероприятия",
    line: "Открытия, презентации, зал больше банкета. Держу темп со сцены до последних рядов.",
    photo: "stage",
  },
  {
    id: "kviz",
    nav: "Квизы",
    title: "Квизы",
    line: "Частный квиз: мои вопросы, темп, шутка, счёт. Игра, а не банкет с вопросами.",
    photo: "quiz",
  },
] as const satisfies readonly {
  id: string;
  nav: string;
  title: string;
  line: string;
  photo: PhotoId;
}[];

export type FormatId = (typeof formats)[number]["id"];

export function formatTitle(id: string) {
  return formats.find((item) => item.id === id)?.title ?? id;
}

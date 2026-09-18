// src/resources/getContent.ts
//
// 로케일에 맞는 콘텐츠 묶음을 돌려줍니다.
// 서버 컴포넌트에서:  const c = getContent(await getLocale());  →  c.about, c.person ...
// 클라이언트에서:     const c = getContent(useLocale());
import { person, about, home, gallery, social, newsletter, blog, work } from "./content";
import { personEn, aboutEn, homeEn, galleryEn } from "./content.en";

export function getContent(locale: string) {
  const isEn = locale === "en";
  return {
    person: isEn ? personEn : person,
    about: isEn ? aboutEn : about,
    home: isEn ? homeEn : home,
    gallery: isEn ? galleryEn : gallery,
    social,
    newsletter,
    blog,
    work,
  };
}

import { baseURL, person } from "@/resources";
import { CONTACT_EMAIL } from "@/resources/contact";

// 검색엔진이 사이트 주인을 인물 정보로 인식하도록 하는 구조화 데이터(JSON-LD)
export default function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    url: baseURL,
    image: `${baseURL}${person.avatar}`,
    email: CONTACT_EMAIL,
    worksFor: { "@type": "Organization", name: "KB Kookmin Bank" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Yeungnam University" },
    sameAs: [
      "https://github.com/BaeDoge",
      "https://www.linkedin.com/in/seung-ho-bae-7392b7282/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" 를 이스케이프해 </script> 삽입을 막습니다.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

import Image from 'next/image'

type Certification = {
  title: string;
  issuer: string;
  url: string;
  image: string;
}

const certifications: Certification[] = [
  {
    title: "AWS Certified Developer - Associate",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/a20ef315-4458-4d29-9639-112695053779/public_url",
    image: "/images/aws-certified-developer-associate.png",
  },
  {
    title: "LangChain Certified",
    issuer: "LangChain",
    url: "https://academy.langchain.com/certificates/pzfratlaov",
    image: "/images/langchain_academy_certificate.png",
  },
]

export default function Certification() {
  return (
    <section id="certifications">
      <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight tracking-tighter px-4 pb-6 sm:pb-8 pt-4 sm:pt-5">
        Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        {certifications.map((c) => (
          <a
            key={c.title}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 rounded-xl bg-[#1a2c20] p-6 border border-transparent hover:border-[#38e07b] transition-all duration-300"
          >
            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col overflow-hidden">
              <Image
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                src={c.image}
                alt={c.title} 
                width={400}
                height={225}
              />
            </div>
            <div>
              <p className="text-white text-xl font-bold leading-normal">{c.title}</p>
              <p className="text-[#96c5a9] text-base font-normal leading-relaxed mt-2">Issued by {c.issuer}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
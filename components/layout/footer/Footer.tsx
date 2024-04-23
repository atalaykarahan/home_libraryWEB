import Link from "next/link";
import Container from "../../Container";
import FooterList from "./FooterList";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram, AiOutlineGithub } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <Link href="/">Anasayfa</Link>
            <Link href="/allbooks">Tüm kitaplar</Link>
            <Link href="/users">Üyeler</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold">Ben kimim</h3>
            <p className="mb-2">
            18 yaşında Java ile ilk Android telefon uygulamamı geliştirdim.
                O zamandan beri full-stack developer olarak çalışıyorum.
                Genellikle CSS ve tasarım gerektiren projelerde yer aldım. Şu
                anda backend developer olma yolunda Node.js&apos;e odaklanıyorum.
                Bununla birlikte, iş hayatımda .NET Web API, Angular, Blazor,
                Jquery, Sybase, Postgresql gibi kavramlarla da ilgilendim, ancak
                odak noktam genellikle back-end oldu.{" "}

              
            </p>
            <p>
              &copy; {new Date().getFullYear()} Karahan Kitaplık. Tüm hakları
              saklıdır.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold">Beni Takip Et</h3>
            <div className="flex gap-2">
              <Link
                href="https://www.linkedin.com/in/atalay-karahan-050985250/"
                target="_blank"
              >
                <FaLinkedin size={24} />
              </Link>
              <Link
                href="https://www.instagram.com/krhnatalay/"
                target="_blank"
              >
                <AiFillInstagram size={24} />
              </Link>
              <Link href="https://github.com/atalaykarahan" target="_blank">
                <AiOutlineGithub size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

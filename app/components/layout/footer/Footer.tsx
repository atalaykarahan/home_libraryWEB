import Link from "next/link";
import Container from "../../Container";
import FooterList from "./FooterList";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram, AiOutlineGithub } from "react-icons/ai";
const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <Link href="/">Anasayfa</Link>
            <Link href="/">Tüm kitaplar</Link>
            <Link href="/">Üyeler</Link>
          </FooterList>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-base font-bold">Ben kimim</h3>
            <p className="mb-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci
              sint non fuga necessitatibus, provident dolor accusamus iusto, vel
              sit, libero consequatur est accusantium velit deserunt dicta
              voluptates temporibus quae cupiditate.
            </p>
            <p>
              &copy; {new Date().getFullYear()} Kitaplık. Tüm hakları saklıdır.
            </p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold">Beni Takip Et</h3>
            <div className="flex gap-2">
              <Link href="#">
                <FaLinkedin size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
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

import Image from "next/image";
import Link from "next/link";
import bannerImg from "../../../../public/images/banner-img.png";
import bgImage from "../../../../public/images/bg.png";
import "./Banner.css";
const Banner = () => {
  return (
    <section
      className="banner-section"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "initial",
        backgroundOrigin: "initial",
        backgroundClip: "initial",
        backgroundColor: "initial",
      }}
    >
      <div className="container 2xl:max-w-5xl xl:max-w-5xl lg:max-w-5xl md:max-w-3xl">
        <div>
          <div>
            <div className="banner-text-area">
              <h2> Atalay Karahan Back-End Developer</h2>
              <p>
                18 yaşında Java ile ilk Android telefon uygulamamı geliştirdim.
                O zamandan beri full-stack developer olarak çalışıyorum.
                Genellikle CSS ve tasarım gerektiren projelerde yer aldım. Şu
                anda backend developer olma yolunda Node.js'e odaklanıyorum.
                Bununla birlikte, iş hayatımda .NET Web API, Angular, Blazor,
                Jquery, Sybase, Postgresql gibi kavramlarla da ilgilendim, ancak
                odak noktam genellikle back-end oldu.{" "}
              </p>
              <ul className="banner-links">
                <li>
                  <Link href="https://github.com/atalaykarahan" target="_blank">
                    <span>Github</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/atalay-karahan-050985250/"
                    target="_blank"
                  >
                    <span>LinkedIn</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="banner-image">
              <Image src={bannerImg} alt="Banner" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

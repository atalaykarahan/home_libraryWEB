import bgImage from "../../../../public/images/bg.png";
import bannerImg from "../../../../public/images/banner-img.png";
import Image from "next/image";
import "./Banner.css";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
const Banner = () => {
  return (
    <div
      className="
      w320:max-w575:pb-[135px] 
      w320:max-w575:mb-0
      w320:max-w575:pt-[100px]
      w576:max-w767:pb-[235px]
      w576:max-w767:mb-[30px]
      w576:max-w767:pt-[100px]
      w768:max-w991:pb-[400px]
      w768:max-w991:mb-[50px]
      w768:max-w991:pt-[130px]
      w992:max-w1199:pb-[400px]
      w992:max-w1199:mb-[55px]
       pt-[230px]
       pb-[550px]
       mb-[110px] 
       relative
       home-banner"
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
      <div
        className="
      w576:max-w-[540px]
      w768:max-w-[720px]
      w992:max-w-[960px]
      w1200:max-w-[1140px]
      w1400:max-w-[1320px] w-full px-3 mx-auto"
      >
        <div className="row justify-center">
          <div
            className=" 
        flex 
        flex-wrap 
        w992:ml-[16.6666666667%]
        w992:flex-[0_0_auto]
        w992:w-[66.6666666667%]
          "
          >
            {/* Text area */}
            <div className="w320:max-w991:pt-[50px] text-center">
              <h2
                className="
              w320:max-w575:text-[28px]
              w320:max-w575:leading-[38px]
              w576:max-w767:text-[40px]
              text-[52px] text-white capitalize font-bold pb-[15px]"
              >
                Atalay Karahan Back-End Developer
              </h2>
              <p className="subtitle">
              Bu internet sitesi, kendimi geliştirmek, yeni teknolojileri öğrenmek ve evimdeki kitapların log bilgilerini tutmak üzere tasarlanmıştır. İçerisinde SMTP, S3 Bucket gibi teknolojileri bulundurmaktadır. Kaynak kodları için GitHub hesabımı ziyaret edebilirsiniz.{" "}
              </p>
              <ul className="flex justify-center">
                <li>
                  <Link href="https://github.com/atalaykarahan">
                    <span>Github</span>
                  </Link>
                </li>
                <li>
                  <a className="special-btn items-center flex"
                    href="https://www.linkedin.com/in/atalay-karahan-050985250/"
                  >
                    <div className="vid-btn flex items-center justify-center">
                      <span className="btn-inner">
                        <FaPlay className="play-icon" />
                      </span>
                    </div>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            {/* image */}
            <div
              className="image">
              <Image src={bannerImg} alt="Banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

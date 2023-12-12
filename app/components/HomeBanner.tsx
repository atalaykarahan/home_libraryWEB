import bgImage from "../../public/images/bg.png";
import bannerImg from "../../public/images/banner-img.png";
import Image from "next/image";
const HomeBanner = () => {
  return (
    // ilk div kutusundaki classlari sor
    <div
      className="md:max-xl:pb-[400px] md:max-xl:mb-[55px] pt-[230px] pb-[550px] mb-[110px] relative"
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
    >
      <div className="min992px:max-w-[960px]">
        <div>
          <div>
            <div>
              <h2>We are a Dynamic SEO & Digital Marketing Agency</h2>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form.There are
                many variations of passages of Lorem Ipsum available,{" "}
              </p>
              <ul>
                <li>
                  <a href="#">
                    <span>get started</span>
                  </a>
                </li>
                <li>
                  <a
                    data-autoplay="true"
                    data-vbtype="video"
                    href="https://www.youtube.com/watch?v=LCmsrVOXzZc"
                  >
                    <div>
                      <span>
                        <i></i>
                      </span>
                    </div>
                    How we work
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Image src={bannerImg} alt="Banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

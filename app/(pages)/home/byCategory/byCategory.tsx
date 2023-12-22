import Image from "next/image";
import holderCategory from "../../../../public/images/placeHolders/byCategory.png";
import "./ByCategory.css"
import Link from "next/link";
const ByCategory = () => {
  return (
    <section className="byCategory pb-20">
      <div className="konteyner">
        <div className="row">

          <div>
            <div className="section-title text-center">
              <h6>our features list</h6>
              <h3>digital marketing solution</h3>
            </div>
          </div>

          <div>
            <div className="grid lg:grid-cols-2">
              <div>
                <div className="single-item flex relative overflow-hidden">
                  <div className="image">
                    <Link href="#">
                      <Image src={holderCategory} alt="book image" />
                    </Link>
                  </div>

                  <div className="text">
                    <Link href="#">
                      <h5>business analytics</h5>
                    </Link>
                    <p>
                      Frameworks to provide robust synopsis for high lev views
                      lterative approaches corporate strategy Frameworks toh
                      provide robust synopsis for high{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="single-item flex relative overflow-hidden">
                  <div className="image">
                    <Link href="#">
                      <Image src={holderCategory} alt="book image" />
                    </Link>
                  </div>
                  <div className="text">
                    <Link href="#">
                      <h5>social media marketing</h5>
                    </Link>
                    <p>
                      Frameworks to provide robust synopsis for high lev views
                      lterative approaches corporate strategy Frameworks toh
                      provide robust synopsis for high{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="single-item flex relative overflow-hidden">
                  <div className="image">
                    <Link href="#">
                      <Image src={holderCategory} alt="book image" />
                    </Link>
                  </div>
                  <div className="text">
                    <Link href="#">
                      <h5>keywords research</h5>
                    </Link>
                    <p>
                      Frameworks to provide robust synopsis for high lev views
                      lterative approaches corporate strategy Frameworks toh
                      provide robust synopsis for high{" "}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="single-item flex relative overflow-hidden">
                  <div className="image">
                    <Link href="#">
                      <Image src={holderCategory} alt="book image" />
                    </Link>
                  </div>
                  <div className="text">
                    <Link href="#">
                      <h5>content making</h5>
                    </Link>
                    <p>
                      Frameworks to provide robust synopsis for high lev views
                      lterative approaches corporate strategy Frameworks toh
                      provide robust synopsis for high{" "}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ByCategory;

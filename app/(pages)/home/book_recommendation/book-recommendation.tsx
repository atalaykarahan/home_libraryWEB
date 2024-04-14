import Image from "next/image";
import holderCategory from "../../../../public/images/placeHolders/byCategory.png";
import "./book-recommendation.css";
import Link from "next/link";
const BookRecommendation = () => {
  return (
    <section className="book-recommendation-section">
      <div className="container 2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl md:max-w-3xl sm:max-w-lg">
        <div className="grid grid-cols1">
          {/* baslik kismi */}
          <div>
            <div className="book-recommendation-title text-center">
              <h6>Ne Okusam?</h6>
              <h3>Rastgele Kitap Önerileri</h3>
            </div>
          </div>

          {/* alt kutucuklar */}
          <div>
            <div className="grid lg:grid-cols-2 gap-7">
              {/* box-1 */}
              <div>
                <div className="book-recommendation_single-item">
                  <div className="single-item_image">
                    <Link href="#">
                      <Image src={holderCategory} alt="book image" />
                    </Link>
                  </div>

                  <div className="single-item_text">
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
              {/* box-2*/}
              <div>
                <div className="book-recommendation_single-item">
                  <div className="single-item_image">
                    <Link href="#">
                      <Image src={holderCategory} alt="book image" />
                    </Link>
                  </div>
                  <div className="single-item_text">
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
              {/* box-3 */}
              <div>
                <div className="book-recommendation_single-item">
                  <div className="single-item_image">
                    <Link href="#">
                      <Image src={holderCategory} alt="book image" />
                    </Link>
                  </div>
                  <div className="single-item_text">
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
              {/* box-4 */}
              <div>
                <div className="book-recommendation_single-item">
                  <div className="single-item_image">
                    <Link href="#">
                      <Image src={holderCategory} alt="book image" />
                    </Link>
                  </div>
                  <div className="single-item_text">
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

export default BookRecommendation;

"use client";
import Image from "next/image";
import holderCategory from "../../../../public/images/placeHolders/byCategory.png";
import "./book-recommendation.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getRandomBookRecommendation } from "@/app/_api/services/bookService";
import Each from "@/components/Each";

interface recommendationBook {
  book_id: number;
  book_title: string;
  book_image?: string;
  book_summary?: string;
}

const BookRecommendation = () => {
  const [books, setBooks] = useState<recommendationBook[]>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getRandomBookRecommendation();

    if (res.status !== 200)
      throw new Error(
        "Home Page Random book recommendation ile ilgili bir hata oluştu"
      );
    setBooks(res.data);
  };
  if (books)
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
                <Each
                  of={books}
                  render={(book: recommendationBook, index) => (
                    <div>
                      <div className="book-recommendation_single-item">
                        <div className="single-item_image">
                          <Link href="#">
                            <Image
                              style={{
                                width: "135px",
                                height: "140px",
                                objectFit: "contain",
                              }}
                              height={140}
                              width={135}
                              src={book.book_image ?? holderCategory}
                              alt="random book image"
                            />
                          </Link>
                        </div>

                        <div className="single-item_text">
                          <Link href="#">
                            <h5>
                              {book.book_title.length > 22
                                ? `${book.book_title.substring(0, 22)}...`
                                : book.book_title}
                            </h5>
                          </Link>
                          {book.book_summary && (
                            <p>
                              {book.book_summary.length > 144
                                ? `${book.book_summary?.substring(0, 144)}...`
                                : book.book_summary}{" "}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default BookRecommendation;

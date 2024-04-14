"use client";
import { getLastInsertedReachableBook } from "@/app/_api/services/bookService";
import Each from "@/components/Each";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VscTriangleRight } from "react-icons/vsc";
import bg from "../../../../public/images/last_book_bg.png";
import lBook from "../../../../public/images/placeHolders/lastBook.png";
import "./LastBook.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Category {
  category_id: number;
  category_name: string;
}
interface Publisher {
  publisher_name: string;
}
interface Author {
  author_name: string;
  author_surname?: string;
}

interface LastBook {
  book_id: number;
  book_title: string;
  book_image?: string;
  book_summary?: string;
  AUTHOR: Author;
  PUBLISHER: Publisher;
  categories: Category[];
}

const LastBook = () => {
  const [book, setBook] = useState<LastBook>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await getLastInsertedReachableBook();
    if (res.status !== 200)
      throw new Error("Home Page Last Book ile ilgili bir hata oluştu");
    setBook(res.data);
  };
  if (book)
    return (
      <section
        className="last-book-section"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="container 2xl:max-w-7xl xl:max-w-6xl lg:max-w-5xl md:max-w-3xl sm:max-w-lg">
          {/* buraya sonradan gap ekleyebilirsin araya boşluk koyuyor */}
          <div className="flex flex-wrap items-center lg:grid grid-cols-2">
            {/* book part */}
            <div className="max-lg:order-2">
              <div className="last-book-section-title">
                <h6>En Son Eklenen</h6>
                <h3>{book.book_title}</h3>
              </div>
              <div className="last-book-content">
                {book.book_summary && <p>{book.book_summary}</p>}
                <ul>
                  <li>
                    <VscTriangleRight />
                    <p>
                      YAZAR: {book.AUTHOR.author_name}{" "}
                      {book.AUTHOR.author_surname}
                    </p>
                  </li>
                  <li>
                    <VscTriangleRight />
                    <p>
                      KATEGORI:{" "}
                      <Each
                        of={book.categories}
                        render={(item, index) => (
                          <>
                            <Badge>{item.category_name}</Badge>{" "}
                          </>
                        )}
                      />
                    </p>
                  </li>
                  <li>
                    <VscTriangleRight />
                    <p>YAYINEVI: {book.PUBLISHER.publisher_name}</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* image part */}
            <div className="max-lg:order-1">
              <div className="max-lg:mb-10">
                <Image
                  style={{
                    width: "100%",
                    maxHeight: "557px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  src={book.book_image ?? lBook}
                  height={557}
                  width={549}
                  alt="Son eklenen kitap"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default LastBook;

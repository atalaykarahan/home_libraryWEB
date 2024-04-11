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
        className="last-book"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "initial",
          backgroundOrigin: "initial",
          backgroundClip: "initial",
          backgroundColor: "initial",
        }}
      >
        <div className="container mx-auto">
          <div className="row items-center grid lg:grid-cols-2 justify-items-center">
            <div className="order-2 lg:order-1">
              <div className="section-title">
                <h6>En Son Eklenen</h6>
                <h3>{book.book_title}</h3>
              </div>
              <div className="content">
                {book.book_summary && <p>{book.book_summary}</p>}
                <ul className="block">
                  <li className="group">
                    <p>
                      <VscTriangleRight className="inline text-black group-hover:text-orange-400" />
                      YAZAR: {book.AUTHOR.author_name}{" "}
                      {book.AUTHOR.author_surname}
                    </p>
                  </li>
                  <li className="group">
                    <p>
                      <VscTriangleRight className="inline text-black group-hover:text-orange-400" />
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
                  <li className="group">
                    <p>
                      <VscTriangleRight className="inline text-black group-hover:text-orange-400" />
                      YAYINEVI: {book.PUBLISHER.publisher_name}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="order-1 lg:order-2"
              style={{ width: "fit-content" }}
            >
              <div className="last-book-image">
                <Image
                  src={book.book_image ?? lBook}
                  alt="Son eklenen kitap"
                  width={549}
                  height={557}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};

export default LastBook;

import Image from "next/image";
import lBook  from "../../../../public/images/placeHolders/lastBook.png";
import "./LastBook.css";
import { VscTriangleRight } from "react-icons/vsc";
const LastBook = () => {
  return (
    <section className="last-book">
      <div className="container mx-auto">
        <div className="row items-center grid lg:grid-cols-2 justify-items-center">
          <div className="order-2 lg:order-1">
            <div className="section-title">
              <h6>En Son Eklenen</h6>
              <h3>Kitabın başlığı</h3>
            </div>
            <div className="content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tem incididun ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitatio u laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
              <ul className="block">
                <li className="group">
                  <p><VscTriangleRight className="inline text-black group-hover:text-orange-400"/>YAZAR: </p>
                </li>
                <li className="group">
                  <p><VscTriangleRight className="inline text-black group-hover:text-orange-400"/>KATEGORI: </p>
                </li>
                <li className="group">
                  <p><VscTriangleRight className="inline text-black group-hover:text-orange-400"/>YAYıNEVI:</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="order-1 lg:order-2" style={{width:"fit-content"}}>
            <div className="last-book-image">
              <Image src={lBook} alt="Son eklenen kitap" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LastBook;

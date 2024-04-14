import Banner from "./banner/banner";
import Brand from "./brand/brand";
import BookRecommendation from "./book_recommendation/book-recommendation";
import LastBook from "./lastBook/lastBook";

const Home = () => {
  return (
    <>
      <Banner />
      <Brand />
      <LastBook />
      <BookRecommendation />
    </>
  );
};

export default Home;

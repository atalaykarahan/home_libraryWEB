import Banner from "./banner/banner";
import HomeBanner from "./banner/banner";
import Brand from "./brand/brand";
import ByCategory from "./byCategory/byCategory";
import LastBook from "./lastBook/lastBook";

const Home = () => {
  return (
    <>
      <Banner />
      <Brand />
      <LastBook />
      <ByCategory />
    </>
  );
};

export default Home;

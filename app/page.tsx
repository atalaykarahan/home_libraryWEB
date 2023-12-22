// import Home from "./pages/home/home";
import Banner from "./pages/home/banner/banner";
import Brand from "./pages/home/brand/brand";
import ByCategory from "./pages/home/byCategory/byCategory";
import LastBook from "./pages/home/lastBook/lastBook";

export default function Home() {
  return (
    <div>
      <Banner/>
      <Brand/>
      <LastBook/>
      <ByCategory/>
    </div>
  );
}

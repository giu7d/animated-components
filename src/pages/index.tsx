import type { NextPage } from "next";
import { NavigationMobile } from "@/components/NavigationMobile";
import { Swiper } from "@/components/Swiper";

const PAGES = [
  {
    id: "#home",
    title: "home",
  },
  {
    id: "#about-us",
    title: "about us",
  },
  {
    id: "#what-we-do",
    title: "what we do",
  },
  {
    id: "#portfolio",
    title: "portfolio",
  },
  {
    id: "#contact",
    title: "contact",
  },
];

const Home: NextPage = () => {
  return (
    <main className="bg-gray-200 h-screen flex flex-col gap-6 items-center justify-center">
      <div className="flex rounded-3xl shadow-xl w-5/6 md:w-1/2 p-6 bg-black text-white">
        <NavigationMobile pages={PAGES} />
      </div>
      <div className="flex rounded-3xl shadow-xl w-5/6 md:w-1/2 p-12 bg-black text-white">
        <Swiper>
          <div className="flex rounded-3xl bg-gradient-to-b from-yellow-200 to-yellow-300 h-96"></div>
          <div className="flex rounded-3xl bg-gradient-to-b from-red-200 to-red-300 h-96"></div>
        </Swiper>
      </div>
    </main>
  );
};

export default Home;

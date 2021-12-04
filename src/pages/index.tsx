import type { NextPage } from "next";
import { NavigationMobile } from "@/components/NavigationMobile";

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
    </main>
  );
};

export default Home;

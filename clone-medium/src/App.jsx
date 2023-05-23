import { useState } from "react";
import "./App.css";
import ListItem from "./components/listItem";

function App() {
  const [itemsList, setitemsList] = useState([
    {
      title: "Why are women encouraged to go into UX?",
      description:
        "Men dominate the tech sector–so why is it that UX has an abundance of women?",
      image:
        "https://miro.medium.com/v2/resize:fill:300:201/0*-Bi2Hm2Ttfw1nEW2.jpg",
    },
    {
      title: "Venture Catastrophists",
      description:
        "In 1907, amidst rising interest rates and a declining stock market, two New York bankers",
      image:
        "https://miro.medium.com/v2/resize:fill:300:201/0*5mPLpKy7Dc2vd981.png",
    },
    {
      title: "It’s Been 20 Years Since We Invaded Iraq. I Am Still in the",
      description:
        "Even though many veterans came home physically from Iraq, we never fully returned",
      image:
        "https://miro.medium.com/v2/resize:fill:300:201/1*cFK-YdT2Zna8ya5i4z3ThQ.jpeg",
    },
  ]);
  return (
    <div className="list">
      {itemsList.map((e) => {
        return <ListItem item={e}></ListItem>;
      })}
    </div>
  );
}

export default App;

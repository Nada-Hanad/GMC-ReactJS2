import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import BlogCard from "./components/blogCard";

function App() {
  const [blogsList, setBlogsList] = useState([]);
  const options = {
    method: "GET",
    url: "https://blogsapi.p.rapidapi.com/",
    params: {
      ordering: "-date_published",
    },
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "84b7611102msh29f188dad3e2aa6p194b7bjsn0382c9775801",
      "X-RapidAPI-Host": "blogsapi.p.rapidapi.com",
    },
  };

  useEffect(() => {
    axios.request(options).then((res) => {
      setBlogsList(res.data.results);
    });
  }, []);
  return (
    <main>
      <div className="blogs-container">
        {blogsList.map((e) => {
          return <BlogCard key={e.id} blog={e} />;
        })}
      </div>
    </main>
  );
}

export default App;

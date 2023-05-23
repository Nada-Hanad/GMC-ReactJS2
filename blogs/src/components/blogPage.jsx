import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogPage() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState({
    title: "",
  });

  const options = {
    method: "GET",
    url: "https://blogsapi.p.rapidapi.com/",
    params: { id: blogId },
    headers: {
      "content-type": "application/octet-stream",
      "X-RapidAPI-Key": "84b7611102msh29f188dad3e2aa6p194b7bjsn0382c9775801",
      "X-RapidAPI-Host": "blogsapi.p.rapidapi.com",
    },
  };
  useEffect(() => {
    axios.request(options).then((res) => {
      setBlog(res.data.results[0]);
    });
  }, []);
  return <div>{blog.title}</div>;
}

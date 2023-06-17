// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import ProductCard from "./productCard";
import { useUserFavoritesContext } from "../context/userFavsContextProvider";
export default function Main() {
  var { favs } = useUserFavoritesContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products.slice(0, 10));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <main>
      <h2>All products</h2>
      {loading ? (
        <CircularProgress />
      ) : error !== "" ? (
        <h1>{error}</h1>
      ) : (
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {products.map((e) => {
            return (
              <SwiperSlide key={e.id}>
                <ProductCard product={e} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      <h2>Favorites</h2>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {favs.map((e) => {
          return (
            <SwiperSlide key={e.id}>
              <ProductCard product={e} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
}

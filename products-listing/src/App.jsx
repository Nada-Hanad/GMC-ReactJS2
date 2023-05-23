import { useEffect, useState } from "react";
import "./App.css";
import Product from "./components/productItem";
import axios from "axios";

function App() {
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    axios.get("https://dummyjson.com/products").then((res) => {
      setProductsList(res.data.products);
    });
  }, []);
  return (
    <main>
      {productsList.map((e) => {
        return (
          <Product
            key={e.id}
            thumbnail={e.thumbnail}
            title={e.title}
            price={e.price}
            id={e.id}
          />
        );
      })}
    </main>
  );
}

export default App;

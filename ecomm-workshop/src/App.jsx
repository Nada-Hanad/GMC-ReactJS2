import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/productCard";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        // product = res.data.products
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="products">
      {loading ? (
        <div>Loading...?</div>
      ) : (
        products.map((e, i) => {
          return <ProductCard key={i} product={e}></ProductCard>;
        })
        // products.map((e, i) =>
        //    <ProductCard key={i} product={e}></ProductCard>;
        // )
      )}
    </div>
  );
}

export default App;

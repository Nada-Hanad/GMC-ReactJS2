function Product({ id, title, price, thumbnail }) {
  return (
    <div key={id} className="product-card">
      <img src={thumbnail} alt="" />
      <div className="product-content">
        <h2>{title}</h2>
        <p>{price}</p>
      </div>
    </div>
  );
}
export default Product;

const ProductCard = ({ product }) => {
  return (
    <div className="tenant-card">
      <div className="tenant-card-header">
        <div className="tenant-initial">{product.name.charAt(0)}</div>
        <div className="tenant-name-email">
          <strong>{product.name}</strong>
          <p>{product.description}</p>
        </div>
      </div>

      <div className="tenant-badges">
        <span className={`status ${product.status.toLowerCase()}`}>
          {product.status}
        </span>
        <span className="plan">{product.category}</span>
      </div>

      <div className="tenant-card-footer">
        <button className="manage-btn">Assign</button>
        <button className="edit-btn">✎</button>
      </div>
    </div>
  );
};

export default ProductCard;

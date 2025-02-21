import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.thumbnail);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (loading) return <p className="text-center text-lg font-bold">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={selectedImage} alt={product.title} className="w-full rounded-lg shadow-md" />
          <div className="flex mt-4 space-x-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Product"
                className={`w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer ${
                  selectedImage === img ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-500">{product.brand}</p>
          <p className="mt-2 text-xl font-bold text-purple-600">${product.price}</p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Discount:</span> {product.discountPercentage}% off
          </p>
          <p className="mt-2">{product.description}</p>
          <p className={`mt-2 px-2 py-1 rounded-md inline-block ${
            product.stock > 5 ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}>
            {product.availabilityStatus}
          </p>

          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
            <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
          </div>

          <button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-transform transform hover:scale-105 duration-300 shadow-md">
            Buy Now
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {product.reviews.map((review, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-yellow-400">{review.rating} ★</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

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

  if (loading)
    return <p className="text-center text-lg font-bold mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
     
      <div className="grid md:grid-cols-2 gap-10">
       
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          <div className="flex overflow-x-auto space-x-2 mt-4 p-2">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Product"
                className={`w-20 h-20 object-cover rounded-lg shadow-md cursor-pointer transition ${
                  selectedImage === img ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

      
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-500 text-lg">{product.brand}</p>

          
          <div className="flex items-center mt-3 space-x-3">
            <p className="text-2xl font-bold text-purple-600">${product.price}</p>
            <span className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
              {product.discountPercentage}% OFF
            </span>
          </div>

          
          <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

          
          <p
            className={`mt-3 px-3 py-1 inline-block rounded-md text-sm font-semibold ${
              product.stock > 5 ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {product.stock > 5 ? "In Stock" : "Low Stock"}
          </p>

          
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-700">Tags:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm">
                {product.category}
              </span>
              <span className="bg-blue-200 text-blue-700 px-3 py-1 rounded-md text-sm">
                {product.brand}
              </span>
              <span className="bg-yellow-200 text-yellow-700 px-3 py-1 rounded-md text-sm">
                {product.rating} ★ Rating
              </span>
            </div>
          </div>

          
          <button className="mt-5 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-transform transform hover:scale-105 duration-300 shadow-lg">
            Buy Now
          </button>
        </div>
      </div>

   
      <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800">Product Details</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          <p><strong>Warranty:</strong> {product.warrantyInformation || "1 Year"}</p>
          <p><strong>Shipping:</strong> {product.shippingInformation || "Free Shipping"}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy || "30 Days Return"}</p>
        </div>
      </div>

    
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition duration-300"
              >
                <p className="font-semibold text-gray-700">{review.reviewerName}</p>
                <p className="text-yellow-400">{review.rating} ★</p>
                <p className="text-gray-600 mt-2">{review.comment}</p>
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSortOrder, setSearchQuery } from "../redux/filterslice";
import SkeletonLoader from "../components/SkeletonLoader"; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { selectedCategory, sortOrder, searchQuery } = useSelector((state) => state.filters);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=0")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
        setCategories([...new Set(data.products.map((p) => p.category))]);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = products.filter((product) => product.category === selectedCategory);
    }

    if (sortOrder === "low-high") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-low") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, sortOrder, products]);

  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(setSearchQuery(query));

    if (query.length > 2) {
      fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => setFilteredProducts(data.products || []));
    } else {
      setFilteredProducts(products);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleRoute = (id) => {
    navigate(`/product-details/${id}`);
  };

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Products</h1>

      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 border rounded-lg w-full sm:w-1/3"
          value={searchQuery}
          onChange={handleSearch}
        />

        <select
          className="p-2 border rounded-lg bg-white w-full sm:w-1/4"
          value={selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg bg-white w-full sm:w-1/4"
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
        >
          <option value="">Sort by Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <SkeletonLoader />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-blue-700 rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-32 w-full object-contain mb-4 rounded-md"
              />
              <h2 className="text-lg font-semibold truncate">{product.title}</h2>
              <p className="text-gray-500 text-sm">{product.brand}</p>
              <p className="text-xl font-bold mt-2">${product.price}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400 text-sm font-bold">{product.rating} ★</span>
                <span
                  className={`ml-2 text-xs px-2 py-1 rounded-full ${product.stock > 5 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                >
                  {product.stock > 5 ? "In Stock" : "Low Stock"}
                </span>
              </div>
              <button
                onClick={() => handleRoute(product.id)}
                className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-transform transform hover:scale-105 duration-300 w-full shadow-md"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length > itemsPerPage && (
        <div className="flex justify-center mt-6 space-x-2 flex-wrap">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>

          <span className="px-3 py-2 md:hidden bg-blue-500 text-white rounded-lg">
            {currentPage}
          </span>

          <div className="hidden md:flex space-x-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    className={`px-3 py-2 rounded-lg ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                (pageNumber === currentPage - 2 && currentPage > 3) ||
                (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return <span key={pageNumber} className="px-3 py-2">...</span>;
              }
              return null;
            })}
          </div>

          <button
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;

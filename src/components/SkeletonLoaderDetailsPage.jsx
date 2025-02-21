
// eslint-disable-next-line react/prop-types
const SkeletonLoader = ({ type }) => {
    const skeletonStyles = {
      title: "w-full h-8 bg-gray-300 rounded-md",
      image: "w-full h-96 bg-gray-300 rounded-md",
      paragraph: "w-full h-6 bg-gray-300 rounded-md mb-4",
      button: "w-full h-12 bg-gray-300 rounded-md",
      smallBox: "w-20 h-6 bg-gray-300 rounded-md",
      gridItem: "w-full h-48 bg-gray-300 rounded-md",
      badge: "w-24 h-6 bg-gray-300 rounded-md",
    };
  
    return (
      <div className={`animate-pulse ${skeletonStyles[type]}`}></div>
    );
  };
  
  export default SkeletonLoader;
  
const Footer = () => {
    return (
      <footer className="bg-black text-white py-4 w-full relative">
        <div className="max-w-7xl mx-auto flex justify-center items-center text-center px-6">
          © {new Date().getFullYear()} E-Commerce. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
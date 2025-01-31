const Header = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10 bg-blue-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-white w-1/4">
          <a href="#">BookIn</a>
        </div>

        <div className="flex justify-center space-x-8 w-2/4">
          {[
            { name: "Home", href: "home.html" },
            { name: "About Us", href: "about.html" },
            { name: "Hotels", href: "#" },
            { name: "Blog", href: "#" },
            { name: "Contact", href: "#" },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="border-b-2 rounded-md border-transparent hover:text-yellow-400 hover:border-yellow-400 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex justify-end w-1/4">
          <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-yellow-400">
            Book Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

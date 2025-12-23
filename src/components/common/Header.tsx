const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-6 text-gray-300 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-wide">
            <a
              href="/"
              className="text-white transition-colors duration-200 hover:opacity-50"
            >
              Polícia Judiciária Civil de Mato Grosso
            </a>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

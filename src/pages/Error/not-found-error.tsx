import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-6 text-xl text-gray-600">Página não encontrada</p>
        <a
          href="/"
          className="rounded-md bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
        >
          Voltar para a Home
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;

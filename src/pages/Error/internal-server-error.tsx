import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";

const InternalServerError = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <Header />
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="mb-4 text-6xl font-bold text-red-600">500</h1>
        <p className="mb-6 text-xl text-gray-600">
          Ocorreu um erro interno no servidor, tente novamente mais tarde.
        </p>
        <a
          href="/"
          className="rounded-md bg-red-500 px-6 py-3 text-white transition hover:bg-red-600"
        >
          Voltar para a Home
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default InternalServerError;

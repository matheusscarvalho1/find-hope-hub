import { useEffect, useState } from "react";
import { useParams } from "react-router";

import Footer from "../../components/common/Footer";
import Header from "../../components/common/Header";
import Loading from "../../components/common/Loading";
import type { PersonDTO } from "../../interface/interface";
import { api } from "../../lib/api";
import { handleError } from "../../lib/utils";
import InternalServerError from "../Error/internal-server-error";
import NotFound from "../Error/not-found-error";
import DetailsCard from "./components/DetailsCard";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<PersonDTO>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPessoaDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get<PersonDTO>(`/pessoas/${id}`);
        setData(response.data);
      } catch (error) {
        const message = handleError(error);
        setError(message);

        console.error("Detalhe técnico do erro:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPessoaDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!data?.id || Number(id) !== data.id) return <NotFound />;
  if (error) return <InternalServerError />;

  return (
    <>
      <Header />
      <DetailsCard data={data} />
      <Footer />
    </>
  );
};

export default Details;

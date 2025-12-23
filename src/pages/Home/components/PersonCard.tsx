import { useNavigate } from "react-router";

import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import type { PersonDTO } from "../../../interface/interface";

interface PersonCardProps {
  pessoa: PersonDTO;
}

const PersonCard = ({ pessoa }: PersonCardProps) => {
  const isLocalizado =
    pessoa.ultimaOcorrencia?.encontradoVivo === true ||
    pessoa.ultimaOcorrencia?.dataLocalizacao !== null;

  const statusBadge = isLocalizado ? "Localizado(a)" : "Desaparecido(a)";

  const navigate = useNavigate();

  const handleDetails = (id: number) => {
    navigate(`/details/${id}`);
  };
  return (
    <div
      key={pessoa.id}
      className="overflow-hidden rounded-xl border border-gray-700 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="flex h-90 w-full items-center justify-center p-6 text-sm">
        {pessoa.urlFoto ? (
          <img
            src={pessoa.urlFoto}
            alt={pessoa.nome}
            className="h-full w-full transform cursor-pointer rounded-xl object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            onClick={() => handleDetails(pessoa.id)}
          />
        ) : (
          <div
            className="text-muted-foreground flex h-80 w-80 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-6 italic"
            onClick={() => handleDetails(pessoa.id)}
          >
            Imagem não fornecida
          </div>
        )}
      </div>
      <div className="space-y-2 p-5">
        <Badge
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            statusBadge === "Desaparecido(a)"
              ? "bg-red-300 text-red-800"
              : "bg-green-300 text-green-800"
          }`}
        >
          {statusBadge}
        </Badge>
        <h2 className="mb-2 truncate text-lg font-bold text-gray-800">
          {pessoa.nome}
        </h2>
        <div className="flex flex-col space-y-1">
          <div className="flex items-center">
            <span className="text-muted-foreground text-sm font-medium">
              Sexo: {pessoa.sexo[0] + pessoa.sexo.slice(1).toLowerCase()}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-muted-foreground text-sm font-medium">
              Idade: {pessoa.idade} anos
            </span>
          </div>
          {pessoa.ultimaOcorrencia?.dtDesaparecimento && (
            <div className="flex items-center">
              <span className="text-muted-foreground text-sm font-medium">
                Desaparecido em:{" "}
                {new Date(
                  pessoa.ultimaOcorrencia.dtDesaparecimento,
                ).toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}
        </div>
        <Button
          variant="default"
          className="mt-4 w-full cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200"
          onClick={() => handleDetails(pessoa.id)}
        >
          Ver Detalhes
        </Button>
      </div>
    </div>
  );
};

export default PersonCard;

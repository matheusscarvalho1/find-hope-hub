import type { PersonDTO } from "../../../interface/interface";
import PersonCard from "./PersonCard";

interface BoardProps {
  data: PersonDTO[];
}

const Board = ({ data }: BoardProps) => {
  return (
    <div className="container mx-auto flex-1 px-4">
      <div className="grid grid-cols-1 gap-6 rounded-xl bg-gray-100 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((pessoa) => (
          <PersonCard key={pessoa.id} pessoa={pessoa} />
        ))}
      </div>
    </div>
  );
};

export default Board;

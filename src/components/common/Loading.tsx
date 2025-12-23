import { Spinner } from "../../components/ui/shadcn-io/spinner";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <div className="flex flex-1 items-center justify-center">
        <Spinner
          variant="circle-filled"
          className="text-blue-500"
          size={40}
          data-testid="spinner"
        />
      </div>
    </div>
  );
};

export default Loading;

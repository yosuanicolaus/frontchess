import { Dispatch, SetStateAction } from "react";
import Loading from "./Loading";

interface Props {
  text?: string;
  setLoading?: Dispatch<SetStateAction<string | null>>;
}

function LoadingPage({ text, setLoading }: Props) {
  return (
    <main className="flex-grow-1 d-flex justify-content-center align-items-center">
      <Loading text={text} setLoading={setLoading} />
    </main>
  );
}

export default LoadingPage;

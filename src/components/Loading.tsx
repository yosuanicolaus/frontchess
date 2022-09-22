import React, { Dispatch, SetStateAction } from "react";
import { useLoadingCursor } from "../lib/hooks/LoadingCursor";

interface Props {
  text?: string;
  setLoading?: Dispatch<SetStateAction<string | null>>;
}

function Loading({ text, setLoading }: Props) {
  useLoadingCursor();

  if (!text) return <span className="spinner-border spinner-border-sm"></span>;

  return (
    <div className="d-flex">
      <span className="spinner-border text-primary"></span>
      <span className="mx-3 my-auto lead">{text}</span>
      {setLoading && (
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => {
            setLoading(null);
          }}
        >
          Cancel
        </button>
      )}
    </div>
  );
}

export default Loading;

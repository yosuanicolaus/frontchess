import React, { useEffect } from "react";

function Loading({ text, setLoading }) {
  const cancel = () => {
    setLoading(false);
  };

  useEffect(() => {
    document.body.style.cursor = "wait";
    return () => {
      document.body.style.cursor = "default";
    };
  }, []);

  if (!text) return <span className="spinner-border spinner-border-sm"></span>;

  return (
    <div className="d-flex">
      <span className="spinner-border text-primary"></span>
      <span className="mx-3 my-auto lead">{text}</span>
      {setLoading && (
        <button className="btn btn-sm btn-outline-dark" onClick={cancel}>
          Cancel
        </button>
      )}
    </div>
  );
}

export default Loading;

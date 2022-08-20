function Loading({ text, setLoading }) {
  const cancel = () => {
    setLoading(false);
  };

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

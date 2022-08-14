function Loading({ text, setLoading }) {
  const cancel = () => {
    setLoading(false);
  };

  return (
    <div>
      <span className="spinner-border text-primary"></span>
      <span className="mx-3">{text}</span>
      <button className="btn btn-sm btn-outline-dark" onClick={cancel}>
        Cancel
      </button>
    </div>
  );
}

export default Loading;

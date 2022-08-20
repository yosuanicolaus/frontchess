import Loading from "./Loading";

function LoadingPage({ text, setLoading }) {
  return (
    <main className="flex-grow-1 d-flex justify-content-center align-items-center">
      <Loading text={text} setLoading={setLoading} />
    </main>
  );
}

export default LoadingPage;

import AppRoom from "./AppRoom";
import AppTable from "./AppTable";

function App() {
  return (
    <main className="container-fluid">
      <div className="p-3 row">
        <div className="col-md-6 shadow mb-3">
          <div className="lead my-2">Lobby</div>
          <AppTable />
        </div>

        <div className="col-md-6 d-flex flex-column gap-3">
          <AppRoom />
        </div>
      </div>
    </main>
  );
}

export default App;

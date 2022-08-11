import AppRoom from "./AppRoom";
import AppTable from "./AppTable";

function App() {
  return (
    <div>
      <div className="display-6 p-3 d-flex shadow text-bg-primary">
        LogiChess
      </div>
      <main className="p-3 row">
        <div className="col-md-6 shadow">
          <div className="lead my-2">Lobby</div>
          <AppTable />
        </div>

        <div className="col-md-6 d-flex flex-column gap-3">
          <AppRoom />
        </div>
      </main>
    </div>
  );
}

export default App;

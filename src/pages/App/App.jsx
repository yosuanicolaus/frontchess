import AppTable from "./AppTable";

function App() {
  return (
    <div>
      <div className="display-6 p-3 d-flex shadow text-bg-primary">
        LogiChess
      </div>
      <main className="p-3 row">
        <div className="col-md-6 shadow">
          <div className="lead">Lobby</div>
          <AppTable />
        </div>

        <div className="col-md-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ipsam
          quaerat veniam placeat perferendis adipisci, voluptatibus laboriosam
          repudiandae maxime suscipit magnam porro amet eaque vero, architecto
          reprehenderit ad modi possimus?
        </div>
      </main>
    </div>
  );
}

export default App;

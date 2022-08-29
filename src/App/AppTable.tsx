function AppTable() {
  const dummyData = [
    {
      name: "johndoe1995",
      elo: 1348,
      timeControl: "10+5",
    },
    {
      name: "BobRoss",
      elo: 1801,
      timeControl: "2+1",
    },
    {
      name: "Jack-5",
      elo: 1500,
      timeControl: "3+0",
    },
    {
      name: "CaroKhanPlease",
      elo: 927,
      timeControl: "10+0",
    },
  ];

  return (
    <table className="table table-hover">
      <thead>
        <tr className="text-bg-secondary">
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">ELO</th>
          <th scope="col">Time Control</th>
        </tr>
      </thead>
      <tbody>
        {/* TODO: replace dummyData with actual lobby data */}
        {/* TODO: make each table row a clickable link */}
        {dummyData &&
          dummyData.map((data, idx) => (
            <tr key={`apptable-${idx}`}>
              <th scope="row">{idx}</th>
              <td>{data.name}</td>
              <td>{data.elo}</td>
              <td>{data.timeControl}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default AppTable;

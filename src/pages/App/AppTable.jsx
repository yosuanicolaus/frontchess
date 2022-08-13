function AppTable() {
  const dummyData = [
    {
      username: "johndoe1995",
      elo: 1348,
      time: "10+5",
    },
    {
      username: "BobRoss",
      elo: 1801,
      time: "2+1",
    },
    {
      username: "Jack-5",
      elo: 1500,
      time: "3+0",
    },
    {
      username: "CaroKhanPlease",
      elo: 927,
      time: "10+0",
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
              <td>{data.username}</td>
              <td>{data.elo}</td>
              <td>{data.time}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default AppTable;

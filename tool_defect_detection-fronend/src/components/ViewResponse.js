import Table from "react-bootstrap/Table";

const ViewResponse = ({ responseData }) => {
  const accepted = (isAccepted) => {
    return isAccepted === true ? "Accepted" : "Not Accepted";
  };

  return (
    <div style={{ marginTop: "-50px", marginBottom: "30px", width: "100%", display: "flex", justifyContent: "center"}}>
      {!!responseData && (
        <div style={{ width: "500px", display: "flex", justifyContent: "center" }}>
          <Table bordered striped hover style={{ alignItems: "center"}}>
            <thead>
              <tr>
                <th>Session ID</th>
                <th>Image ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{responseData.sessionId}</td>
                <td>{responseData.imageId}</td>
                <td>{accepted(JSON.stringify(responseData.accepted))}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
  
};

export default ViewResponse;

import Table from 'react-bootstrap/Table';

const ViewResponse = ({ responseData }) => {
  const accepted = (isAccepted) => {
    return isAccepted == true ? "Accepted" : "Not Accepted";
  };

  return (
    <div>
      {!!responseData && (
        // <table>
        //   <thead>
        //     <tr>
        //       <th>Image ID</th>
        //       <th>Status</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     <tr>
        //       <td>{responseData.imageId}</td>
        //       <td>{JSON.stringify(responseData.accepted)}</td>
        //     </tr>
        //   </tbody>
        // </table>
        <Table bordered striped hover>
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
      )}
    </div>
  );
// };
}

export default ViewResponse;

import Table from 'react-bootstrap/Table';

const ViewResponse = ({ responseData }) => {
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
              <th>Image ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{responseData.imageId}</td>
              <td>{JSON.stringify(responseData.accepted)}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
// };
}

export default ViewResponse;

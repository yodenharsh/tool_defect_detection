const ViewResponse = ({ responseData }) => {
  return (
    <div>
      {!!responseData && (
        <table>
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
        </table>
      )}
    </div>
  );
};

export default ViewResponse;

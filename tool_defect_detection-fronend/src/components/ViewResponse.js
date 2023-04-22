const ViewResponse = ({ responseData }) => {
  const accepted = (isAccepted) => {
    return isAccepted == true ? "Accepted" : "Not Accepted";
  };

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
              <td>{accepted(JSON.stringify(responseData.accepted))}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewResponse;

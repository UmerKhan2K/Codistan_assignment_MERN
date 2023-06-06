import React, { useState, useEffect } from 'react';
function ChildDataPage ({ parentId }) {
    const [childData, setChildData] = useState([]);
  
    useEffect(() => {
      fetch(`http://localhost:3000/api/child-data/${parentId}`)
        .then((response) => response.json())
        .then((data) => {
          setChildData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [parentId]);
  
    return (
      <div>
        <h1>Child Data Page</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Total Amount</th>
              <th>Paid Amount</th>
            </tr>
          </thead>
          <tbody>
            {childData.map((child) => (
              <tr key={child.id}>
                <td>{child.id}</td>
                <td>{child.sender}</td>
                <td>{child.receiver}</td>
                <td>{child.totalAmount}</td>
                <td>{child.paidAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  export default ChildDataPage;
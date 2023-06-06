import React, { useState, useEffect } from 'react';

import ChildDataPage from './ChildDataPage';
function ParentTable() {
  const [parentData, setParentData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [selectedParentId, setSelectedParentId] = useState(null);

  const fetchParentData = () => {
    fetch('http://localhost:3000/api/parent-data')
      .then((response) => response.json())
      .then((data) => {
        setParentData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleTotalPaidAmountClick = (parentId) => {
    fetch(`http://localhost:3000/api/child-data/${parentId}`)
      .then((response) => response.json())
      .then((data) => {
        setChildData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setSelectedParentId(parentId);
  };

  useEffect(() => {
    if (selectedParentId !== null) {
      fetch(`/api/child-data/${selectedParentId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [selectedParentId]);

  return (
    <div>
      <h1>Parent Table</h1>
      <button onClick={fetchParentData}>Fetch Parent Data</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Total Amount</th>
            <th>Total Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {parentData.map((parent) => (
            <tr key={parent.id}>
              <td>{parent.id}</td>
              <td>{parent.sender}</td>
              <td>{parent.receiver}</td>
              <td>{parent.totalAmount}</td>
              <td>
                <button onClick={() => handleTotalPaidAmountClick(parent.id)}>
                  {parent.totalPaidAmount}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {childData.length > 0 && <ChildDataPage parentId={selectedParentId} />}
    </div>
  );
}

export default ParentTable;

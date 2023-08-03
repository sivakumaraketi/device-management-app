// DevicesList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../Table';
import { useNavigate } from 'react-router-dom';
import './DeviceList.css'; 

function DevicesList() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch devices from the backend
    axios.get('http://localhost:5001/api/devices')
      .then(response => setDevices(response.data))
      .catch(error => console.error(error));
  }, []);

  const columns = React.useMemo(
    () => [
      { Header: 'Device Name', accessor: 'deviceName', defaultCanSort: true },
      { Header: 'Device Type', accessor: 'deviceType', defaultCanSort: true },
      { Header: 'Owner Name', accessor: 'ownerName' },
      { Header: 'Battery Status', accessor: 'batteryStatus', defaultCanSort: true, sortType: 'basic' },
    ],
    []
  );

  const handleEdit = (deviceId) => {
    // Implement the edit functionality, e.g., navigate to the edit device page
    console.log(`Editing device with ID: ${deviceId}`);
    navigate(`/edit/${deviceId}`);
  };

  return (
    <div className="table-container">
      <h2>Devices List</h2>
      <Table columns={columns} data={devices} onEdit={handleEdit} />
    </div>
  );
}

export default DevicesList;

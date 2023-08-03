import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEditDevice.css';

const AddEditDevice = () => {
  const { deviceId } = useParams();
  const [deviceName, setDeviceName] = useState('');
  const [deviceType, setDeviceType] = useState('Smartphone');
  const [ownerName, setOwnerName] = useState('');
  const [batteryStatus, setBatteryStatus] = useState(0);
  const [error, setError] = useState('');
  const [currentBatteryStatus, setCurrentBatteryStatus] = useState(batteryStatus);
  const navigate = useNavigate();

  const handleBatteryStatusChange = (e) => {
    const value = e.target.value;
    setBatteryStatus(value);
    setCurrentBatteryStatus(value);
  };

  useEffect(() => {
    // If the component receives a deviceId prop, it means we are in edit mode.
    // Fetch the device data and populate the form fields with the pre-filled data.
    if (deviceId) {
      axios
        .get(`http://localhost:5001/api/devices/${deviceId}`)
        .then((response) => {
          const { data } = response;
          if (data) {
            setDeviceName(data.deviceName);
            setDeviceType(data.deviceType);
            setOwnerName(data.ownerName);
            setBatteryStatus(data.batteryStatus);
          } else {
            setError('Device not found.');
          }
        })
        .catch((error) => {
          console.error('Error fetching device:', error);
          setError('Error fetching device. Please try again.');
        });
    }
  }, [deviceId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const deviceData = {
      deviceName,
      deviceType,
      ownerName,
      batteryStatus: parseInt(batteryStatus),
    };

    if (deviceId) {
      // If deviceId prop is provided, we are in edit mode, so update the device.
      axios
        .put(`http://localhost:5001/api/devices/${deviceId}`, deviceData)
        .then((response) => {
          console.log('Device updated:', response.data);
          // Redirect the user to the devices list page after successful update.
          navigate('/');
        })
        .catch((error) => {
          console.error('Error updating device:', error);
          // Handle the error and display a message to the user if needed
          setError('Error updating device. Please try again.');
        });
    } else {
      // If deviceId prop is not provided, we are in add mode, so add a new device.
      axios
        .post('http://localhost:5001/api/devices', deviceData)
        .then((response) => {
          console.log('New Device added:', response.data);
          // Redirect the user to the devices list page after successful addition.
          navigate('/');
        })
        .catch((error) => {
          console.error('Error adding device:', error);
          // Handle the error and display a message to the user if needed
          setError('Error adding device. Please try again.');
        });
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>{deviceId ? 'Edit Device' : 'Add Device'}</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>Device Name:</label>
          <input type="text" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} />
          <label>Device Type:</label>
          <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)}>
            <option value="Smartphone">Smartphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Camera">Camera</option>
          </select>
          <label>Owner Name:</label>
          <input type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
          <label>Battery Status:</label>
          <input
            type="range"
            min="0"
            max="100"
            value={currentBatteryStatus}
            onChange={handleBatteryStatusChange}
          />
          <span>{currentBatteryStatus}%</span>
          <button type="submit">{deviceId ? 'Update' : 'Add'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddEditDevice;

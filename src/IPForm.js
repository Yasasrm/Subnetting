import React, { useState } from 'react';

function IPForm() {
  // State to store each octet of the IP address and subnet mask
  const [ip, setIp] = useState({ octet1: '', octet2: '', octet3: '', octet4: '' });
  const [subnet, setSubnet] = useState({ octet1: '', octet2: '', octet3: '', octet4: '' });
  const [networkId, setNetworkId] = useState('');
  const [broadcast, setBroadcast] = useState('');

  // Handle input change for IP address
  const handleIpChange = (e) => {
    const { name, value } = e.target;
    setIp((prevIp) => ({
      ...prevIp,
      [name]: value,
    }));
  };

  // Handle input change for subnet mask
  const handleSubnetChange = (e) => {
    const { name, value } = e.target;
    setSubnet((prevSubnet) => ({
      ...prevSubnet,
      [name]: value,
    }));
  };

  // Convert each octet from string to number and return as an array
  const getOctetArray = (address) => {
    return Object.values(address).map(octet => parseInt(octet, 10));
  };

  // Helper function to calculate Network ID
  const calculateNetworkId = (ipArr, subnetArr) => {
    return ipArr.map((octet, i) => octet & subnetArr[i]);
  };

  // Helper function to calculate Broadcast Address
  const calculateBroadcastAddress = (networkIdArr, subnetArr) => {
    return networkIdArr.map((octet, i) => octet | (~subnetArr[i] & 255));
  };

  // Convert the array of octets back to dotted decimal format
  const formatAddress = (octets) => {
    return octets.join('.');
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const ipArr = getOctetArray(ip);
    const subnetArr = getOctetArray(subnet);

    // Calculate Network ID and Broadcast Address
    const networkIdArr = calculateNetworkId(ipArr, subnetArr);
    const broadcastArr = calculateBroadcastAddress(networkIdArr, subnetArr);

    // Update state with the calculated values
    setNetworkId(formatAddress(networkIdArr));
    setBroadcast(formatAddress(broadcastArr));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3>Enter IP Address:</h3>
        <input
          type="number"
          name="octet1"
          value={ip.octet1}
          onChange={handleIpChange}
          placeholder="0"
          min="0"
          max="255"
        />
        .
        <input
          type="number"
          name="octet2"
          value={ip.octet2}
          onChange={handleIpChange}
          placeholder="0"
          min="0"
          max="255"
        />
        .
        <input
          type="number"
          name="octet3"
          value={ip.octet3}
          onChange={handleIpChange}
          placeholder="0"
          min="0"
          max="255"
        />
        .
        <input
          type="number"
          name="octet4"
          value={ip.octet4}
          onChange={handleIpChange}
          placeholder="0"
          min="0"
          max="255"
        />
      </div>

      <div>
        <h3>Enter Subnet Mask:</h3>
        <input
          type="number"
          name="octet1"
          value={subnet.octet1}
          onChange={handleSubnetChange}
          placeholder="255"
          min="0"
          max="255"
        />
        .
        <input
          type="number"
          name="octet2"
          value={subnet.octet2}
          onChange={handleSubnetChange}
          placeholder="255"
          min="0"
          max="255"
        />
        .
        <input
          type="number"
          name="octet3"
          value={subnet.octet3}
          onChange={handleSubnetChange}
          placeholder="255"
          min="0"
          max="255"
        />
        .
        <input
          type="number"
          name="octet4"
          value={subnet.octet4}
          onChange={handleSubnetChange}
          placeholder="0"
          min="0"
          max="255"
        />
      </div>

      <button type="submit">Submit</button>

      {networkId && (
        <div>
          <h3>Calculated Results:</h3>
          <p><strong>Network ID:</strong> {networkId}</p>
          <p><strong>Broadcast Address:</strong> {broadcast}</p>
        </div>
      )}
    </form>
  );
}

export default IPForm;

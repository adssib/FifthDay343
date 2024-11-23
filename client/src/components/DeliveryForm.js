import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/DeliveryForm.css';

const DeliveryForm = () => {
    const [pickupLocation, setPickupLocation] = useState(null);  // { lat, lng }
    const [dropoffLocation, setDropoffLocation] = useState(null); // { lat, lng }
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [weight, setWeight] = useState('');
    const [shippingMethod, setShippingMethod] = useState('Standard');
    const [quote, setQuote] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pickupLocation || !dropoffLocation) {
            alert('Please select both pickup and dropoff locations');
            return;
        }

        const deliveryData = {
            pickupLocation,
            dropoffLocation,
            dimensions,
            weight,
            shippingMethod,
        };

        try {
            const response = await axios.post('http://localhost:5002/api/create-request', deliveryData);
            const { trackingId, quote } = response.data;
            navigate('/quote', { state: { trackingId, quote } });
        } catch (error) {
            alert("There was an error creating your delivery request. Please try again.");
        }
    };

    const redIcon = new L.Icon({
        iconUrl: '/marker.png',
        iconSize: [41, 41],
        iconAnchor: [12, 41],
        popupAnchor: [0, -41]
    });

    // Custom map component for setting locations
    const MapWithClick = ({ setLocation, label }) => {
        useMapEvents({
            click(e) {
                console.log(`${label} clicked, setting location:`, e.latlng);
                setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
            }
        });

        return (
            <>
                {label && <h4>{label}</h4>}
            </>
        );
    };

    const initialLatLng = { lat: 45.4981, lng: -73.5777 }; // coordinates around concordia

    return (
        <div className="forms">
            <h2>Delivery Request Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="map-container">
                    <h3>Pickup Location</h3>
                    <MapContainer center={initialLatLng} zoom={16} style={{ height: "400px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapWithClick setLocation={setPickupLocation} label="Pick Up Location" />
                        {pickupLocation && (
                            <Marker position={pickupLocation} icon={redIcon}>
                                <Popup>Pickup Location</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>

                <div className="map-container">
                    <h3>Dropoff Location</h3>
                    <MapContainer center={initialLatLng} zoom={16} style={{ height: "400px", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapWithClick setLocation={setDropoffLocation} label="Drop Off Location" />
                        {dropoffLocation && (
                            <Marker position={dropoffLocation} icon={redIcon}>
                                <Popup>Dropoff Location</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>

                <div className="form-fields">
                    <input
                        type="number"
                        value={dimensions.length}
                        onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                        placeholder="Length"
                    />
                    <input
                        type="number"
                        value={dimensions.width}
                        onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                        placeholder="Width"
                    />
                    <input
                        type="number"
                        value={dimensions.height}
                        onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                        placeholder="Height"
                    />
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Weight (kg)"
                    />
                    <select
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                    >
                        <option value="standard">Standard</option>
                        <option value="express">Express</option>
                    </select>
                    <button type="submit" className="next-button">Get Quote</button>
                </div>

            </form>
        </div>
    );
};

export default DeliveryForm;

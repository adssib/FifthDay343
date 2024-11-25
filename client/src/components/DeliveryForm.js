import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/DeliveryForm.css';
import AutocompleteInput from './AutocompleteInput';

const redIcon = new L.Icon({
    iconUrl: '/marker.png',
    iconSize: [41, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
});

const initialLatLng = { lat: 45.5017, lng: -73.5673 }; // Montreal, Quebec
const quebecBounds = [
    [44.5, -79.5], // Southwest corner
    [62.0, -57.0], // Northeast corner
];

const getAddressFromCoordinates = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse`;
    try {
        const response = await axios.get(url, {
            params: {
                lat,
                lon: lng,
                format: 'json',
                addressdetails: 1,
                countrycodes: 'ca',
                state: 'Quebec',
            },
            headers: {
                'User-Agent': 'DeliveryApp/1.0 (younes514@yahoo.ca)',
            },
        });
        console.log('API Response:', response.data); // Log the API response
        return response.data.display_name;
    } catch (error) {
        console.error('Error fetching address:', error);
        return null;
    }
};

const MapClickHandler = ({ onClick }) => {
    useMapEvents({
        click(e) {
            onClick(e.latlng);
        },
    });
    return null;
};

const DeliveryForm = () => {
    const [pickupAddress, setPickupAddress] = useState('');
    const [dropoffAddress, setDropoffAddress] = useState('');
    const [pickupLocation, setPickupLocation] = useState(null);
    const [dropoffLocation, setDropoffLocation] = useState(null);
    const [mapCenter, setMapCenter] = useState(initialLatLng);
    const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
    const [weight, setWeight] = useState('');
    const [shippingMethod, setShippingMethod] = useState('Standard');
    const navigate = useNavigate();

    const pickupMapRef = useRef(null);
    const dropoffMapRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pickupAddress || !dropoffAddress) {
            alert('Please enter both pickup and dropoff addresses');
            return;
        }

        const deliveryData = {
            pickupAddress,
            dropoffAddress,
            dimensions,
            weight,
            shippingMethod,
        };
        console.log('Data sent to backend:', deliveryData); // Log the payload

        try {
            const response = await axios.post('http://localhost:5002/api/create-request', deliveryData);
            const { trackingId, quote } = response.data;
            navigate('/quote', { state: { trackingId, quote } });
        } catch (error) {
            console.error('Error creating delivery request:', error);
            alert("There was an error creating your delivery request. Please try again.");
        }
    };

    return (
        <div className="forms">
            <h2>Delivery Request Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Pickup Location */}
                <div className="map-container">
                    <h3>Pickup Location</h3>
                    <AutocompleteInput
                        onSelect={(location) => {
                            setPickupAddress(location.address);
                            setPickupLocation({ lat: location.lat, lng: location.lng });
                            setMapCenter({ lat: location.lat, lng: location.lng });
                            if (pickupMapRef.current) {
                                pickupMapRef.current.setView([location.lat, location.lng], 16);
                            }
                        }}
                    />
                    <MapContainer
                        center={mapCenter}
                        zoom={16}
                        style={{ height: "300px", width: "100%" }}
                        bounds={quebecBounds}
                        ref={pickupMapRef}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        {pickupLocation && (
                            <Marker position={[pickupLocation.lat, pickupLocation.lng]} icon={redIcon}>
                                <Popup>{pickupAddress}</Popup>
                            </Marker>
                        )}
                        <MapClickHandler
                            onClick={(latlng) => {
                                getAddressFromCoordinates(latlng.lat, latlng.lng)
                                    .then(address => {
                                        setPickupAddress(address || 'Selected Location');
                                        setPickupLocation({ lat: latlng.lat, lng: latlng.lng });
                                        setMapCenter({ lat: latlng.lat, lng: latlng.lng });
                                    });
                            }}
                        />
                    </MapContainer>
                </div>

                {/* Dropoff Location */}
                <div className="map-container">
                    <h3>Dropoff Location</h3>
                    <AutocompleteInput
                        onSelect={(location) => {
                            setDropoffAddress(location.address);
                            setDropoffLocation({ lat: location.lat, lng: location.lng });
                            setMapCenter({ lat: location.lat, lng: location.lng });
                            if (dropoffMapRef.current) {
                                dropoffMapRef.current.setView([location.lat, location.lng], 16);
                            }
                        }}
                    />
                    <MapContainer
                        center={mapCenter}
                        zoom={16}
                        style={{ height: "300px", width: "100%" }}
                        bounds={quebecBounds}
                        ref={dropoffMapRef}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap contributors'
                        />
                        {dropoffLocation && (
                            <Marker position={[dropoffLocation.lat, dropoffLocation.lng]} icon={redIcon}>
                                <Popup>{dropoffAddress}</Popup>
                            </Marker>
                        )}
                        <MapClickHandler
                            onClick={(latlng) => {
                                getAddressFromCoordinates(latlng.lat, latlng.lng)
                                    .then(address => {
                                        setDropoffAddress(address || 'Selected Location');
                                        setDropoffLocation({ lat: latlng.lat, lng: latlng.lng });
                                        setMapCenter({ lat: latlng.lat, lng: latlng.lng });
                                    });
                            }}
                        />
                    </MapContainer>
                </div>

                {/* Package Details */}
                <div className="form-fields">
                    <input
                        type="number"
                        value={dimensions.length}
                        onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })}
                        placeholder="Length (cm)"
                        required
                    />
                    <input
                        type="number"
                        value={dimensions.width}
                        onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                        placeholder="Width (cm)"
                        required
                    />
                    <input
                        type="number"
                        value={dimensions.height}
                        onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                        placeholder="Height (cm)"
                        required
                    />
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Weight (kg)"
                        required
                    />
                    <select
                        value={shippingMethod}
                        onChange={(e) => setShippingMethod(e.target.value)}
                    >
                        <option value="Standard">Standard</option>
                        <option value="Express">Express</option>
                    </select>
                    <button type="submit" className="next-button">Get Quote</button>
                </div>
            </form>
        </div>
    );
};

export default DeliveryForm;

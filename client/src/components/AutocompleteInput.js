// src/components/AutocompleteInput.js
// code for managing the auto complete feature when typing an address
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AutocompleteInput.css'; // Ensure this CSS file is created for styling

const AutocompleteInput = ({ label, onSelect }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                        limit: 5,
                    },
                    headers: {
                        'User-Agent': 'DeliveryApp/1.0 (younes514@yahoo.ca)', // Replace with your app's info
                    },
                });
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchSuggestions();
        }, 1100); // Debounce API calls by 1.1s to not exceed the api calls limit

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSelect = (suggestion) => {
        setQuery(suggestion.display_name);
        setSuggestions([]);
        setShowSuggestions(false);
        onSelect({
            address: suggestion.display_name,
            lat: parseFloat(suggestion.lat),
            lng: parseFloat(suggestion.lon),
        });
    };

    return (
        <div className="autocomplete-input">
            <label>{label} Address</label>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to allow click
                placeholder={`Enter ${label} Address`}
            />
            {loading && <div className="loading">Loading...</div>}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li key={suggestion.place_id} onClick={() => handleSelect(suggestion)}>
                            {suggestion.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutocompleteInput;

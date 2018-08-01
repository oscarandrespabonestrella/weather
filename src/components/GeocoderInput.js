import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const styleDropdown = {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: "10px",
    border: "1px solid #ddd",
    color: "#ddd"
}
const styleDropdownActive = {
    ...styleDropdown,
    color:"#fff"
}


class GeocoderInput extends Component {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <PlacesAutocomplete
                {...this.props}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <input
                    {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                    })}
                    />
                    <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                        const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                        ? styleDropdownActive
                        : styleDropdown;
                        return (
                        <div
                            {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                            })}
                        >
                            <span>{suggestion.description}</span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                )}
            </PlacesAutocomplete>
        )
    }
}

export default GeocoderInput;
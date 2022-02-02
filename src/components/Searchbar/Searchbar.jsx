import React, { useState } from "react";
import PropTypes from "prop-types";

function Searchbar ({onSubmit}) {
    const [searchImage, setSearchImage] = useState("");

    const handlChange = (e) => {
        setSearchImage(e.target.value.toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(searchImage);
        e.target.reset();
    };

        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={handleSubmit}>
                    <button type="Submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={handlChange}
                    />
                </form>
            </header>
        );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func,
};

export default Searchbar;

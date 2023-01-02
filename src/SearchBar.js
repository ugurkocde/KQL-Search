import React from "react";

function SearchBar({ onSearch, onFilter }) {
  const [query, setQuery] = React.useState("");
  const [filter, setFilter] = React.useState("");

  // Update the search query when the input field is changed
  const handleChange = (event) => {
    const { value } = event.target;
    const trimmedQuery = value.replace(/\s/g, ""); // remove all spaces from the query
    setQuery(trimmedQuery);
    onSearch(trimmedQuery);
  };

  // Update the filter value when the dropdown menu is changed
  const handleFilter = (event) => {
    const { value } = event.target;
    setFilter(value);
    onFilter(value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          maxWidth: "600px",
          margin: "20px",
        }}
      >
        <input
          type="text"
          onChange={handleChange}
          placeholder=" Search a keyword (e.g. User, Device) ... "
          style={{
            marginLeft: "1%",
            height: "40px",
            width: "100%",
            borderRadius: "5px",
            fontSize: "large",
            textAlign: "center",
            flex: "1 1 auto",
            marginRight: "20px",
          }}
        />
        <select
          value={filter}
          onChange={handleFilter}
          style={{
            textAlign: "center",
            marginRight: "1%",
            height: "40px",
            width: "100%",
            maxWidth: "100px",
            borderRadius: "5px",
            fontSize: "large",
            flex: "0 1 auto",
            cursor: "pointer",
          }}
        >
          <option value="All">All</option>
          <option value="Sentinel">Security</option>
          <option value="Intune">Intune</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;

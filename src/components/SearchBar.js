function SearchBar({ setQuery }) {
  return (
    <input
      type="text"
      placeholder="Search by location..."
      onChange={(e) => setQuery(e.target.value)}
      style={{
        padding: "10px",
        width: "300px",
        marginBottom: "20px"
      }}
    />
  );
}

export default SearchBar;
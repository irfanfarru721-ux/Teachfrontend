export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ padding: 8, margin: "10px 0", width: "100%" }}
    />
  );
}

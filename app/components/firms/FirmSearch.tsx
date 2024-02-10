interface FirmSearchProps {
    search: string;
    setSearch: (value: string) => void;
  }
  
  const FirmSearch: React.FC<FirmSearchProps> = ({ search, setSearch }) => {
    return (
      <input
        type="text"
        className="form-input w-auto"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    );
  };
  
  export default FirmSearch;
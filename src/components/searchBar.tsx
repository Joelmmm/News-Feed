import { Input } from "antd";

const { Search } = Input;

interface SearchBarProps {
  onSearch: (term: string) => void
}

function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div id='search-bar'>
      <Search placeholder='Input search text' onSearch={onSearch} enterButton />
    </div>
  );
}

export default SearchBar;

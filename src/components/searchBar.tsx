import { Input } from "antd";

const { Search } = Input;

interface SearchBarProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  return (
    <div id='search-bar'>
      <Search
        placeholder='Input your term'
        addonBefore='Search articles:'
        onSearch={onSearch}
        enterButton
        loading={isLoading}
      />
    </div>
  );
}

export default SearchBar;

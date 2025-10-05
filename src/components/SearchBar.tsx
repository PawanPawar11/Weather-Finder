import { type ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ChildProps {
  setCityToSearch: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<ChildProps> = ({
  setCityToSearch,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <>
      <h1 className="text-2xl  text-center font-bold text-[#22d3ee]">
        Weather Finder
      </h1>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        className="bg-[#374151] text-white border-none"
        type="text"
        placeholder="Enter your city name..."
      />
      <Button
        onClick={() => setCityToSearch(searchTerm)}
        className="bg-[#09a1c7] text-white text-sm font-bold outline-none border-none hover:bg-[#0890b2df] transition-all duration-500 hover:text-white cursor-pointer"
        type="submit"
        variant="outline"
      >
        Search
      </Button>
    </>
  );
};

export default SearchBar;

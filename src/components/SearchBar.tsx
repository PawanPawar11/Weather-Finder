import { type ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface Props {
  setCityToSearch: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<Props> = ({
  setCityToSearch,
  searchTerm,
  setSearchTerm,
}) => {
  const submit = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    setCityToSearch(searchTerm);
  };
  return (
    <>
      <h1 className="text-2xl  text-center font-bold text-[#22d3ee]">
        Weather Finder
      </h1>
      <Input
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        onKeyDown={(e) => e.key === "Enter" && submit()}
        className="bg-[#374151] text-white border-none"
        type="text"
        placeholder="Enter your city name..."
      />
      <Button
        onClick={submit}
        className="bg-[#09a1c7] text-white text-sm font-bold outline-none border-none hover:bg-[#0890b2df] transition-all duration-500 cursor-pointer"
        type="submit"
        variant="outline"
      >
        <Search className="mr-2 size-4" />
        Search
      </Button>
    </>
  );
};

export default SearchBar;

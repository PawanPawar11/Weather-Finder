import { useState, type ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { setCity } = useAppStore();

  const submit = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    setCity(searchTerm);
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

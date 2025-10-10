import { useState, type ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MapPin, Search } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { setCity, setCoords } = useAppStore();

  const submit = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    setCity(searchTerm);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        alert("Unable to retrieve your location");
      },
      { timeout: 10000 }
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-2xl text-center font-bold text-[#22d3ee]">
        Weather Finder
      </h1>
      <div className="flex gap-2 mt-1">
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
          type="button"
          onClick={submit}
          className="bg-[#09a1c7] text-white text-sm font-bold outline-none border-none hover:bg-[#0890b2df] transition-all duration-200 cursor-pointer flex items-center gap-2"
          variant="outline"
        >
          <Search className="size-4" />
          Search
        </Button>

        <Button
          type="button"
          onClick={useMyLocation}
          className="bg-[#0ea5a4] text-white text-sm font-medium outline-none border-none hover:bg-[#0b8c88] transition-all duration-200 cursor-pointer flex items-center gap-2"
          variant={"ghost"}
        >
          <MapPin className="size-4" /> Use my location
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;

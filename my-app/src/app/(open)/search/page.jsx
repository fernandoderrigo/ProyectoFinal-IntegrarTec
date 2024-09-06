import PartialReproduction from "@/app/components/reproduction/partial-reproduction/PartialReproduction";
import Gender from '@/app/components/music/gender/Gender';
import SearchBar from '@/app/components/search-component/search-bar/SearchBar';

export default function search() {
  return (
    <>
      <SearchBar />
      <Gender />
      <PartialReproduction />
    </>
  );
}

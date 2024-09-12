import PartialReproduction from "@/components/common/reproduction/partial-reproduction/PartialReproduction";
import Gender from '@/components/common/music/gender/Gender';
import SearchBar from '@/components/common/search-component/search-bar/SearchBar';

export default function search() {
  return (
    <>
      <SearchBar />
      <Gender />
      <PartialReproduction />
    </>
  );
}

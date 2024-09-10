import Songs from '@/app/components/music/songs/Song';
import Search from '@/app/components/search-component/search-bar/SearchBar';
import HeaderProfile from '@/app/components/header/HeaderProfile';
import Tags from '@/app/components/search-component/filter/Filter';

export default function search() {
  return (
    <>
      <HeaderProfile />
      <Search />
      <Tags/>
      <Songs />
    </>
  );
}

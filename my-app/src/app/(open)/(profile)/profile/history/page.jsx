import Songs from '@/components/common/music/songs/Song';
import Search from '@/components/common/search-component/search-bar/SearchBar';
import HeaderProfile from '@/components/common/music/header/HeaderProfile';
import Tags from '@/components/common/search-component/filter/Filter';

export default function search() {
  return (
    <>
    <section className='col-span-4'>

      <HeaderProfile />
      <Search />
      <Tags/>
      <Songs />
    </section>
    </>
  );
}

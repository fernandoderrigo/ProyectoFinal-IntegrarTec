import Songs from '@/components/common/music/songs/Song';
import Search from '@/components/common/search-component/search-bar/ExpandSearchBar';
import Tags from '@/components/common/search-component/filter/Filter';

export default function search() {
  return (
    <>
    <section className='col-span-4'>
      <Search />
      <Tags/>
      <Songs />
    </section>
    </>
  );
}

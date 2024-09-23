import SongList from '@/components/common/music/songs/Songs';
import Gender from '@/components/common/music/gender/Gender';
import Playlist from '@/components/common/music/playlist/Playlist';
import Artist from '@/components/common/music/artists/Artists';
export default function RootLayout() {
  return (
    <>
      <div className="flex flex-col h-screen p-4 text-white bg-gray-900">
        {/* Genre buttons */}
        <div className="flex gap-2 mb-4">
          {['Pop', 'Rock', 'Jazz'].map((genre) => (
            <div
              key={genre}
              className="px-4 py-2 bg-gray-800 rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Song list */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center p-3 mb-2 bg-gray-800 rounded-lg animate-pulse"
          >
            <div className="w-10 h-10 mr-3 bg-gray-700 rounded-full" />
            <div className="flex-grow">
              <div className="w-3/4 h-4 mb-2 bg-gray-700 rounded" />
              <div className="w-1/2 h-3 bg-gray-700 rounded" />
            </div>
            <div className="w-6 h-6 bg-gray-700 rounded-full" />
          </div>
        ))}
      </div>
    </>
  );
}

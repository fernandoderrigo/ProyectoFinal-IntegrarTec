import Singers from '@/components/profile/create-song/Singers';
import TagsOfTheSong from '@/components/profile/create-song/TagsOfTheSong';
import DescriptionOfTheSong from '@/components/profile/create-song/DescriptionOfTheSong';
import { IoSend } from 'react-icons/io5';

export default function EditSons(){
    return (
      <>
        <DescriptionOfTheSong />
        <TagsOfTheSong />
        <Singers />
        <button>
          <IoSend />
        </button>
      </>
    );
}

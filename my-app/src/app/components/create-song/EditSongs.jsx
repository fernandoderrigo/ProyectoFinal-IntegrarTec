import Singers from '@/app/components/create-song/Singers';
import TagsOfTheSong from '@/app/components/create-song/TagsOfTheSong';
import DescriptionOfTheSong from '@/app/components/create-song/DescriptionOfTheSong';
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

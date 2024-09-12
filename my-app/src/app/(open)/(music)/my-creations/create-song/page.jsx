import DescriptionOfTheSong from "@/components/profile/create-song/DescriptionOfTheSong";
import PreviewOfTheSong from "@/components/profile/create-song/PreviewOfTheSong";
import Singers from "@/components/profile/create-song/Singers";
import TagsOfTheSong from "@/components/profile/create-song/TagsOfTheSong";
import TransparentHeader from "@/components/header/TransparentHeader";
import EditSons from "@/components/profile/create-song/EditSongs";

export default function MySong(){
    return (
      <>
        <TransparentHeader />
        <TagsOfTheSong />
        <DescriptionOfTheSong />
        <Singers />
        <PreviewOfTheSong />
        <EditSons />
      </>
    );
}

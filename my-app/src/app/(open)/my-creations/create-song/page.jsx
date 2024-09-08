import DescriptionOfTheSong from "@/app/components/create-song/DescriptionOfTheSong";
import PreviewOfTheSong from "@/app/components/create-song/PreviewOfTheSong";
import Singers from "@/app/components/create-song/Singers";
import TagsOfTheSong from "@/app/components/create-song/TagsOfTheSong";
import TransparentHeader from "@/app/components/header/TransparentHeader";
import EditSons from "@/app/components/create-song/EditSongs";

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

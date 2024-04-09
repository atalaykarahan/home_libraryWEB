import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

interface TableBookImageProps {
  bookImage?: string;
}

const TableBookImage: React.FC<TableBookImageProps> = ({ bookImage }) => {
  const defaultImageUrl = process.env.DEFAULT_IMAGE ?? "";

  return (
    <div className="w-[50px]">
      <AspectRatio ratio={7 / 11} className="flex flex-row">
        <Image
          src={bookImage ?? defaultImageUrl}
          width={220}
          height={310}
          alt="Image"
          className="rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  );
};

export default TableBookImage;

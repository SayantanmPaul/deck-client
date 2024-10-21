"use client";

import { IconFile, IconLink } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player/lazy";
import { AspectRatio } from "./ui/aspect-ratio";

interface DynamicMediaProps {
  type: string;
  contentURl: string;
  fileName: string;
}
const DynamicMediaComp = ({
  type,
  contentURl,
  fileName,
}: DynamicMediaProps) => {
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  useEffect(() => {
    if (type.includes("image")) {
      const img = new window.Image();
      img.src = contentURl;
      img.onload = () => {
        setAspectRatio(img.width / img.height);
      };
    }
  }, [contentURl, type]);

  //image render
  if (
    ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"].some(
      (imgType) => type.includes(imgType)
    )
  ) {
    return (
      <div className="w-80 h-full">
        <AspectRatio ratio={aspectRatio}>
          <Image
            src={contentURl}
            alt={fileName}
            fill
            draggable={false}
            className="rounded-lg object-cover h-full w-full"
          />
        </AspectRatio>
      </div>
    );
  }

  //video render
  if (type.includes("video")) {
    return (
      <div className="lg:w-96 w-80 h-full rounded-lg overflow-hidden">
        <AspectRatio ratio={aspectRatio}>
          <ReactPlayer url={contentURl} width="100%" height="100%" controls />
        </AspectRatio>
      </div>
    );
  }

  //audiofile render
  if (type.includes("audio")) {
    return (
      <div className="w-full max-h-4">
        <ReactAudioPlayer src={contentURl} controls />
      </div>
    );
  }

  //document render
  if (
    [
      "image/pdf",
      "image/msword",
      "image/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].some((fileType) => type.includes(fileType))
  ) {
    return (
      <Link href={contentURl} target="_blank">
        <div className="w-full flex items-center gap-2 p-4 bg-neutral-600 shadow-lg rounded-lg group hover:bg-neutral-800 duration-100">
          <IconFile size={20} />
          <p className="text-sm group-hover:text-indigo-400">{fileName}</p>
        </div>
      </Link>
    );
  }
  return (
    <Link href={contentURl} target="_blank">
      <div className="w-full flex items-center gap-2 p-4 bg-neutral-600 shadow-lg rounded-lg group hover:bg-neutral-800 duration-100">
        <IconLink size={20} />
        <p className="text-sm group-hover:text-indigo-400">{fileName}</p>
      </div>
    </Link>
  );
};

export default DynamicMediaComp;

"use client";

import { useSendMessage } from "@/lib/react-queries/queries";
import { ConversationPartnerType } from "@/lib/types";
import {
  IconCirclePlus,
  IconFile,
  IconLoader2,
  IconSend2,
  IconVideo,
  IconX
} from "@tabler/icons-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { SmileIcon } from "lucide-react";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import TextAreaAutoSize from "react-textarea-autosize";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface ConversationInputProps {
  chatParner: ConversationPartnerType;
  conversationId: string;
}

const ConversationInput: FC<ConversationInputProps> = ({
  chatParner,
  conversationId,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [content, setContent] = useState<File | null>(null);
  const [input, setInput] = useState<string>("");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const { mutate: sendMessageMutate, isPending } = useSendMessage();

  const handleSendMessage = () => {
    if (!input.trim()) return;

    sendMessageMutate(
      { conversationId: conversationId, text: input, file: content },
      {
        onSuccess: () => {
          setInput("");
          setContent(null);
          setFilePreview(null);
          setFileType(null);
          setFileName("");
          textareaRef.current?.focus();
        },
        onError: (error) => {
          console.error("Failed to send message:", error);
          toast.error("message not able to sent, please try again later");
        },
      }
    );
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      setContent(file);
      setFileType(file.type);
      setFileName(file.name);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleClearPreview = () => {
    setContent(null);
    setFilePreview(null);
    setFileType(null);
    setFileName("");
  };

  return (
    <div className=" p-4 mb-2 sm:mb-0 flex w-full gap-3 items-end">
      <div className="h-full py-1">
        <input
          type="file"
          id="file-input"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="file-input">
          <IconCirclePlus size={28} className="cursor-pointer" />
        </label>
      </div>
      <div className="flex flex-col w-full">
        {filePreview && (
          <FilePreview
            fileType={fileType}
            previewUrl={filePreview}
            fileName={fileName}
            clearSelectedFile={handleClearPreview}
          />
        )}
        <div className="relative bg-neutral-700 rounded-3xl shadow-sm ring-1 ring-inset ring-neutral-500 w-full flex items-center px-2 pl-4 lg:max-w-full md:max-w-full max-w-72">
          <TextAreaAutoSize
            ref={textareaRef}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            rows={1}
            maxRows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`start conversation with ${
              chatParner ? chatParner.firstName : "user"
            }...`}
            className="block w-full flex-1 resize-none border-none bg-transparent text-neutral-50 placeholder:text-neutral-400 text-sm py-2 sm:leading-6 font-medium outline-none no-scrollbar"
          />
        </div>
      </div>
      <span className="flex items-center gap-3">
        <EmojiComponent onEmojiSelect={handleEmojiSelect} />
        <div className="flex-shrin-0">
          <Button
            disabled={!input.trim()}
            className="w-min rounded-full"
            onClick={handleSendMessage}
            type="submit"
          >
            {isPending ? (
              <IconLoader2 className="w-5 h-5 animate-spin" />
            ) : (
              <IconSend2 className="w-5 h-5" />
            )}
          </Button>
        </div>
      </span>
    </div>
  );
};

export default ConversationInput;

const FilePreview = ({
  previewUrl,
  fileType,
  clearSelectedFile,
  fileName,
}: {
  previewUrl: string;
  fileType: string | null;
  fileName: string;
  clearSelectedFile: () => void;
}) => {
  console.log(fileName);
  return (
    <div className="lg:absolute relative flex items-center mb-2 w-fit lg:bottom-[72px] p-2 bg-neutral-800  rounded-t-xl border-t border-x border-neutral-500">
      <div className="relative rounded overflow-hidden">
        {fileType?.includes("image") ? (
          <Image
            src={previewUrl}
            alt="filePreview"
            width={120}
            height={120}
            className="w-full h-52 object-fill"
          />
        ) : fileType?.includes("video") ? (
          <div className="w-full flex items-center gap-2 p-3 pr-10 bg-neutral-600 shadow-lg rounded-lg group">
            <IconVideo size={20} />
            <a className="text-sm group-hover:text-indigo-400">{fileName}</a>
          </div>
        ) : fileType?.includes("audio") ? (
          <div className="w-full">
            <ReactAudioPlayer src={previewUrl} controls />
          </div>
        ) : fileType?.includes("application") ? (
          <div className="w-full flex items-center gap-2 p-2 pr-10 bg-neutral-600 shadow-lg rounded-lg group ">
            <IconFile size={20} />
            <p className="text-sm group-hover:text-indigo-400">{fileName}</p>
          </div>
        ) : null}
        <button
          onClick={clearSelectedFile}
          className="absolute top-1 right-1 p-1 bg-black/60 rounded-full"
        >
          <IconX size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
};

interface EmojiComponentProps {
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiComponent: FC<EmojiComponentProps> = ({ onEmojiSelect }) => {
  const [show, setShow] = useState(false);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pickerRef]);

  return (
    <span className="">
      <SmileIcon
        size={24}
        className="cursor-pointer"
        onClick={() => setShow(!show)}
      />
      {show && (
        <div ref={pickerRef} className="absolute bottom-24 right-8 z-10">
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={(emojiObject: EmojiClickData) => {
              onEmojiSelect(emojiObject.emoji);
            }}
          />
        </div>
      )}
    </span>
  );
};

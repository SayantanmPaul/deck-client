"use client";

import { ConversationPartnerType } from "@/lib/types";
import { FC, useEffect, useRef, useState } from "react";
import TextAreaAutoSize from "react-textarea-autosize";
import { Button } from "./ui/button";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { SmileIcon } from "lucide-react";
import { IconLoader2, IconSend2 } from "@tabler/icons-react";
import { useSendMessage } from "@/lib/react-queries/queries";
import { toast } from "sonner";

interface ConversationInputProps {
  chatParner: ConversationPartnerType;
  conversationId: string;
}

const ConversationInput: FC<ConversationInputProps> = ({
  chatParner,
  conversationId,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [input, setInput] = useState<string>("");

  const { mutate: sendMessageMutate, isPending } = useSendMessage();

  const handleSendMessage = () => {
    if (!input.trim()) return;

    sendMessageMutate(
      { conversationId: conversationId, text: input },
      {
        onSuccess: () => {
          setInput(""); 
          textareaRef.current?.focus();
        },
        onError: (error) => {
          console.error("Failed to send message:", error);
          toast.error("something went wrong, please try again lated");
        },
      }
    );
  };

  const handleEmojiSelect = (emoji: string) => {
    setInput((prev) => prev + emoji);
  };

  return (
    <div className=" p-4 mb-2 sm:mb-0 flex w-full gap-3 items-end ">
      <div className="relative bg-neutral-700 overflow-hidden rounded-3xl shadow-sm ring-1 ring-inset ring-neutral-500 w-full flex items-center px-2 pl-4">
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
          placeholder={`start conversation with ${chatParner?.firstName}...`}
          className="block w-full flex-1 resize-none border-none bg-transparent text-neutral-50 placeholder:text-neutral-400 py-1.5 sm:text-sm sm:leading-6 font-medium outline-none no-scrollbar"
        />
      </div>
      <span className="flex items-center gap-3">
        <EmojiComponent onEmojiSelect={handleEmojiSelect} />
        <div className="flex-shrin-0">
          <Button
            disabled={!input.trim()}
            className="w-min rounded-full "
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

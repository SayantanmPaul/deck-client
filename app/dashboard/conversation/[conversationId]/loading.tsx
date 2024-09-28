import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col flex-1 h-full max-h-[calc(100vh)] justify-between">
      {/* Header */}
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-neutral-800 px-3">
        <div className="relative flex items-center space-x-4">
          <Skeleton className="w-10 h-10 rounded-full bg-neutral-800" />
          <div className="flex flex-col leading-tight select-none">
            <Skeleton className="h-5 w-36 bg-neutral-800" />
            <Skeleton className="h-4 w-24 bg-neutral-800 mt-2" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        id="messages"
        className="flex h-full flex-1 flex-col-reverse gap-2 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-w-2  scrollbar-track-blue-lighter scrolling-touch"
      >
        {[...Array(15)].map((_, index) => {
          const isRightAligned = index % 2 === 0;
          return (
            <div key={index} className="chat-message">
              <div
                className={`flex items-end gap-2 ${
                  isRightAligned ? "justify-end" : "justify-start"
                }`}
              >
                {!isRightAligned && (
                  <Skeleton className="w-8 h-8 rounded-full bg-neutral-800" />
                )}
                <div
                  className={`flex flex-col space-y-2 text-base max-w-96 mx-1 ${
                    isRightAligned ? "items-end" : "items-start"
                  }`}
                >
                  <Skeleton className="px-3 py-2 h-10 rounded-2xl w-48 bg-neutral-800" />
                </div>
                {isRightAligned && (
                  <Skeleton className="w-8 h-8 rounded-full bg-neutral-700" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message input */}
      <div className="bg-neutral-800 border-t border-neutral-700">
        <div className="p-4 mb-2 sm:mb-0 flex w-full gap-3 items-center">
          <Skeleton className="w-full h-9 bg-neutral-700 rounded-3xl" />
          <span className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 bg-neutral-700 rounded-full" />
            <Skeleton className="w-12 h-8 bg-neutral-700 rounded-full" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default loading;

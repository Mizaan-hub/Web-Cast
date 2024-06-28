"use client";

import React, { useState } from "react";
import { useGetCalls } from "@/hooks/useGetCalls";
import { useRouter } from "next/navigation";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import MeetingCard from "./MeetingCard";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-col-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg" // "/public/icons/previous.svg"
                : type === "upcoming"
                  ? "/icons/upcoming.svg" // "/public/icons/upcoming.svg"
                  : "/icons/recordings.svg" // "/public/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as CallRecording).filename?.substring(0, 20) ||
              "No Description"
            }
            date={
              (meeting as Call).state?.startedAt?.toLocaleString() ||
              (meeting as CallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            handleClick={
              type === "recordings"
                ? () => router.push(`${(meeting as CallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            buttonIcon1={
              type === "recordings" ? "/icons/play.svg" : undefined // "/public/icons/play.svg" "/public/icons/download.svg"
            }
            buttonText={type === "recordings" ? "Play" : "Start"}
            link={
              type === "recordings"
                ? (meeting as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call).id}`
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;

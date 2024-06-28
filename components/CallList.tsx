import React from "react";
import Upcoming from '../app/(root)/(home)/upcoming/page';
import { useGetCalls } from "@/hooks/useGetCalls";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {

  const {endedCalls, upcomingCalls, recordings, isLoading} = useGetCalls()

  return <div>CallList</div>;
};

export default CallList;

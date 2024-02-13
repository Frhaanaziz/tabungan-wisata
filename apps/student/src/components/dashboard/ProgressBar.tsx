"use client";
import { ProgressBar as ProgressBarApi, ProgressBarProps } from "@tremor/react";

const ProgressBar = (props: ProgressBarProps) => {
  return <ProgressBarApi {...props} />;
};

export default ProgressBar;

import React from "react";
import { useParams } from "react-router-dom";

export interface TaskDetailProps {}

export const TaskDetail: React.FC<TaskDetailProps> = () => {
  const params = useParams();

  console.log(params);

  // GET BY ID WITH PARAMS (check console log)

  return <>Hello World</>;
};

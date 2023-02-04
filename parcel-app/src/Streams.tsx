import React, { FC, useEffect } from "react";
import { useBase } from "./Base";

const Streams: FC = () => {
  const { setTitle, setShowBack } = useBase();
  useEffect(() => {
    setShowBack(false);
    return () => {
      setShowBack(true);
    };
  }, [setShowBack]);
  useEffect(() => {
    setTitle("My Streams");
  }, [setTitle]);
  return <div>Streams</div>;
};
export default Streams;

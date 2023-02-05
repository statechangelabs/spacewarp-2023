import React, { FC, Fragment, useEffect, useMemo } from "react";
import { useFormikContext } from "formik";
import { ethers } from "ethers";
const ABIParser: FC<{ abi: string }> = ({ abi }) => {
  const { setFieldValue, values } = useFormikContext();
  const events = useMemo(() => {
    try {
      console.log("staritng memo");
      let abiObj = JSON.parse(abi.trim());
      if (abiObj.abi) {
        abiObj = abiObj.abi;
      }
      if (!Array.isArray(abiObj)) {
        console.log("This is not an array", abiObj);
        return [];
      }
      console.log("abi obj is", abiObj);
      const events = abiObj
        .filter((x: any) => x.type === "event")
        .map((item) => {
          const { name, inputs } = item;
          const signature = name + "(" + inputs.map((input: any) => input.type).join(",") + ")";
          console.log("I hve a signature", signature);
          const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(signature));
          console.log("I have a hash", hash);
          return { signature, hash };
        });
      return events;
    } catch (e) {
      console.log("Error was", e);
      return [];
    }
  }, [abi]);
  if (!events || !events.length) {
    return null;
  }
  return (
    <Fragment>
      <h3 className="col-span-6 text-sm font-medium">
        Event Topics found in ABI - click to add topic filter
      </h3>
      <ul className="w-full col-span-6">
        {events.map((event) =>
          (values.topics || []).indexOf(event.hash) === -1 ? (
            <li
              key={event.hash}
              onClick={() => {
                setFieldValue("topics", [...(values.topics || []), event.hash]);
              }}
              className="m-4 bg-gray-500 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded w-full"
            >
              Add {event.signature}
            </li>
          ) : (
            <li
              key={event.hash}
              className="m-4 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full"
              onClick={() => {
                setFieldValue("topics", [...values.topics.filter((t) => t != event.hash)]);
              }}
            >
              Remove {event.signature}
            </li>
          )
        )}
      </ul>
    </Fragment>
  );
};
export default ABIParser;

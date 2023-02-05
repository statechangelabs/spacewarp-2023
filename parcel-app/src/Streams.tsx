import React, { FC, Fragment, useEffect } from "react";
import { useBase } from "./Base";
import { useListeners } from "./useListeners";
import {
  LinkIcon,
  HashtagIcon,
  GlobeAmericasIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import copy from "clipboard-copy";
import { useAlert } from "./Alert";
const Streams: FC = () => {
  const { setTitle, setShowBack } = useBase();
  useEffect(() => {
    setShowBack(false);
    return () => {
      setShowBack(true);
    };
  }, [setShowBack]);
  useEffect(() => {
    setTitle("My FileStreams");
  }, [setTitle]);
  const { confirm } = useAlert();
  const { listeners, refresh, loading, error, remove } = useListeners();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!listeners) return <div>No Listeners!</div>;
  return (
    <Fragment>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {!listeners.length && (
            <Link
              type="button"
              to="/new"
              className="group  transition-all duration-250 hover:bg-blue-400 relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <LinkIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-100" />

              <span className="mt-2 block text-sm font-medium text-gray-900">
                Create a new Filestream Listener
              </span>
            </Link>
          )}

          {listeners.map((listener) => (
            <li key={listener.id}>
              <div className="flex items-center">
                <div className="flex min-w-0 flex-1 items-center  px-4 py-4 sm:px-6">
                  <div className="flex-shrink-0"></div>
                  <div className="min-w-0 flex-1 px-4 ">
                    <div>
                      <h2 className="text-medium font-bold text-gray-800 my-2">
                        {listener.name || "No label"}{" "}
                      </h2>
                      <p className="truncate flex text-sm font-medium text-gray-600  group">
                        {/* <HashtagIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          /> */}
                        <span className="truncate">{listener.eth_addresses.join(", ")}</span>
                      </p>
                      <p
                        className="mt-2 flex items-center text-sm text-gray-500 cursor-pointer group"
                        onClick={() => {
                          copy(listener.url);
                          toast.success("Copied URL to clipboard");
                        }}
                      >
                        <GlobeAmericasIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 "
                          aria-hidden="true"
                        />
                        <span className="truncate">{listener.url}</span>
                        <DocumentDuplicateIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-800"
                          aria-hidden="true"
                        />
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/streams/${listener.id}`}
                  className="mx-4 p-2 hover:text-black text-gray-400 flex"

                  // className="block hover:bg-blue-800 h-20 w-20 p-8 animated hover:fadeIn  text-gray-400 group-hover hover:text-white"
                >
                  <PencilIcon className="h-5 w-5" />
                  <span className="hidden md:inline ml-2">Edit</span>

                  {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
                </Link>
                <button
                  onClick={async () => {
                    if (
                      await confirm({
                        title: "Are you sure you want to delete this listener?",
                        message: "This action will remove event history and cannot be undone",
                      })
                    ) {
                      await remove(listener.id);
                      toast("Listener deleted", { type: "success" });
                      await refresh();
                    }
                  }}
                  className="mx-4 p-2 hover:text-black text-red-400 flex"

                  // className="block hover:bg-blue-800 h-20 w-20 p-8 animated hover:fadeIn  text-gray-400 group-hover hover:text-white"
                >
                  <TrashIcon className="h-5 w-5" />
                  {/* <span className="hidden md:inline ml-2">Edit</span> */}

                  {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {!!listeners.length && (
        <Link
          type="button"
          to="/new"
          className="group  transition-all duration-250 hover:bg-blue-400 relative block  m-6 p-6 rounded-md  text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <LinkIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-100 inline-block" />

          <span className="mt-2 block text-sm font-medium text-gray-900">
            Create a new Filestream Listener
          </span>
        </Link>
      )}
    </Fragment>
  );
};
export default Streams;

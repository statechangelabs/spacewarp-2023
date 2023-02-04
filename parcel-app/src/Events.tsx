import React, { FC, useEffect } from "react";
import { useBase } from "./Base";
import { TrashIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAlert } from "./Alert";
import { useEvents } from "./useListeners";
import copy from "clipboard-copy";
import { DateTime } from "luxon";
const Events: FC = () => {
  const { alert } = useAlert();
  const { setTitle } = useBase();
  useEffect(() => {
    setTitle("My Sent Events");
  }, [setTitle]);
  const { data, error, loading, refresh, remove } = useEvents();
  useEffect(() => {
    const interval = setInterval(() => {
      refresh();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [refresh]);
  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No Requests!</div>;
  console.log("Data is", data);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="mt-2 text-medium text-gray-700">
            Recent requests made via your{" "}
            <Link className="text-blue-600 hover:text-blue-800" to="/oracles">
              oracles.
            </Link>
          </p>
        </div>
        {/* <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div> */}
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-2"
                    ></th>
                    <th
                      scope="col"
                      className="py-3.5 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-2"
                    >
                      Stream
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Message ID
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      To Url
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Sent on
                    </th>
                    {/* <th scope="col" className="relative w-10">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data.map((event, personIdx) => (
                    <tr key={event.id} className={personIdx % 2 === 0 ? undefined : "bg-gray-100"}>
                      <td className="whitespace-nowrap py-4 text-sm font-medium text-gray-900 sm:pl-2">
                        <button
                          onClick={() => {
                            alert({
                              title: "Remove this request?",
                              message:
                                "This just removes the log. The actual transaction remains on-chain. This action cannot be undone",
                            }).then(() => {
                              remove(event.id);
                              toast.success("Removed request log");
                            });
                          }}
                          className="text-red-400 hover:text-red-800 inline mr-2 h-4 w-4"
                          title="Remove Request"
                        >
                          <TrashIcon className="" aria-hidden="true" />
                        </button>
                      </td>{" "}
                      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 sm:pl-2">
                        <Link to={`/streams/${event.listeners_id}`} className="hover:text-gray-600">
                          {event._listeners.name || "[No Name]"}
                        </Link>
                      </td>
                      <td
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate hover:text-gray-900 cursor-pointer"
                        title={event.id.toFixed(0)}
                      >
                        {event.id}
                      </td>
                      <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 sm:pl-2">
                        <Link to={`/streams/${event.listeners_id}`} className="hover:text-gray-600">
                          {event._listeners.url || "[No URL]"}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {DateTime.fromMillis(event.created_at).toJSDate().toLocaleString()}
                      </td>
                      {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                       */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Events;

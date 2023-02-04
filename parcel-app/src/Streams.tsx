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
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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
  const { listeners, refresh, loading, error } = useListeners();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;
  if (!listeners) return <div>No Listeners!</div>;
  return (
    <Fragment>
      {" "}
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {!listeners.length && (
            <Link
              type="button"
              to="/listeners/new"
              className="group  transition-all duration-250 hover:bg-blue-400 relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <LinkIcon className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-100" />

              <span className="mt-2 block text-sm font-medium text-gray-900">
                Create a new Nodeless Oracle
              </span>
            </Link>
          )}

          {oracles.map((oracle) => (
            <li key={oracle.id}>
              <div className="flex items-center">
                <div className="flex min-w-0 flex-1 items-center  px-4 py-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <ChainLogo chainId={oracle.chainId} />
                  </div>
                  <div className="min-w-0 flex-1 px-4 ">
                    <div>
                      <h2 className="text-medium font-bold text-gray-800 my-2">
                        {oracle.name || "No label"}{" "}
                        <a
                          href={chainSvgs[oracle.chainId].blockExplorer + oracle.contractAddress}
                          target="_blank"
                          rel="noreferrer"
                          className="inline cursor-pointer hover:text-black text-blue-600 text-xs font-medium p-1 "
                        >
                          Open In Block Explorer
                        </a>
                      </h2>
                      {oracle.jobId ? (
                        <p
                          className="truncate flex text-sm font-medium text-blue-600 cursor-pointer group"
                          onClick={() => {
                            copy(oracle.jobId);
                            toast.success("Copied job ID to clipboard");
                          }}
                        >
                          <HashtagIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="truncate">
                            {"JobId: " + oracle.jobId || "[All Jobids]"}
                          </span>
                          <SmallDocumentDuplicateIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-800"
                            aria-hidden="true"
                          />
                        </p>
                      ) : (
                        <p className="truncate flex text-sm font-medium text-gray-400 cursor-pointer group">
                          <HashtagIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="truncate ">[All Jobids]</span>
                        </p>
                      )}
                      <p
                        className="truncate flex text-sm font-medium text-blue-600 cursor-pointer group"
                        onClick={() => {
                          copy(
                            oracle.contractAddress.startsWith("0x")
                              ? ethers.utils.getAddress(oracle.contractAddress)
                              : ""
                          );
                          toast.success("Copied address to clipboard");
                        }}
                      >
                        <LinkIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          Oracle Contract Addr:{" "}
                          {oracle.contractAddress.startsWith("0x")
                            ? ethers.utils.getAddress(oracle.contractAddress)
                            : ""}
                        </span>
                        <SmallDocumentDuplicateIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-800"
                          aria-hidden="true"
                        />
                      </p>
                      <p
                        className="mt-2 flex items-center text-sm text-gray-500 cursor-pointer group"
                        onClick={() => {
                          copy(oracle.webhookUrl);
                          toast.success("Copied URL to clipboard");
                        }}
                      >
                        <GlobeAmericasIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 "
                          aria-hidden="true"
                        />
                        <span className="truncate">{oracle.webhookUrl}</span>
                        <SmallDocumentDuplicateIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-800"
                          aria-hidden="true"
                        />
                      </p>
                    </div>
                    {/* <div className="hidden md:block">
                <div>
                  <p className="text-sm text-gray-900">
                    Applied on{" "}
                    <time dateTime={application.date}>
                      {application.dateFull}
                    </time>
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <CheckCircleIcon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                      aria-hidden="true"
                    />
                    {application.stage}
                  </p>
                </div>
              </div> */}
                  </div>
                </div>
                <Link
                  title="Show Code"
                  className="mx-4 p-2 hover:text-black text-gray-400 flex"
                  // onClick={() => {
                  //   setCode(makeCode(oracle));
                  //   setModalOpen(true);
                  // }}
                  to={`/code/${oracle.id}`}
                >
                  <CodeBracketIcon className="h-5 w-5" />
                  <span className="hidden md:inline ml-2">Code</span>
                </Link>
                <button
                  title="Make a duplicate contract"
                  className="mx-4 p-2 hover:text-black text-gray-400 flex"
                  onClick={() => {
                    setCreateAddress(
                      chainSvgs[oracle.chainId].defaultOracleAddress &&
                        chainSvgs[oracle.chainId].defaultOracleAddress?.toLowerCase() ===
                          oracle.contractAddress.toLowerCase()
                        ? ""
                        : oracle.contractAddress
                    );
                    setCreateName(oracle.name + " copy");
                    setCreateConfirmed(oracle.confirmed);
                    setCreateAsync(oracle.async);
                    setCreateChainId(oracle.chainId);
                    setCreateWebhookUrl(oracle.webhookUrl);
                    setCreateInputs(oracle.inputs);
                    setCreateOutputType(oracle.outputType);
                    setShowOracle(true);
                    setTimeout(() => {
                      window.location.href = "#create-oracle-form";
                    }, 100);
                  }}
                >
                  <DocumentDuplicateIcon className="h-5 w-5" />
                  <span className="hidden md:inline ml-2">Clone</span>
                </button>
                <Link
                  to={`/oracle/${oracle.id}`}
                  className="mx-4 p-2 hover:text-black text-gray-400 flex"

                  // className="block hover:bg-blue-800 h-20 w-20 p-8 animated hover:fadeIn  text-gray-400 group-hover hover:text-white"
                >
                  <PencilIcon className="h-5 w-5" />
                  <span className="hidden md:inline ml-2">Edit</span>

                  {/* <ChevronRightIcon className="h-5 w-5" aria-hidden="true" /> */}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};
export default Streams;

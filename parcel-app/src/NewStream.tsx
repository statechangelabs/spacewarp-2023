import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Formik, Form } from "formik";
import React, { FC, useEffect } from "react";
import { toast } from "react-toastify";
import {
  TextField,
  Checkbox,
  CodeParameters,
  OutputType,
  Section,
  TextList,
  TextAreaField,
} from "./FormComponents";
import { useCreateListener } from "./useListeners";
import { isWebUri } from "valid-url";
import { Navigate, useNavigate } from "react-router-dom";
import ABIParser from "./AbiParser";
import { useBase } from "./Base";

const NewStream: FC<{
  name?: string;

  url?: string;

  addresses?: string[];
  topics?: string[];

  abi?: any;
}> = ({ name = "My filestream", url, addresses, topics, abi }) => {
  const create = useCreateListener();
  const navigate = useNavigate();
  const { setTitle } = useBase();
  useEffect(() => {
    setTitle("Create a new FileStream");
  }, [setTitle]);
  return (
    <Formik
      initialValues={{
        name,
        url,
        addresses,
        topics,
        abi: JSON.stringify(abi, null, 2),
      }}
      onSubmit={async (values, form) => {
        try {
          await create({
            name: values.name,
            url: values.url,
            addresses: values.addresses,
            topics: values.topics,
            abi: values.abi && JSON.parse(values.abi),
          });
          form.resetForm();

          toast.success("Created the stream!");
          navigate("/");
        } catch (e) {
          console.log(e);
          toast.error("Could not create the stream listener: " + (e as Error).toString());
        }
      }}
      enableReinitialize
      validateOnMount
      validate={(values) => {
        const errors: any = {};
        if (!values.name) {
          errors.name = "Required";
        }

        if (!values.url) {
          errors.url = "Required";
        } else if (!isWebUri(values.url)) {
          errors.url = "Invalid URL";
        }
        if (values.abi) {
          try {
            JSON.parse(values.abi);
          } catch (e) {
            errors.abi = "Invalid JSON in ABI";
          }
        }
        if (!values.addresses || !values.addresses.length) {
          errors.addresses = "Required";
        }
        if (Object.keys(errors).length) return errors;
      }}
    >
      {({ submitForm, isSubmitting, isValid, dirty, values }) => (
        <Form id="create-stream-form">
          <div className="p-4">
            <div>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-xl font-medium leading-6 text-gray-900">
                      Create a FileStream
                    </h3>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <TextField title="Name/label" name="name" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Webhook - where does the request go?
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      The URL and arguments for the request
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <TextField title="Webhook url" name="url" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      The Target Address - what actor to listen for?
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Note currently this requires an eth-style (0x) address
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <TextList title="Addresses" name="addresses" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Optional: Filter/Augment Event Topics based on an ABI
                    </h3>
                    <p className="mt-1 text-sm text-gray-600"></p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0">
                  <div className="shadow sm:overflow-hidden sm:rounded-md">
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <TextAreaField title="ABI as JSON" name="abi" />
                      </div>
                    </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <ABIParser abi={values.abi} />
                      </div>
                    </div>
                    <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-3 gap-6">
                        <TextList title="Topics" name="topics" />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        navigate("/");
                      }}
                      className={
                        isSubmitting
                          ? "mr-4 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          : "mr-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      }
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={() => {
                        submitForm();
                      }}
                      disabled={!isValid || !dirty || isSubmitting}
                      className={
                        !isValid || !dirty || isSubmitting
                          ? " inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          : "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      }
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NewStream;

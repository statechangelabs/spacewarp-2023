import { RadioGroup } from "@headlessui/react";
import { TrashIcon, PlusIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useField, Field, FieldArray, ErrorMessage, useFormikContext } from "formik";
import React, { FC, ReactElement, ReactNode } from "react";

export const OptionList: FC<{
  name: string;
  title: string;
  subTitle?: string | ReactElement;
  options: { name: string | ReactElement; value: string }[];
}> = ({ name: fieldName, title, subTitle, options }) => {
  const [, , { setValue }] = useField(fieldName);
  // console.log("Value for", fieldName, value);
  return (
    <div className="col-span-6">
      <fieldset>
        <legend className="contents text-sm font-medium text-gray-900">{title}</legend>
        {typeof subTitle === "string" ? (
          <p className="text-sm text-gray-500">{subTitle}</p>
        ) : (
          subTitle
        )}
        <div className="mt-4 space-y-4">
          {options.map(({ name, value }) => (
            <div className="flex items-center" key={value}>
              <Field
                id={fieldName + "-" + value}
                name={fieldName}
                type="radio"
                value={value}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                // onClick={() => {
                //   console.log("hello?");
                //   setValue(value, true);
                // }}
              />
              <label
                htmlFor={fieldName + "." + value}
                className="ml-3 block text-sm font-medium text-gray-700 flex flex-start pointer-cursor hover:text-gray-900"
                onClick={() => {
                  setValue(value, true);
                }}
              >
                {name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
export type OracleInput = {
  name: string;
  type: string;
};
export const inputTypes = [
  { name: "string", label: "Text" },
  { name: "uint256", label: "Number (uint256)" },
];
export const CodeParameters: FC<{ name: string }> = ({ name: baseName }) => {
  const { setFieldValue } = useFormikContext();
  //   const [, , { setValue }] = useField(baseName);
  return (
    <FieldArray name={baseName}>
      {({
        push,
        remove,
        form: {
          values: { [baseName]: inputs },
        },
      }) => (
        <div className="col-span-6">
          {inputs &&
            (inputs as OracleInput[]).map(({ name, type }, index) => (
              <div key={index} className="flex  w-full space-between">
                <div className=" items-center">
                  <Field
                    id={`${baseName}-${index}-name`}
                    name={`${baseName}.${index}.name`}
                    type="text"
                    className="mr-4 mt-1 w-40 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                {inputTypes.map(({ name, label }) => (
                  <div className="flex mt-3" key={name}>
                    <Field
                      type="radio"
                      name={`${baseName}.${index}.type`}
                      value={name}
                      className="inline mr-1"
                    />
                    <span
                      className="inline mr-2 text-sm font-medium cursor-pointer"
                      onClick={() => {
                        setFieldValue(`${baseName}.${index}.type`, name, true);
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                  className="ml-2 text-red-600 hover:text-red-800 text-sm"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          <ErrorMessage
            name={baseName}
            component="div"
            className="text-red-600 text-sm font-medium"
          />
          <div className="mt-4">
            <button
              type="button"
              onClick={() => {
                push({ name: "", type: "string" });
              }}
              className="text-gray-200 hover:text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-md px-4 py-1"
            >
              <PlusIcon className="h-4 w-4 mr-1 inline" />
              Add
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
};

export const TextList: FC<{ name: string; title?: string; subTitle?: string }> = ({
  name: baseName,
  title,
  subTitle,
}) => {
  const { setFieldValue } = useFormikContext();
  //   const [, , { setValue }] = useField(baseName);
  return (
    <FieldArray name={baseName}>
      {({
        push,
        remove,
        form: {
          values: { [baseName]: inputs },
        },
      }) => (
        <div className="col-span-6 text-sm">
          <label htmlFor={baseName} className="block text-sm font-medium text-gray-700">
            {title}
          </label>
          {subTitle && <p className="text-gray-500 ">{subTitle}</p>}

          {inputs &&
            (inputs as string[]).map((value, index) => (
              <div key={index} className="flex  w-full space-between">
                {/* <div className=" items-center"> */}
                <Field
                  id={`${baseName}-${index}`}
                  name={`${baseName}.${index}`}
                  type="text"
                  className="mr-4 mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {/* </div> */}

                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                  className="ml-2 text-red-600 hover:text-red-800 text-sm"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          <ErrorMessage
            name={baseName}
            component="div"
            className="text-red-600 text-sm font-medium"
          />
          <div className="mt-4">
            <button
              type="button"
              onClick={() => {
                push("");
              }}
              className="text-gray-200 hover:text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium rounded-md px-4 py-1"
            >
              <PlusIcon className="h-4 w-4 mr-1 inline" />
              Add
            </button>
          </div>
        </div>
      )}
    </FieldArray>
  );
};

export const OutputType: FC<{ name: string }> = ({ name: baseName }) => {
  const [, , { setValue }] = useField(baseName);
  return (
    <fieldset>
      <div className="mt-4 space-y-4">
        {inputTypes.map(({ name, label }) => (
          <div className="flex items-center" key={`${baseName}-${name}`}>
            <Field
              id={name}
              name={baseName}
              type="radio"
              value={name}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor="{chain.value}"
              className="ml-3 block text-sm font-medium text-gray-700 flex flex-start pointer-cursor hover:text-gray-900"
              onClick={() => {
                setValue(name, true);
              }}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};
export const Checkbox: FC<{
  name: string;
  title: string;
  subTitle?: string;
  disabled?: boolean;
}> = ({ name, title, subTitle, disabled = false }) => {
  const [{ value }, , { setValue }] = useField(name);
  return (
    <div>
      <div className="flex items-start col-span-6">
        <div className="flex h-5 items-center">
          <Field
            id={name}
            name={name}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            disabled={disabled}
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="comments"
            className="font-medium text-gray-700"
            onClick={() => {
              setValue(!value);
            }}
          >
            {title}
          </label>
          {subTitle && (
            <p
              className="text-gray-500 cursor-pointer"
              onClick={() => {
                setValue(!value);
              }}
            >
              {subTitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-start col-span-6">
        <ErrorMessage
          component="div"
          className="font-medium text-sm text-red-600 pl-6"
          name={name}
        />
      </div>
    </div>
  );
};

export const TextField: FC<{
  name: string;
  title: string;
  subTitle?: string | ReactNode;
}> = ({ name, title, subTitle }) => {
  return (
    <div className="col-span-6 text-sm">
      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      {subTitle && <p className="text-gray-500 ">{subTitle}</p>}

      <Field
        type="text"
        name={name}
        id={name}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      <ErrorMessage name={name}>
        {(message) => <div className="pl-2 pt-2 text-red-600 font-medium text-sm">{message}</div>}
      </ErrorMessage>
    </div>
  );
};
export const TextAreaField: FC<{
  name: string;
  title: string;
  subTitle?: string | ReactNode;
}> = ({ name, title, subTitle }) => {
  return (
    <div className="col-span-6 text-sm">
      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      {subTitle && <p className="text-gray-500 ">{subTitle}</p>}

      <Field
        type="text"
        as="textarea"
        name={name}
        id={name}
        rows="4"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      <ErrorMessage name={name}>
        {(message) => <div className="pl-2 pt-2 text-red-600 font-medium text-sm">{message}</div>}
      </ErrorMessage>
    </div>
  );
};

export const PasswordField: FC<{
  name: string;
  title: string;
  subTitle?: string | ReactNode;
}> = ({ name, title, subTitle }) => {
  return (
    <div className="col-span-6 text-sm">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      {subTitle && <p className="text-gray-500 ">{subTitle}</p>}

      <Field
        type="password"
        name={name}
        id={name}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      <ErrorMessage name={name}>
        {(message) => <div className="pl-2 pt-2 text-red-600 font-medium text-sm">{message}</div>}
      </ErrorMessage>
    </div>
  );
};
export const InfoBox: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="rounded-md bg-blue-50 p-4 col-span-3">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-blue-700">{children}</p>
          {/* <p className="mt-3 text-sm md:mt-0 md:ml-6">
      <a
        href="#"
        className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
      >
        Details
        <span aria-hidden="true"> &rarr;</span>
      </a>
    </p> */}
        </div>
      </div>
    </div>
  );
};
export const Section: FC<{
  title?: string;
  subTitle?: string;
  children: ReactNode;
}> = ({ title, subTitle, children }) => {
  return (
    <div className="md:grid md:grid-cols-3 md:gap-6">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          {title && <h3 className="text-xl font-medium leading-6 text-gray-900">{title}</h3>}
          {subTitle && <p className="mt-1 text-sm text-gray-600">{subTitle}</p>}{" "}
        </div>
      </div>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-3 gap-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const SubHeader: FC<{
  title: string | ReactNode;
  subTitle?: string | ReactNode;
}> = ({ title, subTitle }) => {
  return (
    <div className="col-span-6 ">
      <h4 className="text-sm font-medium leading-6 text-gray-900">{title}</h4>
      {subTitle &&
        (typeof subTitle === "string" ? (
          <p className="text-sm text-gray-700 ">{subTitle}</p>
        ) : (
          subTitle
        ))}
    </div>
  );
};
export const SubmitGroup: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex justify-end">
      <div className="flex items-center ">{children}</div>
    </div>
  );
};
export const SubmitButton: FC<{
  title: string;
  disabledTitle?: string;
  submittingTitle?: string;
}> = ({ title, disabledTitle, submittingTitle }) => {
  const { isValid, isSubmitting } = useFormikContext();
  return (
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      className={
        !isValid || isSubmitting
          ? " inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          : "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      }
    >
      {!isValid ? disabledTitle || title : isSubmitting ? submittingTitle || title : title}
    </button>
  );
};

export const FullbarButton: FC<{
  title: string;
  disabledTitle?: string;
  submittingTitle?: string;
}> = ({ title, disabledTitle, submittingTitle }) => {
  const { isValid, isSubmitting } = useFormikContext();
  return (
    <button
      type="submit"
      disabled={!isValid || isSubmitting}
      className={
        "w-full justify-center rounded-md border border-transparent  py-2 px-4 text-sm font-medium text-white shadow-sm " +
        (!isValid || isSubmitting
          ? " bg-gray-600 "
          : " bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2")
      }
    >
      {!isValid ? disabledTitle || title : isSubmitting ? submittingTitle || title : title}
    </button>
  );
};
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const StackedCards: FC<{
  name: string;
  options: {
    value: string;
    title: string;
    subTitle?: string;
    right?: string;
  }[];
  title?: string;
  subTitle?: string;
}> = ({ name, options, subTitle, title }) => {
  const [{ value }, , { setValue }] = useField(name);
  return (
    <div className="col-span-6 text-sm">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {title}
      </label>
      {subTitle && <p className="text-gray-500 ">{subTitle}</p>}
      <RadioGroup value={value} onChange={setValue}>
        <RadioGroup.Label className="sr-only"> Server size </RadioGroup.Label>
        <div className="space-y-4">
          {options.map(({ value, title, subTitle, right }) => (
            <RadioGroup.Option
              key={value}
              value={value}
              className={({ checked, active }) =>
                classNames(
                  checked ? "border-transparent" : "border-gray-300",
                  active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                  "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <span className="flex items-center">
                    <span className="flex flex-col text-sm">
                      <RadioGroup.Label as="span" className="font-medium text-gray-900">
                        {title}
                      </RadioGroup.Label>
                      {subTitle && (
                        <RadioGroup.Description as="span" className="text-gray-500">
                          {subTitle}
                        </RadioGroup.Description>
                      )}
                    </span>
                  </span>
                  {right && (
                    <RadioGroup.Description
                      as="span"
                      className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:flex-col sm:text-right"
                    >
                      <span className="font-medium text-gray-900">{right}</span>
                      {/* <span className="ml-1 text-gray-500 sm:ml-0">/mo</span> */}
                    </RadioGroup.Description>
                  )}
                  <span
                    className={classNames(
                      active ? "border" : "border-2",
                      checked ? "border-indigo-500" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-lg"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

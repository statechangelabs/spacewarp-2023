import {
  createContext,
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const context = createContext({
  show: false,
  setShow: (show: boolean) => {},
  title: "Are you sure?",
  setTitle: (message: string) => {},
  message: "Are you sure you want to do this?",
  setMessage: (message: string) => {},
  actionLabel: "Confirm" as string | undefined,
  setActionLabel: (label?: string) => {},
  cancelLabel: "Cancel" as string | undefined,
  setCancelLabel: (label?: string) => {},
  setAction: (action: string) => {},
  action: "cancel",
  onFinalize: (state: string) => {},
  setOnFinalize: (finalize: (state: string) => void) => {},
});

const { Provider } = context;

const AlertProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [actionLabel, setActionLabel] = useState<string | undefined>("Confirm");
  const [cancelLabel, setCancelLabel] = useState<string | undefined>("Cancel");
  const [action, setAction] = useState("cancel");
  const [onFinalize, setOnFinalize] = useState(() => (state: string) => {});
  const value = useMemo(
    () => ({
      show,
      setShow,
      title,
      setTitle,
      message,
      setMessage,
      actionLabel,
      setActionLabel,
      cancelLabel,
      setCancelLabel,
      action,
      setAction,
      onFinalize,
      setOnFinalize,
    }),
    [
      show,
      setShow,
      title,
      setTitle,
      message,
      setMessage,
      actionLabel,
      setActionLabel,
      cancelLabel,
      setCancelLabel,
      action,
      setAction,
      onFinalize,
      setOnFinalize,
    ]
  );

  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <Provider value={value}>
      {children}
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setShow}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    {actionLabel && (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => {
                          setAction("accept");
                          onFinalize("accept");
                        }}
                      >
                        {actionLabel}
                      </button>
                    )}
                    {cancelLabel && (
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={() => {
                          setAction("cancel");
                          onFinalize("cancel");
                        }}
                        ref={cancelButtonRef}
                      >
                        {cancelLabel}
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Provider>
  );
};
export default AlertProvider;

export const useAlert = () => {
  const {
    setTitle,
    setMessage,
    setOnFinalize,
    setShow,
    show,
    setActionLabel,
    setCancelLabel,
  } = useContext(context);

  const alert = useCallback(
    async (options: {
      title: string;
      message: string;
      actionLabel?: string;
      cancelLabel?: string;
    }) => {
      const { title, message, actionLabel, cancelLabel } = options;
      if (show) throw new Error("Cannot show an alert when other is displayed");
      setTitle(title);
      setMessage(message);
      setShow(true);
      setCancelLabel(cancelLabel);
      setActionLabel(actionLabel);
      const p = new Promise<string>((resolve) => {
        setOnFinalize(() => resolve);
      });
      const result = await p;
      setShow(false);
      return result;
    },
    [
      setMessage,
      setOnFinalize,
      setTitle,
      show,
      setShow,
      setActionLabel,
      setCancelLabel,
    ]
  );
  const confirm = useCallback(
    async (options: {
      title: string;
      message: string;
      acceptLabel?: string;
      cancelLabel?: string;
    }) => {
      alert({
        title: options.title,
        message: options.message,
        actionLabel: options.acceptLabel || "Confirm",
        cancelLabel: options.cancelLabel || "Cancel",
      });
    },
    [alert]
  );
  return { confirm, alert };
};

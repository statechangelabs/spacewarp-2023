import React, {
  createContext,
  Fragment,
  useState,
  useMemo,
  useContext,
  useEffect,
  useRef,
} from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AppRouter from "./AppRouter";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthentication, useMe } from "./Authenticator";
import { Helmet } from "react-helmet";
import Logo from "./Logo";
const context = createContext({
  title: "",
  setTitle: (title: string) => {},
  pathname: window.location.pathname,
  setPathname: (pathname: string) => {},
  setShowBack: (showBack: boolean) => {},
});
const { Provider } = context;
const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Base() {
  const navigate = useNavigate();
  const { logout } = useAuthentication();
  const { data: me } = useMe();
  const initial = useMemo(() => {
    if (me) {
      const { name, email, address } = me;
      const resolvedName = name || email || address?.substring(0, 6);
      return resolvedName?.substring(0, 1).toUpperCase();
    } else return "";
  }, [me]);
  const userNavigation = useMemo(
    () => [
      { name: "Settings", href: "/me" },
      {
        name: "Sign out",
        onClick: () => {
          logout();
          navigate("/");
        },
      },
    ],
    [logout]
  );

  const [title, setTitle] = useState("FileStream.Link");

  const [pathname, setPathname] = useState(window.location.pathname);
  const [showBack, setShowBack] = useState(true);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  useEffect(() => {
    const to = setInterval(() => {
      const temp = window.location.pathname;
      if (temp !== pathnameRef.current) {
        setPathname(temp);
      }
    }, 300);
    return () => clearInterval(to);
  }, []);
  const value = useMemo(() => {
    return { title, setTitle, pathname, setPathname, setShowBack };
  }, [title, setTitle, pathname, setPathname, setShowBack]);
  const navigation = [
    // {
    //   name: "Dashboard",
    //   href: "/dashboard",
    //   current: pathname.endsWith("/dashboard"),
    // },
    {
      name: "Streams",
      href: "/streams",
      current: pathname.endsWith("/streams"),
    },
    {
      name: "Events",
      href: "/events",
      current: pathname.endsWith("/events"),
    },
  ];

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-gray-100">
          <body class="h-full">
          ```
        */}
      <Helmet title={"Filestream.Link | " + title} />
      <div className="min-h-full">
        <div className="bg-gray-800 pb-32">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Logo className="h-8 w-8" />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                              <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "px-3 py-2 rounded-md text-sm font-medium"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          {/* <button
                              type="button"
                              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                              <span className="sr-only">View notifications</span>
                              <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button> */}

                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <div className="p-1 h-8 w-8 rounded-full bg-blue-600 text-white font-medium text-lg">
                                  {initial}
                                </div>
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) =>
                                      item.onClick ? (
                                        <button
                                          onClick={item.onClick}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700 w-full text-left"
                                          )}
                                        >
                                          {item.name}
                                        </button>
                                      ) : (
                                        <Link
                                          to={item.href}
                                          className={classNames(
                                            active ? "bg-gray-100" : "",
                                            "block px-4 py-2 text-sm text-gray-700 w-full"
                                          )}
                                        >
                                          {item.name}
                                        </Link>
                                      )
                                    }
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                      <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                          ) : (
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                  <div className="space-y-1 px-2 py-3 sm:px-3">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pt-4 pb-3">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      {/* <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button> */}
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl flex font-bold tracking-tight text-white">
                {showBack && (
                  <button
                    className="h-6 w-8 text-gray-400 hover:text-gray-200 mr-2"
                    onClick={() => {
                      window.history.back();
                    }}
                  >
                    <ChevronLeftIcon className="h-8 w-8" />
                  </button>
                )}
                {title}
              </h1>
            </div>
          </header>
        </div>

        <main className="-mt-32">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              <Provider value={value}>
                <AppRouter />
              </Provider>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  );
}
export const useBase = () => {
  const { pathname } = useLocation();
  const baseContext = useContext(context);
  const { setShowBack } = baseContext;
  useEffect(() => {
    setShowBack(true);
  }, [pathname, setShowBack]);
  return baseContext;
};
export const useUpdatePath = () => {
  //   const { setPathname } = useBase();
  //   const { location } = useNavigation();
  //   useEffect(() => {
  //     if (location) setPathname(location.pathname);
  //   }, [location?.pathname, setPathname, location]);
};

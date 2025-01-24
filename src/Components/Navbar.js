import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import logo from "./sharedmedia/logo.png";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "#about", current: false },
  { name: "Works ", href: "#works", current: false },
  { name: "Services", href: "#services", current: false },
  { name: "Contact Us", href: "contact-us", current: false },
  { name: "Dashboard", href: "dashboard", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="fixed top-0 left-0 right-0 z-50 bg-white-900 "
    >
      {({ open }) => (
        <>
          <div className="max-w-6xl px-2 mx-auto md:px-4 lg:px-6">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-900 rounded-md hover:text-secondary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 md:items-stretch md:justify-start">
                <div className="flex items-center flex-shrink-0">
                  <img
                    className="block w-auto h-5 lg:hidden"
                    src={logo}
                    alt="logo"
                  />
                  <img
                    className="hidden w-auto h-5 lg:block"
                    src={logo}
                    alt="logo"
                  />
                </div>
                <div className="hidden mx-auto md:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-primary font-bold px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center hidden pr-2 sm:block md:ml-4 lg:ml-6 sm:pr-0">
                <button className="px-3 py-2 mr-2 text-sm font-medium transition delay-300 border-2 rounded-full text-primary-900 border-primary-900 lg:px-6 lg:mr-6 whitespace-nowrap focus:outline-none hover:bg-primary-900 hover:text-white">
                  SIGN IN
                </button>

                <button className="bg-sky-900 px-2 py-2 text-sm font-medium text-white transition delay-300 border-2 rounded-full shadow-xl border-primary-900 bg-primary-900 lg:px-4 whitespace-nowrap focus:outline-none hover:bg-secondary hover:text-primary-900 hover:border-secondary">
                  GET FREE QUOTE
                </button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="pb-4 shadow-xl md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "text-primary font-bold"
                      : "text-black-300  hover:text-secondary",
                    "block px-3 py-2 rounded-md text-base font-medium whitespace-nowrap"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col pr-2 sm:hidden">
                <button className="px-3 py-2 mb-2 text-sm font-medium transition delay-300 border-2 rounded-full text-primary-900 border-primary-900 lg:mr-6 whitespace-nowrap focus:outline-none hover:bg-primary-900 hover:text-white">
                  SIGN IN
                </button>
                <button className="px-2 py-2 text-sm font-medium text-white transition delay-300 border-2 rounded-full border-primary-900 bg-primary-900 whitespace-nowrap focus:outline-none hover:bg-secondary hover:text-primary-900 hover:border-secondary">
                  GET FREE QUOTE
                </button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

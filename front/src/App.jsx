import { useEffect, useState } from "react";
import "./App.css";
import { getContacts, getFilterContacts } from "./services/contact";
import { useStore } from "./store/contacts";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import AggContact from "./AggContact";
import ViewContact from "./ViewContact";

function App() {
  const contacts = useStore((state) => state.contacts);
  const setContacts = useStore((state) => state.setContacts);
  const [contact, setContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showViewContact, setShowViewContact] = useState(false);

  const fetchContacts = async () => {
    const contactsAPI = await getContacts();
    setContacts(contactsAPI);
  };

  const fetchFilterContacts = async (filter) => {
    const contactsFilters = await getFilterContacts(filter);
    setContacts(contactsFilters);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleOnChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    fetchFilterContacts(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target.filter;
    fetchFilterContacts(value);
  };

  const handleAddContact = () => {
    setShowModal(prevState => !prevState);
    setShowViewContact(false)
  };

  const handleViewContacts = () => {
    setShowViewContact(prevState => !prevState);
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full h-screen">
        <div className="flex justify-end pt-4 px-2">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="rounded-full border bg-slate-800 h-[60px] w-[60px] flex justify-center items-center">
                <FaPlus size={30} className="text-white " />
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleAddContact}
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Agregar contacto
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleViewContacts}
                        className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Ver contactos
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        {showModal && <AggContact onclose={() => setShowModal(false)} />}
        {showViewContact && <ViewContact onClose={() => setShowViewContact(false)} />}
      </div>
    </>

  );
}

export default App;
// <div className="w-screen h-screen bg-zinc-400 p-2 flex space-x-4">
//   <div className="w-1/4 flex flex-col space-y-2 bg-stone-300 h-[95vh] rounded-md p-1">
//     <div className="rounded-md">
//       <form
//         className="flex space-x-2"
//         onSubmit={handleOnSubmit}
//         onChange={handleOnChange}
//       >
//         <input
//           name="filter"
//           type="text"
//           className="rounded-md h-10 w-9/12 text-xl"
//         />
//         <button className="rounded-md bg-slate-800 px-4 py-1">
//           <FaSearch size={30} className="text-white" />
//         </button>
//       </form>
//     </div>
//     {contacts.length > 0 &&
//       contacts.map((c, index) => (
//         <div
//           key={index}
//           className="text-white px-2 py-1 bg-purple-700 rounded-md cursor-pointer overflow-hidden shadow-lg"
//         >
//           <p className="text-lg font-semibold">{c.name}</p>
//           <p>{c.phone}</p>
//         </div>
//       ))}
//   </div>
//   <div className="text-center block relative">
//     {!contacts.length && (
//       <>
//         <div className="animate-spin mx-auto left-96 absolute top-60">
//           <FaSpinner size={150} className="" color="orange" />
//         </div>
//         <div className=" mx-auto left-96 absolute top-96 mt-10 ml-10 text-xl font-bold text-orange-500 w-max">
//           is loading...
//         </div>
//       </>
//     )}
//   </div>
// </div>

import { useEffect, useState } from "react";
import "./App.css";
import { getContacts, getFilterContacts } from "./services/contact";
import { useStore } from "./store/contacts";
import { FaSearch, FaSpinner } from "react-icons/fa";

function App() {
  const contacts = useStore((state) => state.contacts);
  const setContacts = useStore((state) => state.setContacts);
  const [contact, setContact] = useState(null);

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

  return (
    <div className="w-screen h-screen bg-zinc-400 p-2 flex space-x-4">
      <div className="w-1/4 flex flex-col space-y-2 bg-stone-300 h-[95vh] rounded-md p-1">
        <div className="rounded-md">
          <form
            className="flex space-x-2"
            onSubmit={handleOnSubmit}
            onChange={handleOnChange}
          >
            <input
              name="filter"
              type="text"
              className="rounded-md h-10 w-9/12 text-xl"
            />
            <button className="rounded-md bg-slate-800 px-4 py-1">
              <FaSearch size={30} className="text-white" />
            </button>
          </form>
        </div>
        {contacts.length > 0 &&
          contacts.map((c, index) => (
            <div
              key={index}
              className="text-white px-2 py-1 bg-purple-700 rounded-md cursor-pointer overflow-hidden shadow-lg"
            >
              <p className="text-lg font-semibold">{c.name}</p>
              <p>{c.phone}</p>
            </div>
          ))}
      </div>
      <div className="text-center block relative">
        {!contacts.length && (
          <>
            <div className="animate-spin mx-auto left-96 absolute top-60">
              <FaSpinner size={150} className="" color="orange" />
            </div>
            <div className=" mx-auto left-96 absolute top-96 mt-10 ml-10 text-xl font-bold text-orange-500 w-max">
              is loading...
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

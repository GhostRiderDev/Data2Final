import { useEffect, useState } from "react";
import "./App.css";
import { getContacts } from "./services/contact";

function App() {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const contactsAPI = await getContacts();
    setContacts(contactsAPI);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      {contacts.length > 0 &&
        contacts.map((c) => <p key={c.phone}>{c.name}</p>)}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { getContacts } from "./services/contact";
function ViewContact({ onClose }) {
    const [contacts, setContacts] = useState([]);
    const fetchContacts = async () => {
        const contactsAPI = await getContacts();
        setContacts(contactsAPI);
    };
    useEffect(() => {
        fetchContacts();
    }, []);
    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500"];

    return (

        <div className="flex justify-center items-center">
            <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Ver Contactos</h5>
                </div>
                <div className="flow-root">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {contacts.map((contact, index) => (
                            <li className="py-3 sm:py-4" key={contact.id}>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className={`w-8 h-8 rounded-full  text-center text-xl ${colors[index % colors.length]}`} alt={`${contact.name} image`} >
                                            {contact.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0 ms-4">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {contact.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {contact.email}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        {contact.phone}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>


    )

}
export default ViewContact;
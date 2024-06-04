import axios from "axios";

const BASE_URL_CONTACTS = "http://localhost:8080/contacts";

/**
 *
 * @returns All contacts
 */
export const getContacts = async () => {
  const response = await axios.get(BASE_URL_CONTACTS);
  return response.data;
};

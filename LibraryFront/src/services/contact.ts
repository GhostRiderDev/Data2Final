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

export const getFilterContacts = async (filter) => {
  try {
    const response = await axios.get(
      `${BASE_URL_CONTACTS}/search?filter=${filter}`
    );
    return response.data;
  } catch (e) {
    return [];
  }
};
export const addContact = async (contact) => {
  try {
    const response = await axios.post(BASE_URL_CONTACTS, contact);
    return response.data;
  } catch (e) {
    return [];
  }
}

import type {
  Contact,
  ContactHistorySummary,
  ContactInput,
} from "@/types/contacts";

const BASE_API_URL = import.meta.env.VITE_API_URL;
const BASE_API_PATH = "/path/contact";

export async function fetchContacts(): Promise<Contact[]> {
  const response = await fetch(`${BASE_API_URL}${BASE_API_PATH}`);
  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }
  return response.json();
}

export async function createContact(contact: ContactInput): Promise<Contact> {
  const data = {
    method: "POST",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BASE_API_URL}${BASE_API_PATH}`, data);
  if (!response.ok) {
    throw new Error("Failed to create contact");
  }
  return response.json();
}

export async function updateContact(
  contactId: string,
  contact: ContactInput
): Promise<Contact> {
  const data = {
    method: "PATCH",
    body: JSON.stringify(contact),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${BASE_API_URL}${BASE_API_PATH}/${contactId}`,
    data
  );
  if (!response.ok) {
    throw new Error("Failed to update contact");
  }
  return response.json();
}

export async function deleteContact(contactId: string): Promise<void> {
  const response = await fetch(`${BASE_API_URL}${BASE_API_PATH}/${contactId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to update contact");
  }
}

export async function getHistorySummary(
  contactId: string
): Promise<ContactHistorySummary[]> {
  const response = await fetch(
    `${BASE_API_URL}${BASE_API_PATH}/history-summary/${contactId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch contact's history");
  }
  return response.json();
}

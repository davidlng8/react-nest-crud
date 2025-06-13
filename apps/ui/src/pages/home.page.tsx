import { useEffect, useState } from "react";
import { Button } from "@/components/page-ui/button";
import { Header } from "@/components/page-ui/header";
import type { Contact, ContactInput } from "@/types/contacts";
import { ContactList } from "@/components/contacts/contact-list";
import { createContact, fetchContacts, updateContact } from "@/lib/api/contact";
import { ContactForm } from "@/components/contacts/contact-form";
import toast from "react-hot-toast";

const HomePage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateContact = async (contactData: ContactInput) => {
    setIsLoading(true);
    try {
      const existingContact = contacts.find(
        (c) => c.email === contactData.email
      );
      if (existingContact) {
        toast.error("A contact with this email already exists.", {
          position: "top-center",
        });
        return;
      }

      const newContact = await createContact(contactData);
      setContacts((prev) => [...prev, newContact]);
      setIsFormOpen(false);
      toast.success("Contact successfully created");
    } catch (error) {
      toast.error("Failed to create contact. Please try again.", {
        position: "top-center",
      });
      console.error({
        description: "Failed to create contact. Please try again.",
        error,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateContact = async (contactData: ContactInput) => {
    const { contactId } = editingContact || {};
    if (!contactId) return;

    const emailExists = contacts.some(
      (c) => c.email === contactData.email && c.contactId !== contactId
    );

    if (emailExists) {
      toast.error("A contact with this email already exists.", {
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);
    try {
      const updatedContact = await updateContact(contactId, contactData);
      setContacts((prev) =>
        prev.map((c) => (c.contactId === contactId ? updatedContact : c))
      );
      setEditingContact(null);
      setIsFormOpen(false);
      toast.success("Contact successfully updated");
    } catch (error) {
      console.error(error);
      toast.error("An unknown error occured");
    } finally {
      setIsLoading(false);
    }
  };

  /*const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedContactHistory(null);
  };*/

  /*const handleDeleteContact = async () => {
    const { contactId } = editingContact || {};
    // TODO: Add toast to show error for trying to delete a contact with no ID
    if (!contactId) return;

    setIsLoading(true);
    try {
      await deleteContact(contactId);
      setContacts((prev) => prev.filter((c) => c.contactId !== contactId));
      toast.success("Contact successfully deleted.");
    } catch (error) {
      console.error({
        description: "Failed to delete contact. Please try again.",
        error,
      });
    }
  };*/

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  useEffect(() => {
    fetchContacts()
      .then(setContacts)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-600 mt-2">
              Manage your contact database with real-time updates
            </p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            classes="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-slate-50"
            size="lg"
            text={"Add contact +"}
          ></Button>
        </div>

        <ContactList
          contacts={contacts}
          onEdit={handleEditContact}
          onDelete={() => console.log("Do delete")}
        />

        {/** Modal to edit or add contact */}
        <ContactForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={editingContact ? handleUpdateContact : handleCreateContact}
          contact={editingContact}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default HomePage;

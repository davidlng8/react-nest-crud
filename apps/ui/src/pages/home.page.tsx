import { useEffect, useState } from "react";
import { Button } from "@/components/page-ui/button";
import { Header } from "@/components/page-ui/header";
import type { Contact, ContactInput } from "@/types/contacts";
import { ContactList } from "@/components/contacts/contact-list";
import {
  createContact,
  fetchContacts,
  updateContact,
  deleteContact,
} from "@/lib/api/contact";
import { ContactForm } from "@/components/contacts/contact-form";
import toast from "react-hot-toast";
import { useContactsSocket } from "@/lib/hooks/useContactsSocket";
import {
  recentlyCreatedTracker,
  recentlyDeletedTracker,
  recentlyUpdatedTracker,
} from "@/lib/contactId.tracker";

const HomePage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeletModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [deletingContact, setDeleteingContact] = useState<Contact | null>(null);
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
      setContacts((prev) => [newContact, ...prev]);
      recentlyCreatedTracker.mark(newContact.contactId || "");
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
      recentlyUpdatedTracker.mark(contactId);
      handleCloseForm();
      toast.success("Contact successfully updated");
    } catch (error) {
      console.error(error);
      toast.error("An unknown error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteContact = async () => {
    const { contactId } = deletingContact || {};
    if (!contactId) {
      toast.error("Something went wrong trying to delete this contact");
      return;
    }

    setIsLoading(true);
    try {
      await deleteContact(contactId);
      setContacts((prev) => prev.filter((c) => c.contactId !== contactId));
      recentlyDeletedTracker.mark(contactId);
      toast.success("Contact successfully deleted.");
    } catch (error) {
      toast.error("Something went wrong trying to delete this contact");
      console.error({
        description: "Failed to delete contact. Please try again.",
        error,
      });
    } finally {
      handleCloseDelete();
      setIsLoading(false);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const handleDeletingContact = (contact: Contact) => {
    setDeleteingContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDelete = () => {
    setIsDeleteModalOpen(false);
    setDeleteingContact(null);
  };

  useEffect(() => {
    fetchContacts()
      .then(setContacts)
      .catch((err) => console.error(err));
  }, []);

  useContactsSocket(setContacts);

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
          onDelete={handleDeletingContact}
        />

        {/** Modal to edit or add contact */}
        <ContactForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={editingContact ? handleUpdateContact : handleCreateContact}
          contact={editingContact}
          isLoading={isLoading}
        />

        {/** Modal to edit or add contact */}
        <ContactForm
          isOpen={isDeletModalOpen}
          onClose={handleCloseDelete}
          onSubmit={handleUpdateContact}
          contact={deletingContact}
          isLoading={isLoading}
          deleteMode
          onDelete={handleDeleteContact}
        />
      </main>
    </div>
  );
};

export default HomePage;

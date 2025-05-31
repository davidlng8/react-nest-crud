import { useEffect, useState } from "react";
import { Button } from "@/components/page-ui/button";
import { Header } from "@/components/page-ui/header";
import type { Contact } from "@/types/contacts";
import { ContactList } from "@/components/contacts/contact-list";
const HomePage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  // TODO: Replace with real data fetch
  useEffect(() => {
    const mockContacts: Contact[] = [
      {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@example.com",
        phone: "+1987654321",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    setContacts(mockContacts);
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
            onClick={() => console.log("Button clicked")}
            classes="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded text-slate-50"
            size="lg"
            text={"Add contact +"}
          ></Button>
        </div>

        <ContactList
          contacts={contacts}
          onEdit={() => console.log("Do edit")}
          onDelete={() => console.log("Do delete")}
          onViewHistory={() => console.log("Do view history")}
        />
      </main>
    </div>
  );
};

export default HomePage;

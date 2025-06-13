import type { ContactCardProps, ContactHistorySummary } from "@/types/contacts";
import { Card } from "@/components/page-ui/card";
import { Button } from "@/components/page-ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faHistory, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { getHistorySummary } from "@/lib/api/contact";
import { useState } from "react";
import ContactHistory from "./contact-history";

export const ContactCard = ({
  contact,
  onEdit,
  onDelete,
}: ContactCardProps) => {
  const [contactHistory, setSelectedContactHistory] = useState<
    ContactHistorySummary[] | null
  >(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleShowHistory = async () => {
    if (
      !contact ||
      !contact.contactId ||
      contact.contactId.trim().length === 0
    ) {
      toast.error("Unable to fetch contact update history");
      return;
    }
    try {
      const { contactId } = contact;
      const historySummary = await getHistorySummary(contactId);
      setSelectedContactHistory(historySummary);
      setIsHistoryModalOpen(true);
    } catch (error) {
      toast.error("Unable to fetch contact update history", {
        position: "top-center",
      });
      console.error({
        description: "Failed to create contact. Please try again.",
        error,
      });
    }
  };

  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedContactHistory(null);
  };

  return (
    <>
      <Card className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {getInitials(contact.firstName, contact.lastName)}
            </div>
            <div>
              <h3 className="font-medium">
                {contact.firstName} {contact.lastName}
              </h3>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => onEdit(contact)}
              classes="h-8 w-8 p-0"
              text={<FontAwesomeIcon className="h-4 w-4" icon={faEdit} />}
            />
            <Button
              onClick={() => onDelete(contact)}
              classes="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              text={<FontAwesomeIcon className="h-4 w-4" icon={faTrash} />}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-sm">{contact.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-sm">{contact.phone}</p>
          </div>
        </div>

        {contact?.createdAt !== contact?.updatedAt && (
          <div className="mt-2 flex justify-end">
            <Button
              onClick={handleShowHistory}
              classes="p-3 bg-slate-300 cursor-pointer rounded-xl"
              text={
                <>
                  <span>View History</span>{" "}
                  <FontAwesomeIcon className="h-4 w-4" icon={faHistory} />
                </>
              }
            />
          </div>
        )}
      </Card>

      <ContactHistory
        isOpen={isHistoryModalOpen}
        onClose={handleCloseHistoryModal}
        history={contactHistory ?? []}
        contactName={
          contactHistory
            ? `${contact.firstName} ${contact.lastName}`
            : "Current Contact"
        }
      />
    </>
  );
};

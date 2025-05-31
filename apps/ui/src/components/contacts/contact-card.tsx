import type { ContactCardProps } from "@/types/contacts";
import { Card } from "@/components/page-ui/card";
import { Button } from "@/components/page-ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const ContactCard = ({
  contact,
  onEdit,
  onDelete,
}: ContactCardProps) => {
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
            {getInitials(contact.first_name, contact.last_name)}
          </div>
          <div>
            <h3 className="font-medium">
              {contact.first_name} {contact.last_name}
            </h3>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={() => onEdit()}
            className="h-8 w-8 p-0"
            text={<FontAwesomeIcon className="h-4 w-4" icon={faEdit} />}
          />
          <Button
            onClick={() => onDelete()}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
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
    </Card>
  );
};

export interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

// TODO: Configure method signatures
export interface ContactListProps {
  contacts: Contact[];
  onEdit: () => void;
  onDelete: () => void;
  onViewHistory?: () => void;
}

export interface ContactCardProps extends Omit<ContactListProps, "contacts"> {
  contact: Contact;
}

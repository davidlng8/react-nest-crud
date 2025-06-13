export interface ContactInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ContactHistory {
  data: unknown;
}

export interface ContactHistorySummary {
  when: Date;
  updatedFields: string[];
}

export interface Contact extends ContactInput {
  contactId?: string;
  createdAt?: string;
  updatedAt?: string;
  updateHistory?: unknown[];
}

// TODO: Configure method signatures
export interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
}

export interface ContactCardProps extends Omit<ContactListProps, "contacts"> {
  contact: Contact;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContactHistoryProps extends ModalProps {
  history: ContactHistorySummary[];
  contactName: string;
}

export interface ContactFormProps extends ModalProps {
  onSubmit: (contact: ContactInput) => Promise<void>;
  onDelete?: () => Promise<void>;
  contact?: Contact | null;
  isLoading?: boolean;
  deleteMode?: boolean;
}

export interface DeleteFormProps extends Omit<ContactFormProps, "onSubmit"> {
  onSubmit: (contactId: string) => Promise<void>;
}

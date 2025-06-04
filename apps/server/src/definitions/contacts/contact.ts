export interface IContact {
  contactId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContactHistory {
  contactHistoryId: string;
  contactId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  updatedAt: Date;
  contact?: IContact;
}

export interface IContactDiff {
  contactDiffId: string;
  contactHistoryId: string;
  field: string;
  oldValue: string;
  newValue: string;
  changedAt: Date;
  contactHistory?: IContactHistory;
}

export class UpdateContactDTO {
  // TODO: Setup class validation
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export class CreateContactDTO {
  firstName!: string;
  lastName!: string;
  email!: string;
  phone!: string;
}

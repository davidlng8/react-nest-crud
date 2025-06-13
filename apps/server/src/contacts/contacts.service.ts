import { Contact } from "@/entities/contact.entity";
import { ContactHistory } from "@/entities/contact-history.entity";
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateContactDTO, IContact } from "@/definitions/contacts/contact";
import { ContactDiff } from "@/entities/contact-diff.entity";

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contact: Repository<Contact>,
    @InjectRepository(ContactHistory)
    private changeLog: Repository<ContactHistory>,
    @InjectRepository(ContactDiff)
    private contactDiff: Repository<ContactDiff>
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contact.find();
  }

  async findOne(contactId: string): Promise<Contact | null> {
    return this.contact.findOneBy({ contactId });
  }

  async create(contact: CreateContactDTO): Promise<Contact> {
    return this.contact.save(contact);
  }

  async delete(contactId: string) {
    const contact = await this.findOne(contactId);
    if (!contact)
      throw new NotFoundException("Cannot delete contact that doesnt exist");
    const deleteResult = await this.contact.delete({ contactId });
    if (deleteResult?.affected !== 1)
      throw new InternalServerErrorException("Error deleting record");
  }

  async getUpdateHistory(contactId: string, page = 0) {
    // TODO: allow page size and offset to be handled by caller
    const limit = 10;
    const historyCount = await this.changeLog.count({ where: { contactId } });
    const history = await this.changeLog.find({
      where: { contactId },
      take: limit,
      skip: page * limit,
      order: {
        updatedAt: "desc",
      },
      select: {
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        updatedAt: true,
        contactHistoryId: true,
      },
      relations: {
        diffs: true,
      },
    });

    const prunedHistory = history.map((h) => ({
      ...h,
      diffs: h.diffs?.map(({ field, oldValue, newValue }) => ({
        field,
        oldValue,
        newValue,
      })),
    }));

    return {
      data: prunedHistory,
      pages: historyCount <= limit ? 1 : Math.ceil(historyCount / limit),
    };
  }

  async getUpdateSummary(contactId: string) {
    const history = await this.changeLog.find({
      where: { contactId },
      // TODO: Add pagination later
      take: 5,
      order: {
        updatedAt: "desc",
      },
      select: {
        updatedAt: true,
        contactHistoryId: true,
      },
      relations: {
        diffs: true,
      },
    });

    const summary = history.map((h) => ({
      when: h.updatedAt,
      updatedFields: h.diffs?.flatMap(({ field }) => [field]),
    }));

    return summary;
  }

  private async createDiff(
    initalContact: IContact,
    updates: Partial<IContact>,
    contactHistoryId: string,
    updateDate: Date
  ) {
    try {
      const diffs = Object.entries(updates).flatMap(([field, newValue]) => {
        const oldValue = initalContact[field as keyof IContact];
        if (newValue !== null && newValue !== oldValue) {
          return {
            contactHistoryId,
            field,
            oldValue: String(oldValue ?? ""),
            newValue: String(newValue ?? ""),
            updateDate,
          };
        }
        return [];
      });

      if (diffs.length > 0) {
        await this.contactDiff.save(diffs);
      }
    } catch (error) {
      console.error("Failed to generate contact diffs", error);
    }
  }

  async update(
    contactId: string,
    contact: Partial<IContact>
  ): Promise<Contact | null> {
    const existingContact = await this.contact.findOneBy({
      contactId,
    });
    if (!existingContact) {
      throw new NotFoundException("Contact not found");
    }
    try {
      const updateResult = await this.contact.update(contactId, contact);
      if (updateResult.affected !== 1) throw new Error();
    } catch (error) {
      throw new InternalServerErrorException("Failed to update contact");
    }

    const updatedRecord = await this.contact.findOneBy({
      contactId,
    });

    const history = {
      contactId,
      contact: { contactId } as IContact,
      firstName: existingContact.firstName,
      lastName: existingContact.lastName,
      email: existingContact.email,
      phone: existingContact.phone,
      changedAt: new Date(),
    };

    const savedHistory = await this.changeLog.save(history);
    this.createDiff(
      existingContact,
      contact,
      savedHistory.contactHistoryId,
      new Date()
    );
    return updatedRecord;
  }
}

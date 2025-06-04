// src/contacts/contact-history.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from "typeorm";
import { Contact } from "./contact.entity";
import { ContactDiff } from "./contact-diff.entity";

@Entity()
export class ContactHistory {
  @PrimaryGeneratedColumn("uuid")
  contactHistoryId!: string;

  @Column()
  @Index()
  contactId!: string;

  @ManyToOne(() => Contact, { onDelete: "CASCADE" })
  @JoinColumn({ name: "contactId" })
  contact?: Contact;

  @OneToMany(() => ContactDiff, (diff) => diff.contactHistory)
  diffs?: ContactDiff[];

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @CreateDateColumn()
  updatedAt!: Date;
}

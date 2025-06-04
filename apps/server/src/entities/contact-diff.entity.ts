import { Entity, Index, PrimaryGeneratedColumn } from "typeorm";

import { Column, CreateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { ContactHistory } from "./contact-history.entity";

@Entity()
export class ContactDiff {
  @PrimaryGeneratedColumn("uuid")
  contactDiffId!: string;

  @ManyToOne(() => ContactHistory, { onDelete: "CASCADE" })
  @JoinColumn({ name: "contactHistoryId" })
  contactHistory?: ContactHistory;

  @Column()
  @Index()
  contactHistoryId!: string;

  @Column()
  field!: string;

  @Column()
  oldValue!: string;

  @Column()
  newValue!: string;

  @CreateDateColumn()
  changedAt!: Date;
}

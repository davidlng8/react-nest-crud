import { Contact } from "@/entities/contact.entity";
import { ContactController } from "@/paths/contact.controller";
import { Module, OnModuleInit } from "@nestjs/common";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContactsService } from "./contacts.service";
import { ContactDiff } from "@/entities/contact-diff.entity";
import { ContactHistory } from "@/entities/contact-history.entity";
import { ContactsGateway } from "@/helpers/contacts.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Contact, ContactDiff, ContactHistory])],
  controllers: [ContactController],
  providers: [ContactsService, ContactsGateway],
  exports: [ContactsService],
})
export class ContactsModule implements OnModuleInit {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepo: Repository<Contact>
  ) {}

  async onModuleInit() {
    const count = await this.contactRepo.count();
    if (count === 0) {
      console.log("Seeding initial contacts...");
      await this.contactRepo.save([
        {
          firstName: "David",
          lastName: "Gardner",
          email: "david@gardner.com",
          phone: "6464809314",
        },
        {
          firstName: "Jenna",
          lastName: "Brown",
          email: "jb@example.com",
          phone: "6567827354",
        },
      ]);
    }
  }
}

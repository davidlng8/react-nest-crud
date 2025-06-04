import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contact } from "./entities/contact.entity";
import { ContactsModule } from "./contacts/contacts.module";
import { ContactHistory } from "./entities/contact-history.entity";
import { ContactDiff } from "./entities/contact-diff.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Contact, ContactHistory, ContactDiff],
      synchronize: true, // Disable for prod
    }),
    ContactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

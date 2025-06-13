import { ContactsService } from "@/contacts/contacts.service";
import { Public } from "@/decorators/public.decorator";
import {
  CreateContactDTO,
  UpdateContactDTO,
} from "@/definitions/contacts/contact";
import { objectIsSet } from "@/utils/data.util";
import {
  Body,
  Controller,
  Delete,
  Get,
  MethodNotAllowedException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("path/contact")
export class ContactController {
  constructor(private readonly contactsService: ContactsService) {}

  @Public()
  @Get("/")
  async getContacts() {
    return this.contactsService.findAll();
  }

  @Public()
  @Get("/:contactId")
  async getContact(@Param("contactId") conatactId: string) {
    return this.contactsService.findOne(conatactId);
  }

  @Public()
  @Get("/history/:contactId")
  async getContactUpdateHistory(
    @Param("contactId") conatactId: string,
    @Body() body: { page: number }
  ) {
    return this.contactsService.getUpdateHistory(conatactId, body.page);
  }

  @Public()
  @Get("/history-summary/:contactId")
  async getContactUpdateSummary(@Param("contactId") conatactId: string) {
    return this.contactsService.getUpdateSummary(conatactId);
  }

  @Public()
  @Patch("/:contactId")
  async updateContact(
    @Param("contactId") contactId: string,
    @Body() body: UpdateContactDTO
  ) {
    if (!objectIsSet(body))
      throw new MethodNotAllowedException(
        "Did you mean to delete the contact?"
      );
    return this.contactsService.update(contactId, body);
  }

  @Public()
  @Delete("/:contactId")
  async deleteContact(@Param("contactId") contactId: string) {
    await this.contactsService.delete(contactId);
  }

  @Public()
  @Post("/")
  async createContact(@Body() body: CreateContactDTO) {
    if (!objectIsSet(body))
      throw new MethodNotAllowedException("Cannot create an empty contact");
    const [createdContact] = await Promise.all([
      this.contactsService.create(body),
      // Concurrently run timer with create method and wait up to 20 seconds
      // TODO: uncomment for submission
      //new Promise((resolve) => setTimeout(resolve, 20000)),
    ]);
    return createdContact;
  }
}

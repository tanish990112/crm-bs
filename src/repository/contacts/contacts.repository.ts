import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { Contact, Prisma } from '@prisma/client';

@Injectable()
export class ContactRepository {
  constructor(private prisma: DbService) {}

  async findContacts(query: Prisma.ContactFindManyArgs): Promise<Contact[]> {
    try {
      const contactData = await this.prisma.contact.findMany({
        ...query,
      });
      return contactData;
    } catch (error) {
      throw error;
    }
  }

  async findUniqueBy(query: Prisma.ContactFindUniqueArgs): Promise<Contact> {
    try {
      const leadDetails = await this.prisma.contact.findUnique({
        ...query,
      });
      return leadDetails;
    } catch (error) {
      throw error;
    }
  }

  async findFirstBy(query: Prisma.ContactFindFirstArgs): Promise<Contact> {
    try {
      const contactInfo = await this.prisma.contact.findFirst({ ...query });
      return contactInfo;
    } catch (error) {
      throw error;
    }
  }
}

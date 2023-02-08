import { CreateContactDto } from 'dto/contact/contact.dto';

export class CreateLeadDto {
  leadId: string;
  leadSourcer: string;
  linkedinUrl: string;
  employeeRatio: number;
  leadSource: string;
  employeeCount: number;
  company: string;
  website: string;
  industry: string;
  leadStatus: string;
  hourlyRate: number;
  country: string;
  annualRevenue: number;
  vendorManagement: string;
  contact: CreateContactDto;
}

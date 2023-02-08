export class CreateContactDto {
  create: ListContactDto;
}

export class ListContactDto {
  contactFirstName: string;
  contactLastName: string;
  title: string;
  phone: string;
  email: string;
  skypeId: string;
}

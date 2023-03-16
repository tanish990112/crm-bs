import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LeadUpdateObject = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let body = request?.body;
    const { leadData, contactInfo } = body;
    const updateLead = {
      ...leadData,
      contact: { update: { where: { id: contactInfo.id }, data: contactInfo } },
    };
    body = updateLead;
    return body;
  },
);

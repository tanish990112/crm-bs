import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export const LeadChangeObject = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let body = request?.body;
    body.leadData.leadId = uuidv4();
    const { leadData, contactInfo } = body;

    const leadInfo = {
      ...leadData,
      contact: {
        create: { ...contactInfo },
      },
    };
    body = leadInfo;
    console.log(body.leadInfo, '---------------->');
    return body;
  },
);

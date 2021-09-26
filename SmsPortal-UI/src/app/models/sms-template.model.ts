export interface SmsTemplate {
  author: string;
  applicationUserId: number;
  title: string;
  text: string;
  isActive: boolean;
  smsTemplateId: number;
  dateCreated?: Date;
}
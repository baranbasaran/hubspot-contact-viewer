import { z } from 'zod';

export const CompanyPropertiesSchema = z.object({
  name: z.string(),
  domain: z.string().optional(),
  description: z.string().optional(),
  industry: z.string().optional(),
  website: z.string().url().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  createdate: z.string().optional(),
  lastmodifieddate: z.string().optional(),
});

export type CompanyProperties = z.infer<typeof CompanyPropertiesSchema>;

export const CompanySchema = z.object({
  id: z.string(),
  properties: CompanyPropertiesSchema
});

export type Company = z.infer<typeof CompanySchema>;

export const HubSpotCompanySchema = z.object({
  id: z.string(),
  properties: CompanyPropertiesSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  archived: z.boolean().optional()
});

export type HubSpotCompanyResponse = z.infer<typeof HubSpotCompanySchema>;

export interface CompanyResponse {
  results: HubSpotCompanyResponse[];
  paging?: {
    next?: {
      after: string;
    };
  };
} 
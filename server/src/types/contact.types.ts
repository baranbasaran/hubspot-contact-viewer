import { z } from "zod";

// Base contact schema
export const ContactSchema = z.object({
  id: z.string(),
  properties: z.object({
    firstname: z.string().nullable().optional(),
    lastname: z.string().nullable().optional(),
    email: z.string().email(),
    phone: z.string().nullable().optional(),
    city: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    hs_full_name_or_email: z.string().nullable().optional(),
    industry: z.string().nullable().optional(),
    jobtitle: z.string().nullable().optional(),
    company: z.string().nullable().optional(),
    website: z.string().nullable().optional(),
    state: z.string().nullable().optional(),
    country: z.string().nullable().optional(),
    lifecyclestage: z.string().nullable().optional(),
    hs_lead_status: z.string().nullable().optional(),
    createdate: z.string().nullable().optional(),
    lastmodifieddate: z.string().nullable().optional(),
    hs_object_id: z.string().nullable().optional(),
  }),
  createdAt: z.string().nullable().optional(),
  updatedAt: z.string().nullable().optional(),
  archived: z.boolean().nullable().optional(),
});

// Type generated from the schema
export type Contact = z.infer<typeof ContactSchema>;

// HubSpot API response schema
export const HubSpotContactSchema = ContactSchema;
export type HubSpotContact = Contact;

// HubSpot API response schema
export const HubSpotApiResponseSchema = z.object({
  results: z.array(HubSpotContactSchema),
  total: z.number().optional(),
  paging: z
    .object({
      next: z
        .object({
          after: z.string(),
        })
        .optional(),
    })
    .optional(),
  status: z.string().optional(),
  message: z.string().optional(),
});

export type HubSpotApiResponse = z.infer<typeof HubSpotApiResponseSchema>;

// Contact properties interface for create/update operations
export interface ContactProperties {
  email: string;
  phone?: string;
  city?: string;
  address?: string;
  hs_full_name_or_email?: string;
  industry?: string;
  jobtitle?: string;
  createdate?: string;
  lastmodifieddate?: string;
  hs_object_id?: string;
}

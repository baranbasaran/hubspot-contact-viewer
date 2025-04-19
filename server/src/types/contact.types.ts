import { z } from 'zod'

// Base contact schema that strictly follows project requirements
export const ContactSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  jobtitle: z.string().optional(),
  website: z.string().url().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  lifecyclestage: z.string().optional(),
  createdate: z.string().optional(),
  lastmodifieddate: z.string().optional(),
})

// Type generated from the schema
export type Contact = z.infer<typeof ContactSchema>

// HubSpot API response schema
export const HubSpotContactSchema = z.object({
  id: z.string(),
  properties: z.object({
    email: z.string().email(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    phone: z.string().optional(),
    company: z.string().optional(),
    jobtitle: z.string().optional(),
    website: z.string().url().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    lifecyclestage: z.string().optional(),
    createdate: z.string().optional(),
    lastmodifieddate: z.string().optional(),
  })
})

export type HubSpotContact = z.infer<typeof HubSpotContactSchema>

// HubSpot API response type
export interface HubSpotApiResponse {
  results: HubSpotContact[]
  paging?: {
    next?: {
      after: string
      link: string
    }
  }
}

// API response wrapper schema
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any(),
  timestamp: z.string().optional(),
})

export type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  timestamp?: string;
}

// Error response schema
export const ErrorResponseSchema = z.object({
  success: z.boolean(),
  error: z.string(),
  timestamp: z.string().optional(),
})

export type ErrorResponse = {
  success: boolean;
  error: string;
  timestamp?: string;
} 
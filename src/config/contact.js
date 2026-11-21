const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()
const configuredEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim()

export const FORMSPREE_ENDPOINT = configuredEndpoint
  || (formId ? `https://formspree.io/f/${formId}` : '')

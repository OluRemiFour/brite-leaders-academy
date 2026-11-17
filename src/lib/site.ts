/**
 * Central site configuration.
 * Update the values marked TODO with the school's real details.
 */

// TODO: Add the WhatsApp number in international format, digits only (no "+", spaces or dashes).
// Example for Nigeria: "2348012345678". It can also be set with NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const WHATSAPP_ENQUIRY_MESSAGE = `Hello Brite Leaders Academy,

I would like to make an enquiry about admission for my child.

Please provide information about:
- Available classes
- Admission requirements
- Application process
- Admission fees

Thank you.`;

/** Builds the wa.me link that opens a chat with the enquiry message pre-filled. */
export function whatsappEnquiryUrl(message: string = WHATSAPP_ENQUIRY_MESSAGE) {
  const text = encodeURIComponent(message);
  // Without a number, wa.me lets the user pick a contact, so the link still works during setup.
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

export const SCHOOL = {
  name: "Brite Leaders Academy",
  shortName: "Brite Leaders",
  tagline: "Where Young Minds Learn, Grow & Lead.",
  receiptTagline: "The school for the child you love...",
  address: "12 Independence Avenue, GRA, Ilorin, Kwara State, Nigeria",
  addressLines: ["12 Independence Avenue,", "GRA, Ilorin, Kwara State, Nigeria"],
  phones: ["+234 800 000 0000", "+234 801 000 0000"],
  socials: {
    instagram: "#", // TODO: Instagram URL
    tiktok: "#", // TODO: TikTok URL
    facebook: "#", // TODO: Facebook URL
  },
};

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Admission", href: "/#admission" },
  { label: "Events", href: "/#events" },
  { label: "Payment", href: "/payment" },
];

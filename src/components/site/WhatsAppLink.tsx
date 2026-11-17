import type { AnchorHTMLAttributes, ReactNode } from "react";
import { whatsappEnquiryUrl } from "@/lib/site";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
  children: ReactNode;
};

/** Opens a WhatsApp chat with the admission enquiry message pre-filled. */
export function WhatsAppLink({ children, ...rest }: Props) {
  return (
    <a href={whatsappEnquiryUrl()} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

import { getTickets } from "@/lib/queries/getTicket";
import { getCustomer } from "@/lib/queries/getCustomer";
import BackButton from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs"

export default async function TicketFormPage({
    searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    try {
        const { ticketId, customerId } = await searchParams;
        // Edit ticket form
        if (!ticketId && !customerId) {
            return (
                <>
                    <h2 className="text-2xl mb-2"> Ticket ID or CustomerId is required to load form </h2>
                    <BackButton title="Go Back" variant="default" />
                </>
            );
            // TODO: Add ticket form component here
        }
        // TODO: Add new ticket form component here
        if (customerId) {
            const customer = await getCustomer(parseInt(customerId!));
            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2"> Customer ID #{customerId} not found </h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                );
            }
            if (!customer.active) {
                return (
                    <>
                        <h2 className="text-2xl mb-2"> Customer ID #{customerId} is not active </h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                );
            }
            // return customer form
            console.log(customer);
        }
        // Edit ticket form
        if (ticketId) {
            const ticket = await getTickets(parseInt(ticketId!));
            if (!ticket) {
                return (
                    <>
                        <h2 className="text-2xl mb-2"> Ticket ID #{ticketId} not found </h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                );
            }
            const customer = await getCustomer(ticket.customer_id);
            // return ticket form
            console.log('ticket:', ticket);
            console.log('customer:', customer);
        }
    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e);
            throw e;
        }
    }
}
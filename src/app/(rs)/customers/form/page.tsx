import { getCustomer } from "@/lib/queries/getCustomer";
import BackButton from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs"

export default async function CustomerFormPage({
    searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    try {
        const { customerId, ticketId } = await searchParams;
        const customer = await getCustomer(parseInt(customerId!));
        // Edit customer form
        if (customerId) {
            if (!customer) {
                return (
                    <>
                        <h2 className="text-2xl mb-2"> Customer ID #{customerId} not found </h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                );
                // TODO: Add customer form component here
            }
            console.log(customer);
        } else {
            // TODO: Add new customer form component here
        }
    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e);
            throw e;
        }
    }
}
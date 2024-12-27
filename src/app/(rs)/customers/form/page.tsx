import { getCustomer } from "@/lib/queries/getCustomer";
import BackButton from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs"
import CustomerForm from "@/app/(rs)/customers/form/customerForm";

export default async function CustomerFormPage({
    searchParams,
}: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
    try {
        const { customerId } = await searchParams;
        // Edit customer form
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
            // TODO: Add edit customer form component here
            return <CustomerForm customer={customer} />;
        } else {
            // TODO: Add new customer form component here
            return <CustomerForm />;
        }
    } catch (e) {
        if (e instanceof Error) {
            Sentry.captureException(e);
            throw e;
        }
    }
}
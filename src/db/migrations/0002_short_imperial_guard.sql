ALTER TABLE "customers" ADD CONSTRAINT "customers_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_phone_unique" UNIQUE("phone");
import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, CreditCard, UploadCloud, Users, ArrowRight } from "lucide-react";
import logoUrl from "@/assets/neomora-logo.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/portal-options")({
  component: PortalOptionsPage,
});

const options = [
  {
    title: "Registration Form",
    description: "New participant registration and enrollment",
    icon: ClipboardList,
    link: "registration-form", // Placeholder
  },
  {
    title: "Fee Payment",
    description: "Pay academy fees and view invoices",
    icon: CreditCard,
    link: "#", // Placeholder
  },
  {
    title: "Submit Documents",
    description: "Upload required documents and forms",
    icon: UploadCloud,
    link: "documents", // Placeholder
  },
  {
    title: "Guardian Portal",
    description: "Access dashboard for parents and guardians",
    icon: Users,
    link: "#", // Placeholder
  },
];

function PortalOptionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 bg-sidebar">
        <div className="mx-auto flex justify-center max-w-5xl items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="Neomora" className="h-9 w-auto bg-white rounded-md" />
            {/* <span className="text-sm font-semibold text-foreground text-white">Club Manager</span> */}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center py-16 px-6 sm:py-24 bg-sidebar">
        <div className="w-full max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Welcome</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl text-white">
            Select an Option
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground text-white">
            Please choose one of the following services to continue.
          </p>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-5xl gap-6 sm:grid-cols-2">
          {options.map((opt) => (
            <div
              key={opt.title}
              className="group relative flex flex-col items-start justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:border-brand hover:shadow-md"
            >
              <div className="flex w-full items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <opt.icon className="h-6 w-6" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold">{opt.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{opt.description}</p>
              </div>
              {/* Optional: Add a subtle absolute link overlay */}
              <a href={opt.link} className="absolute inset-0 rounded-xl" aria-label={opt.title} />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card py-6 text-center text-sm text-muted-foreground bg-sidebar">
        <p className="text-white">© {new Date().getFullYear()} Neomora. All rights reserved.</p>
      </footer>
    </div>
  );
}

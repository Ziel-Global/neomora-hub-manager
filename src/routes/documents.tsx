import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, UploadCloud, ArrowLeft } from "lucide-react";
import logoUrl from "@/assets/neomora-logo.png";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/documents")({
  component: DocumentsPage,
});

function DocumentsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-sidebar px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/portal-options" className="flex items-center gap-2 text-white hover:text-white/80">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <img src={logoUrl} alt="Neomora" className="h-9 w-auto bg-white rounded-md" />
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center py-12 px-4 sm:px-6 bg-sidebar">
        <div className="w-full max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white">Submit Documents</h1>
            <p className="mt-1 text-sm text-white">
              Please upload the required documents below.
            </p>
          </div>

          <div className="space-y-6">
            {/* ID Copy */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">ID Copy</h3>
                  <p className="text-sm text-muted-foreground">Required document</p>
                </div>
              </div>
              <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-emerald-500/50 bg-emerald-50/50 p-8 transition-colors hover:bg-emerald-50">
                <UploadCloud className="mb-2 h-8 w-8 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Upload Files</span>
                <span className="text-xs text-muted-foreground mt-1">(docx, pdf, etc)</span>
              </div>
            </div>

            {/* Medical Form */}
            <div className="rounded-xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold">Medical Form</h3>
                  <p className="text-sm text-muted-foreground">Required document</p>
                </div>
              </div>
              <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-emerald-500/50 bg-emerald-50/50 p-8 transition-colors hover:bg-emerald-50">
                <UploadCloud className="mb-2 h-8 w-8 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Upload Files</span>
                <span className="text-xs text-muted-foreground mt-1">(docx, pdf, etc)</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button size="lg">Submit All Documents</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

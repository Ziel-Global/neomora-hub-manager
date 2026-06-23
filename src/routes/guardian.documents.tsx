import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, FileText, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { mockParticipants } from "@/data/mockParticipants";
import { GUARDIAN_CHILD_IDS } from "@/data/guardianContext";

export const Route = createFileRoute("/guardian/documents")({
  component: GuardianDocuments,
});

function GuardianDocuments() {
  const [selectedFiles, setSelectedFiles] = useState<Record<string, File>>({});
  const children = mockParticipants.filter((p) => GUARDIAN_CHILD_IDS.includes(p.id));
  const anyMissing = children.some((c) => c.documents.some((d) => d.status === "Missing"));

  const docBadge = (s: string) =>
    s === "Uploaded" ? "Approved" : s === "Missing" ? "Overdue" : "Pending";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
        <p className="mt-1 text-muted-foreground">View document status for each of your children.</p>
      </div>

      {anyMissing && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-900">
            Some documents are missing. Please click the Upload button to provide them.
          </p>
        </div>
      )}

      <div className="rounded-2xl border bg-white p-2 shadow-sm">
        <Accordion type="multiple" defaultValue={children.map((c) => c.id)} className="w-full">
          {children.map((child) => {
            const missingCount = child.documents.filter((d) => d.status === "Missing").length;
            return (
              <AccordionItem key={child.id} value={child.id} className="border-b last:border-b-0">
                <AccordionTrigger className="px-4 hover:no-underline">
                  <div className="flex flex-1 items-center justify-between pr-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar text-sm font-semibold text-white">
                        {child.fullName.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{child.fullName}</p>
                        <p className="text-xs text-muted-foreground">{child.documents.length} documents</p>
                      </div>
                    </div>
                    {missingCount > 0 && (
                      <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                        {missingCount} missing
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  {child.documents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No documents on file.</p>
                  ) : (
                    <ul className="divide-y rounded-md border">
                      {child.documents.map((d) => (
                        <li key={d.name} className="flex flex-col px-4 py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{d.name}</p>
                                <p className="text-xs text-muted-foreground">Required document</p>
                              </div>
                            </div>
                            <StatusBadge status={docBadge(d.status)} />
                          </div>

                          {d.status === "Missing" && (() => {
                            const fileKey = `${child.id}-${d.name.replace(/\s/g, '')}`;
                            const selectedFile = selectedFiles[fileKey];

                            return (
                              <div className="mt-4">
                                {selectedFile ? (
                                  <div className="flex items-center justify-between rounded-xl border p-4 bg-emerald-50/30">
                                    <div className="flex items-center gap-3">
                                      <FileText className="h-5 w-5 text-emerald-600" />
                                      <div className="text-left">
                                        <p className="text-sm font-medium">{selectedFile.name}</p>
                                        <p className="text-xs text-muted-foreground">Ready to upload</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedFiles(prev => { const next = { ...prev }; delete next[fileKey]; return next; })}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="sm"
                                        onClick={() => {
                                          toast.success(`${d.name} uploaded successfully and sent to admin for review!`);
                                          setSelectedFiles(prev => { const next = { ...prev }; delete next[fileKey]; return next; });
                                        }}
                                      >
                                        Upload
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <input
                                      type="file"
                                      id={`upload-${fileKey}`}
                                      className="hidden"
                                      onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                          setSelectedFiles(prev => ({ ...prev, [fileKey]: e.target.files![0] }));
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`upload-${fileKey}`}
                                      className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-emerald-400 bg-emerald-50/50 py-6 text-center hover:bg-emerald-50 transition-colors"
                                    >
                                      <p className="text-sm text-muted-foreground">
                                        <span className="font-semibold text-emerald-600">Upload Files</span>
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        (docx, pdf, etc)
                                      </p>
                                    </label>
                                  </>
                                )}
                              </div>
                            );
                          })()}
                        </li>
                      ))}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}

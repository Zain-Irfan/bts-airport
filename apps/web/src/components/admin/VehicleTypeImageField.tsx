"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  onNotify?: (msg: { type: "ok" | "err"; text: string }) => void;
};

export function VehicleTypeImageField({ imageUrl, onImageUrlChange, onNotify }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [inlineNote, setInlineNote] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await fetch("/api/admin/vehicle-types/upload", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok) {
        const t = data.error || "Upload failed";
        setInlineNote({ type: "err", text: t });
        onNotify?.({ type: "err", text: t });
        return;
      }
      if (data.url) {
        onImageUrlChange(data.url);
        setInlineNote({ type: "ok", text: "Image uploaded" });
        onNotify?.({ type: "ok", text: "Image uploaded" });
      }
    } catch {
      const t = "Upload failed (network)";
      setInlineNote({ type: "err", text: t });
      onNotify?.({ type: "err", text: t });
    } finally {
      setUploading(false);
    }
  }

  useEffect(() => {
    if (!inlineNote) return;
    const t = setTimeout(() => setInlineNote(null), 5000);
    return () => clearTimeout(t);
  }, [inlineNote]);

  return (
    <div className="space-y-3">
      {imageUrl ? (
        <div className="flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- dynamic admin URLs */}
          <img
            src={imageUrl}
            alt=""
            className="h-24 w-40 rounded-md border border-[rgba(192,192,192,0.12)] object-cover"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            disabled={uploading}
            onClick={() => onImageUrlChange("")}
          >
            Clear image
          </Button>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          disabled={uploading}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) await uploadFile(file);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          className="gap-2"
          onClick={() => fileRef.current?.click()}
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Choose image
            </>
          )}
        </Button>
        <span className="text-[11px] text-[#A5A7AA]">JPEG, PNG, WebP, GIF · max 5MB</span>
      </div>

      {inlineNote ? (
        <p
          className={`text-xs ${inlineNote.type === "ok" ? "text-emerald-400" : "text-red-400"}`}
          role="status"
        >
          {inlineNote.text}
        </p>
      ) : null}
    </div>
  );
}

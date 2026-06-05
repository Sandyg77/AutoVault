"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const MESSAGES: Record<string, { message: string; type: "success" | "error" }> = {
  created: { message: "Vehicle added to inventory", type: "success" },
  updated: { message: "Vehicle updated successfully", type: "success" },
  deleted: { message: "Vehicle deleted", type: "success" },
};

export function ToastListener() {
  const params = useSearchParams();
  const router = useRouter();
  const key = params.get("toast");
  // Track the last key we already toasted so re-renders from router updates
  // don't fire the same toast a second time.
  const shownRef = useRef<string | null>(null);

  useEffect(() => {
    if (!key || shownRef.current === key) return;
    shownRef.current = key;
    const entry = MESSAGES[key];
    if (entry) {
      if (entry.type === "success") toast.success(entry.message);
      else toast.error(entry.message);
    }
    const url = new URL(window.location.href);
    url.searchParams.delete("toast");
    router.replace(url.pathname + url.search, { scroll: false });
  }, [key, router]);

  return null;
}

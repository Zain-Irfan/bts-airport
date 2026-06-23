"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

function isLocalBrowserHost(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname.toLowerCase();
  return h === "localhost" || h === "127.0.0.1" || /^\d{1,3}(\.\d{1,3}){3}$/.test(h);
}

export function LocalhostPaymentNotice() {
  const [show, setShow] = useState(false);
  const [redirectBase, setRedirectBase] = useState<string | null>(null);
  const [revolutOk, setRevolutOk] = useState(false);

  useEffect(() => {
    if (!isLocalBrowserHost()) return;
    setShow(true);

    fetch("/api/payments/revolut/config")
      .then((r) => r.json())
      .then((d: { redirectBase?: string | null; revolutKeyConfigured?: boolean; redirectOk?: boolean }) => {
        setRedirectBase(d.redirectBase ?? null);
        setRevolutOk(Boolean(d.revolutKeyConfigured && d.redirectOk));
      })
      .catch(() => setRevolutOk(false));
  }, []);

  if (!show) return null;

  return (
    <div
      className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
        revolutOk
          ? "border-sky-200 bg-sky-50 text-sky-900"
          : "border-amber-200 bg-amber-50 text-amber-900"
      }`}
    >
      <div className="flex gap-2">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="space-y-2 text-left">
          <p className="font-semibold">Developing on localhost</p>
          {revolutOk ? (
            <p>
              You can stay on <strong>localhost:3000</strong> in the browser. Payments use return URL:{" "}
              <strong>{redirectBase}</strong> (from your <code className="text-xs">.env.local</code>).
              After paying on Revolut you will be sent to that URL — make sure it reaches this app (ngrok or
              Laragon vhost).
            </p>
          ) : (
            <>
              <p>
                Revolut cannot redirect to <strong>localhost</strong>. Add one of these to{" "}
                <code className="text-xs">.env.local</code> and restart <code className="text-xs">npm run dev</code>:
              </p>
              <ol className="list-decimal space-y-1 pl-4 text-xs">
                <li>
                  <strong>ngrok (best for localhost:3000):</strong> run{" "}
                  <code className="rounded bg-white/80 px-1">ngrok http 3000</code>, then{" "}
                  <code className="rounded bg-white/80 px-1">
                    REVOLUT_REDIRECT_BASE_URL=https://YOUR-ID.ngrok-free.app
                  </code>
                </li>
                <li>
                  <strong>Laragon:</strong> open <code className="rounded bg-white/80 px-1">http://BTS.test:3000</code>{" "}
                  and set{" "}
                  <code className="rounded bg-white/80 px-1">NEXT_PUBLIC_APP_URL=http://BTS.test:3000</code> (or
                  enable Apache proxy via the repo <code className="text-xs">.htaccess</code> for port 80).
                </li>
              </ol>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

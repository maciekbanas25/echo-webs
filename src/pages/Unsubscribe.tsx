import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/unsubscribe`;

/** Opt-out link from outreach emails. Records it on load; no confirmation step. */
export default function Unsubscribe() {
  const { token = "" } = useParams();
  const [state, setState] = useState<"working" | "done" | "error">("working");

  useEffect(() => {
    const prev = document.title;
    document.title = "Unsubscribed | EchoWebs";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.title = prev;
      meta.remove();
    };
  }, []);

  useEffect(() => {
    if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) {
      setState("error");
      return;
    }
    fetch(FN, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string },
      body: JSON.stringify({ token }),
    })
      .then((r) => setState(r.ok ? "done" : "error"))
      .catch(() => setState("error"));
  }, [token]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="max-w-md text-center">
        {state === "working" && <p className="text-muted-foreground">Unsubscribing…</p>}
        {state === "done" && (
          <>
            <h1 className="font-clash text-3xl font-semibold">You're unsubscribed</h1>
            <p className="mt-4 text-muted-foreground">EchoWebs won't email you again. Sorry for the interruption.</p>
          </>
        )}
        {state === "error" && (
          <>
            <h1 className="font-clash text-3xl font-semibold">That link didn't work</h1>
            <p className="mt-4 text-muted-foreground">
              Reply to the email with “unsubscribe”, or email{" "}
              <a className="underline" href="mailto:contact@echowebs.co.uk?subject=Unsubscribe">
                contact@echowebs.co.uk
              </a>
              , and you won't hear from me again.
            </p>
          </>
        )}
      </div>
    </main>
  );
}

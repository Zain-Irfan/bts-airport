import type { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Drive With Us",
  description:
    "Join MRM Executive Voyage as a licensed driver. Apply online for regular airport transfer and chauffeur work across London.",
};

export default function DriveWithUsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

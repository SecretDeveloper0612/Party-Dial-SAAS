import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Venue Registration | PartyDial Partner',
  description: 'Register your venue on PartyDial and start receiving high-quality event leads today.',
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

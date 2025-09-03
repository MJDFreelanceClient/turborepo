import {SignedIn, SignedOut, SignIn} from "@clerk/nextjs";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <>
            <SignedIn>
                {children}
            </SignedIn>
            <SignedOut>
                Please sign in
            </SignedOut>
        </>
  );
}

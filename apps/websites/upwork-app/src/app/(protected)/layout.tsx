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
                <SignIn routing="hash" />
            </SignedOut>
        </>
  );
}

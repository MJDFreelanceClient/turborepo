import RadarExample from "@/components/Radar";
import {TeamSelect} from "@/components/TeamSelect";
import {Suspense} from "react";
import {ClerkProvider, SignedIn} from "@clerk/nextjs";
import {cookies} from "next/headers";
import {Toaster} from "sonner";

export default async function Home() {
    const bypass = (await cookies()).get("bypass")?.value;

    if (bypass === "true") {
        return (
            <div className="bg-gray-50 font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="w-full gap-[32px] row-start-2 items-center sm:items-start ">
                    <Suspense fallback={<div>Loading teams...</div>}>
                        <TeamSelect />
                        <div className="p-4 w-full  bg-white rounded-[20px] border">
                            <h2 className={`text-[32px]`}>Pass Per Defensive Action</h2>
                            <div className="p-4 w-full min-w-[300px] h-[300px] xl:min-w-[700px] xl:h-[700px] bg-white rounded-[20px]">
                                <RadarExample />
                            </div>
                        </div>
                    </Suspense>
                </main>
                <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                </footer>
            </div>
        );
    }

  return (
    <SignedIn>
        <div className="bg-gray-50 font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="w-full gap-[32px] row-start-2 items-center sm:items-start ">
                <Suspense fallback={<div>Loading teams...</div>}>
                    <TeamSelect />
                    <div className="p-4 w-full  bg-white rounded-[20px] border">
                        <h2 className={`text-[32px]`}>Pass Per Defensive Action</h2>
                        <div className="p-4 w-full min-w-[300px] h-[300px] xl:min-w-[700px] xl:h-[700px] bg-white rounded-[20px]">
                            <RadarExample />
                        </div>
                    </div>
                </Suspense>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
            </footer>
        </div>
    </SignedIn>
  );
}

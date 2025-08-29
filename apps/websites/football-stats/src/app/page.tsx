import RadarExample from "@/components/Radar";
import {TeamSelect} from "@/components/TeamSelect";

export default function Home() {
  return (
    <div className="bg-gray-50 font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="w-full gap-[32px] row-start-2 items-center sm:items-start ">
          <TeamSelect />
          <div className="p-4 w-full min-w-[300px] h-[300px] xl:min-w-[700px] xl:h-[700px] bg-white rounded-[20px] border">
              <RadarExample />
          </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}

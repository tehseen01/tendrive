import { Button } from "@/components/ui/button";
import Link from "next/link";

function Home() {
  return (
    <>
      <main className="xl:px-20 lg:px-8 px-4 sm:h-[calc(100vh_-_80px)] h-[calc(100dvh_-_80px)] flex items-center justify-center">
        <div className="grid md:gap-4 gap-8 md:grid-cols-[58%_40%]">
          <p className="xl:text-8xl md:text-7xl text-5xl font-bold text-center">
            <span className="">TenDrive</span> Easy and secure access to your
            content <span className="text-primary/60">_</span>
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-xl text-center">
              Store, share, and collaborate on files and folders from your
              mobile device, tablet, or computer
            </p>
            <div className="flex flex-col gap-4 w-full">
              <Button asChild variant={"outline"}>
                <Link href={"/login"}>Log In</Link>
              </Button>
              <Button asChild>
                <Link href={"/signup"}>Create account</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;

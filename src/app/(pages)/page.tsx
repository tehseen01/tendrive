import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="md:px-6 px-4 border-b">
        <nav className="flex justify-between items-center py-4">
          <div>
            <span className="text-2xl font-bold">Ten</span>
            <span className="text-2xl">Drive</span>
          </div>
          <div className="flex gap-4">
            <Button asChild variant={"outline"}>
              <Link href={"/signup"}>Sign up</Link>
            </Button>
            <Button asChild>
              <Link href={"/login"}>Get start</Link>
            </Button>
          </div>
        </nav>
      </header>
      <main className="xl:px-20 lg:px-8 px-4 sm:h-[calc(100vh_-_80px)] h-[calc(100dvh_-_80px)] flex items-center justify-center">
        <div className="grid md:gap-4 gap-8 md:grid-cols-[60%_40%]">
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

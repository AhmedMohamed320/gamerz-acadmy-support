import Link from "next/link";

export default function Home() {
    return (
        <main>
            <header className=" relative z-10 overflow-hidden h-screen">
                <img src="/Sayjn.gif" alt="" className="headerImg" />
                <div className="flex justify-center items-center  z-10 mainContainer uppderHero h-full">
                    <div className="col-span-2 flex justify-center items-center flex-col gap-12 text-center max-w-full md:max-w-6xl">
                        <p className="text-8xl font-bold leading-normal wordSpace">
                            مرحبًا بكم في تجربة الدعم المتميزة!
                        </p>
                        <p className="text-4xl text-neutral-500">
                        جاهزين نساعدك تحل مشكلتك بخطوات بسيطة وسهلة!
                        </p>
                        <Link href="/questionsTree">
                         <p className="text-3xl">
                            ابدا
                         </p>
                        </Link>
                    </div>
                </div>
            </header>
        </main>
    );
}

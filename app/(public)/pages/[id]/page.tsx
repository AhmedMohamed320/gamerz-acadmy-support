import prisma from "@/lib/prisma";

type PageProps = { params: { id: string } };

const Page = async ({ params: { id } }: PageProps) => {
  const page = await prisma.page.findUnique({
    where: { id },
  });

  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">Page not found</h1>
      </div>
    );
  }
  return (
    <div className="p-5 flex text-center items-center flex-col gap-8 mt-40 overflow-y-auto h-screen">
      <h1 className="text-4xl mb-5 font-bold w-11/12">{page.title}</h1>
      <div
        className="prose flex flex-col gap-8 max-w-6xl p-10"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
};

export default Page;

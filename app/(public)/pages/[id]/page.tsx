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
    <div className="p-5">
      <h1 className="text-2xl mb-5 font-semibold">{page.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
};

export default Page;

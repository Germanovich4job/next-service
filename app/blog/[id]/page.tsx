import prisma from "@/lib/db";
import { string } from "better-auth";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: slug } = await params;

  const post = prisma.blogPost.findUnique({
    where: {
      slug,
    },
  });

  return (
    <div>
      <h1>Детализация</h1>
      <div> {slug}</div>
    </div>
  );
};

export default Page;

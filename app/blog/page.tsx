import prisma from "@/lib/db";
import { Card } from "@mui/material";
import Link from "next/link";

const Page = async () => {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Посты</h1>
        {posts.map((item) => (
          <Card key={item.id} className="hover:bg-gray-100 transition-colors">
            <Link href={`/blog/${item.slug}`}>
              <h3>{item.title}</h3>
            </Link>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default Page;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: slug } = await params;

  return (
    <div>
      <h1>Детализация</h1>
      <div> {slug}</div>
    </div>
  );
};

export default Page;

export async function POST(request: Request) {
  const { email, ref } = await request.json();
  if (typeof email !== "string" || !email.includes("@")) {
    return Response.json({ ok: false }, { status: 400 });
  }
  console.log(
    JSON.stringify({ event: "signup", email, ref, at: new Date().toISOString() }),
  );
  return Response.json({ ok: true });
}

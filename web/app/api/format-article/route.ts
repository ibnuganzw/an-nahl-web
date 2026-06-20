import Anthropic from "@anthropic-ai/sdk";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `Kamu adalah editor naskah untuk situs LDF An-Nahl (organisasi dakwah kampus, berbahasa Indonesia). Tugasmu MERAPIKAN naskah artikel menjadi Markdown yang bersih dan terstruktur, TANPA mengubah makna atau menambah informasi baru.

Aturan:
- Keluarkan HANYA Markdown hasil rapian. Jangan menambahkan komentar, sapaan, atau penjelasan apa pun di luar isi artikel.
- Susun struktur: gunakan "## " untuk sub-judul utama dan "### " untuk sub-bagian bila sesuai. JANGAN membuat judul level 1 (#) — judul artikel diatur terpisah.
- Rapikan paragraf, perbaiki ejaan dan tanda baca ringan, gunakan **tebal** dan *miring* seperlunya, ubah daftar menjadi bullet ("- ") atau bernomor bila memang berupa daftar, dan jadikan kutipan sebagai blockquote ("> ").
- PERTAHANKAN setiap gambar persis apa adanya dalam format ![caption](url). Jangan mengubah URL gambar. Letakkan gambar pada posisi yang wajar dalam alur teks.
- Jangan mengarang isi, jangan menambah kesimpulan atau opini baru, dan jangan menghapus substansi. Pertahankan bahasa dan gaya penulis.
- Jika ada ayat atau teks berbahasa Arab, biarkan apa adanya.`;

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Fitur AI belum aktif (ANTHROPIC_API_KEY belum diatur di server)." },
      { status: 503 },
    );
  }

  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Permintaan tidak valid." }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (!text) {
    return Response.json({ error: "Isi artikel masih kosong." }, { status: 400 });
  }
  if (text.length > 60000) {
    return Response.json(
      { error: "Isi terlalu panjang untuk dirapikan (maks ~60.000 karakter)." },
      { status: 413 },
    );
  }

  const client = new Anthropic({ apiKey });
  try {
    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: text }],
    });
    const markdown = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("")
      .trim();
    if (!markdown) {
      return Response.json({ error: "AI tidak mengembalikan hasil." }, { status: 502 });
    }
    return Response.json({ markdown });
  } catch {
    return Response.json(
      { error: "Gagal memproses dengan AI. Coba lagi sebentar." },
      { status: 502 },
    );
  }
}

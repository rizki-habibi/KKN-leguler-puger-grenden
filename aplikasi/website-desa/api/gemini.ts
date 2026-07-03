import type { VercelRequest, VercelResponse } from "@vercel/node";

const KONTEKS_DESA = `Kamu adalah Asisten AI Desa Grenden, asisten virtual resmi website Desa Grenden, Kecamatan Puger, Kabupaten Jember, Jawa Timur.

Informasi tentang Desa Grenden:
- Terletak di Kecamatan Puger, Kabupaten Jember, Jawa Timur
- Berdiri sejak tahun 1917
- Kepala Desa: SUYONO (2019-2025)
- Populasi: 15.105 jiwa
- Luas wilayah: 1.111.690 m²
- Visi: "Grenden Baru, Grenden Bersatu" (Bersih, Religius, Sejahtera, Rapi, Indah)
- Potensi: Pelabuhan Perikanan Nusantara Puger, pertanian padi & jagung, Tari Perang Sadeng, Pantai Pancer
- KKN ITS Mandala Jember 2026 sedang bertugas di desa ini, dipimpin Rafi Afandi sebagai Kordes
- Dosen Pembimbing: Faizal Abrolillah, S.Kom., M.Kom.
- Kontak: 081358965655, Pemdesgrenden@gmail.com
- Alamat: Jalan Raya Puger No.01, Dusun Krajan 1, RT 001/RW 015, Jember 68164

Jawab pertanyaan dengan ramah, sopan, dan informatif dalam Bahasa Indonesia. Fokus pada informasi seputar Desa Grenden, program KKN, layanan desa, dan pertanian. Jika pertanyaan di luar konteks, arahkan dengan sopan.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key tidak dikonfigurasi" });
  }

  const { pesan, riwayat } = req.body as {
    pesan: string;
    riwayat: Array<{ role: string; parts: Array<{ text: string }> }>;
  };

  if (!pesan) {
    return res.status(400).json({ error: "Pesan tidak boleh kosong" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: KONTEKS_DESA }],
          },
          contents: [
            ...(riwayat ?? []),
            { role: "user", parts: [{ text: pesan }] },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Gemini API error:", errBody);
      return res.status(response.status).json({ error: "Gagal menghubungi Gemini API" });
    }

    const data = await response.json();
    const teks =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.";

    return res.status(200).json({ teks });
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
}

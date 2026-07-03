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

Jawab pertanyaan dengan ramah, sopan, dan informatif dalam Bahasa Indonesia. Fokus pada informasi seputar Desa Grenden, program KKN, layanan desa, dan pertanian. Jika pertanyaan di luar konteks, arahkan dengan sopan. Jawab singkat dan padat, maksimal 3 paragraf.`;

// Coba beberapa model secara berurutan
const GEMINI_MODELS = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-pro",
];

async function callGemini(apiKey: string, pesan: string, riwayat: Array<{ role: string; parts: Array<{ text: string }> }>) {
  for (const model of GEMINI_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: KONTEKS_DESA }] },
            contents: [
              ...(riwayat ?? []),
              { role: "user", parts: [{ text: pesan }] },
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const teks = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (teks) return { ok: true, teks, model };
      }

      const errText = await response.text().catch(() => "");
      console.warn(`Model ${model} gagal (${response.status}): ${errText.slice(0, 200)}`);
    } catch (e) {
      console.warn(`Model ${model} error:`, e);
    }
  }
  return { ok: false, teks: null, model: null };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY tidak ditemukan di environment variables");
    return res.status(500).json({ error: "Konfigurasi AI belum lengkap" });
  }

  const { pesan, riwayat } = req.body as {
    pesan: string;
    riwayat?: Array<{ role: string; parts: Array<{ text: string }> }>;
  };

  if (!pesan?.trim()) return res.status(400).json({ error: "Pesan tidak boleh kosong" });

  const result = await callGemini(apiKey, pesan, riwayat ?? []);

  if (result.ok && result.teks) {
    return res.status(200).json({ teks: result.teks });
  }

  return res.status(503).json({ error: "Layanan AI sementara tidak tersedia. Silakan coba lagi." });
}

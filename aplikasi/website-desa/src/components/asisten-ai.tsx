import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Minimize2, Maximize2, Loader2, Sparkles } from "lucide-react";

interface Pesan {
  dari: "pengguna" | "ai";
  isi: string;
  waktu: Date;
}

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

export function AsistenAI() {
  const [terbuka, setTerbuka] = useState(false);
  const [diperkecil, setDiperkecil] = useState(false);
  const [pesan, setPesan] = useState<Pesan[]>([
    {
      dari: "ai",
      isi: "Halo! Saya Asisten AI Desa Grenden 🌾 Saya siap membantu menjawab pertanyaan seputar Desa Grenden, program KKN, dan layanan desa. Ada yang bisa saya bantu?",
      waktu: new Date(),
    },
  ]);
  const [inputPesan, setInputPesan] = useState("");
  const [sedangMemuat, setSedangMemuat] = useState(false);
  const refBawah = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const adaApiKey = apiKey && apiKey !== "masukkan_api_key_gemini_disini";

  // Cek apakah serverless proxy tersedia (Vercel deployment)
  const [adaProxy, setAdaProxy] = useState<boolean | null>(null);
  useEffect(() => {
    fetch("/api/gemini", { method: "OPTIONS" })
      .then((r) => setAdaProxy(r.ok || r.status === 200 || r.status === 405))
      .catch(() => setAdaProxy(false));
  }, []);

  useEffect(() => {
    refBawah.current?.scrollIntoView({ behavior: "smooth" });
  }, [pesan]);

  useEffect(() => {
    if (terbuka && !diperkecil) {
      setTimeout(() => refInput.current?.focus(), 300);
    }
  }, [terbuka, diperkecil]);

  async function kirimPesan() {
    if (!inputPesan.trim() || sedangMemuat) return;

    const pesanBaru: Pesan = {
      dari: "pengguna",
      isi: inputPesan.trim(),
      waktu: new Date(),
    };

    setPesan((prev) => [...prev, pesanBaru]);
    setInputPesan("");
    setSedangMemuat(true);

    try {
      if (adaProxy) {
        // Panggil via Vercel serverless proxy (API key aman di server)
        const riwayat = pesan
          .slice(-6)
          .map((p) => ({
            role: p.dari === "pengguna" ? "user" : "model",
            parts: [{ text: p.isi }],
          }));

        const response = await fetch("/api/gemini", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pesan: pesanBaru.isi, riwayat }),
        });

        if (!response.ok) throw new Error("Gagal menghubungi AI");
        const data = await response.json();
        setPesan((prev) => [
          ...prev,
          { dari: "ai", isi: data.teks, waktu: new Date() },
        ]);
      } else if (adaApiKey) {
        // Fallback: panggil Gemini langsung dari browser
        const riwayat = pesan
          .slice(-6)
          .map((p) => ({
            role: p.dari === "pengguna" ? "user" : "model",
            parts: [{ text: p.isi }],
          }));

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
                ...riwayat,
                { role: "user", parts: [{ text: pesanBaru.isi }] },
              ],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 512,
              },
            }),
          }
        );

        if (!response.ok) throw new Error("Gagal menghubungi AI");
        const data = await response.json();
        const teks =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Maaf, saya tidak dapat memproses pertanyaan Anda saat ini.";
        setPesan((prev) => [
          ...prev,
          { dari: "ai", isi: teks, waktu: new Date() },
        ]);
      } else {
        // Mode demo tanpa API key
        await new Promise((r) => setTimeout(r, 800));
        const jawaban = dapatkanJawabanDemo(pesanBaru.isi);
        setPesan((prev) => [
          ...prev,
          { dari: "ai", isi: jawaban, waktu: new Date() },
        ]);
      }
    } catch {
      setPesan((prev) => [
        ...prev,
        {
          dari: "ai",
          isi: "Maaf, terjadi kesalahan. Silakan coba lagi. 🙏",
          waktu: new Date(),
        },
      ]);
    } finally {
      setSedangMemuat(false);
    }
  }

  function dapatkanJawabanDemo(pertanyaan: string): string {
    const p = pertanyaan.toLowerCase();
    if (p.includes("kkn") || p.includes("mahasiswa"))
      return "KKN Reguler ITS Mandala Jember 2026 sedang bertugas di Desa Grenden dengan 10 anggota dari berbagai program studi. Koordinator Desanya adalah Rafi Afandi. Silakan kunjungi halaman Anggota KKN untuk info lengkap! 👥";
    if (p.includes("kepala desa") || p.includes("pemdes"))
      return "Kepala Desa Grenden saat ini adalah Bapak SUYONO yang menjabat sejak 2019. Beliau merupakan kepala desa ke-11 sepanjang sejarah desa ini (berdiri 1917). 🏛️";
    if (p.includes("wisata") || p.includes("pantai") || p.includes("pancer"))
      return "Desa Grenden dekat dengan Pantai Pancer yang terkenal di Kecamatan Puger! Selain itu ada Pelabuhan Perikanan Nusantara Puger sebagai salah satu pelabuhan terbesar di Jawa Timur. 🌊";
    if (p.includes("pertanian") || p.includes("padi") || p.includes("jagung"))
      return "Pertanian adalah sektor utama di Desa Grenden. Komoditas unggulan meliputi padi, jagung, tebu, dan tembakau. KKN ITS juga berinovasi mengolah jagung menjadi produk pangan bergizi! 🌾";
    if (p.includes("tari") || p.includes("budaya") || p.includes("sadeng"))
      return "Desa Grenden memiliki kesenian tradisional Tari Perang Sadeng yang menggambarkan pertempuran Kerajaan Sadeng dan Majapahit. Ini adalah warisan budaya kebanggaan masyarakat Grenden! 🎭";
    if (p.includes("kontak") || p.includes("telepon") || p.includes("alamat"))
      return "Kontak Desa Grenden:\n📞 081358965655\n📧 Pemdesgrenden@gmail.com\n📍 Jalan Raya Puger No.01, Dusun Krajan 1, RT 001/RW 015, Jember 68164";
    if (p.includes("visi") || p.includes("misi"))
      return 'Visi Desa Grenden: "Grenden Baru, Grenden Bersatu" — singkatan dari Bersih, Religius, Sejahtera, Rapi, dan Indah. Visi ini menjadi panduan pembangunan desa yang berbasis keagamaan dan budaya. 🌟';
    return "Terima kasih atas pertanyaan Anda tentang Desa Grenden! Untuk informasi lebih lengkap, silakan jelajahi menu di website ini atau hubungi kantor desa di 081358965655. Ada yang lain bisa saya bantu? 😊\n\n*(Mode demo — tambahkan VITE_GEMINI_API_KEY di .env untuk AI penuh)*";
  }

  return (
    <>
      {/* Tombol Buka */}
      <AnimatePresence>
        {!terbuka && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setTerbuka(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
            aria-label="Buka Asisten AI"
          >
            <Bot className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel Chat */}
      <AnimatePresence>
        {terbuka && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] shadow-2xl rounded-2xl overflow-hidden border border-border bg-white flex flex-col"
            style={{ height: diperkecil ? "auto" : "520px" }}
          >
            {/* Header */}
            <div className="bg-primary text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-tight">Asisten AI Desa Grenden</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/80">
                      {adaProxy ? "Gemini Flash Aktif" : adaApiKey ? "Gemini Flash Aktif" : "Mode Demo"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setDiperkecil(!diperkecil)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label={diperkecil ? "Perbesar" : "Perkecil"}
                >
                  {diperkecil ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setTerbuka(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!diperkecil && (
              <>
                {/* Pesan */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                  {pesan.map((p, i) => (
                    <div
                      key={i}
                      className={`flex gap-2 ${p.dari === "pengguna" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      {p.dari === "ai" && (
                        <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0 mt-1">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${p.dari === "pengguna"
                          ? "bg-primary text-white rounded-tr-sm"
                          : "bg-white border border-border text-foreground rounded-tl-sm shadow-sm"
                          }`}
                      >
                        {p.isi}
                      </div>
                    </div>
                  ))}
                  {sedangMemuat && (
                    <div className="flex gap-2">
                      <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Sedang mengetik...</span>
                      </div>
                    </div>
                  )}
                  <div ref={refBawah} />
                </div>

                {/* Saran Pertanyaan */}
                {pesan.length === 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-2 bg-muted/20">
                    {["Apa potensi Desa Grenden?", "Siapa kepala desa?", "Info KKN ITS"].map((saran) => (
                      <button
                        key={saran}
                        onClick={() => {
                          setInputPesan(saran);
                          setTimeout(() => refInput.current?.focus(), 50);
                        }}
                        className="text-xs bg-white border border-border rounded-full px-3 py-1.5 text-primary hover:bg-primary hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" />
                        {saran}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-border bg-white shrink-0">
                  <div className="flex items-center gap-2">
                    <input
                      ref={refInput}
                      type="text"
                      value={inputPesan}
                      onChange={(e) => setInputPesan(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && kirimPesan()}
                      placeholder="Tanyakan tentang Desa Grenden..."
                      className="flex-1 text-sm border border-border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-muted/30"
                      disabled={sedangMemuat}
                    />
                    <button
                      onClick={kirimPesan}
                      disabled={!inputPesan.trim() || sedangMemuat}
                      className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                      aria-label="Kirim pesan"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground text-center mt-2">
                    Didukung Google Gemini Flash · Desa Grenden 2026
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

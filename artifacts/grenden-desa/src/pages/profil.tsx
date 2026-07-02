import { FadeIn, StaggerContainer, StaggerItem } from "@/components/fade-in";
import { Building, Map, Users, Info, ArrowRight } from "lucide-react";
import sawahHijau from "@/assets/images/sawah-hijau.png";

export default function Profil() {
  const kadesHistory = [
    { id: 1, nama: "MOERADI", periode: "1917-1919" },
    { id: 2, nama: "R SOENYONO", periode: "1919-1920" },
    { id: 3, nama: "ABDULLAH OLEH", periode: "1920-1965" },
    { id: 4, nama: "YARKUS", periode: "1965-1968" },
    { id: 5, nama: "PARJAN", periode: "1968-1972" },
    { id: 6, nama: "SOEPARDI", periode: "1972-1985" },
    { id: 7, nama: "REDISON ARNOLD", periode: "1985-1994" },
    { id: 8, nama: "USREK INDAYATI", periode: "1994-2002" },
    { id: 9, nama: "REDI ISTI PRIYONO", periode: "2002-2013" },
    { id: 10, nama: "TITIS PUSPANINGRUM", periode: "2013-2019" },
    { id: 11, nama: "SUYONO", periode: "2019-2025" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={sawahHijau} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">Profil Desa Grenden</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl leading-relaxed">
              Mengenal lebih dekat sejarah, letak geografis, dan jajaran kepemimpinan Desa Grenden.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sejarah & Identitas */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-8">
              <FadeIn>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <h2 className="text-3xl font-bold text-foreground mb-6 font-serif">Sejarah Singkat</h2>
                  <p className="lead text-xl text-foreground font-medium mb-8">
                    Desa Grenden berdiri sejak tahun 1917 di Kecamatan Puger, Kabupaten Jember.
                  </p>
                  <p>
                    Wilayah Puger merupakan kawasan bersejarah yang dahulu menjadi pusat Kerajaan Sadeng, yang juga berfungsi sebagai lumbung pangan utama bagi Kerajaan Majapahit. Jejak-jejak kejayaan masa lalu ini memberikan corak tersendiri bagi perkembangan budaya di wilayah pesisir Jember ini.
                  </p>
                  <p>
                    Desa Grenden kaya akan warisan budaya, salah satu yang paling menonjol adalah Tari Perang Sadeng. Tarian ini merupakan sebuah epik yang menggambarkan pertempuran bersejarah dan semangat kepahlawanan masyarakat setempat di masa lampau. Tarian ini hingga kini masih dilestarikan dan kerap ditampilkan dalam berbagai perayaan penting desa.
                  </p>
                  <p>
                    Secara demografis, masyarakat Desa Grenden hidup dalam harmoni keberagaman, yang mayoritas terdiri dari perpaduan etnis Jawa dan Madura. Percampuran dua budaya besar ini menghasilkan dinamika sosial dan tradisi keseharian yang kaya, toleran, dan gotong royong.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="mt-16">
                <h2 className="text-3xl font-bold text-foreground mb-8 font-serif">Letak Geografis & Batas Wilayah</h2>
                <div className="bg-card border rounded-2xl p-8 shadow-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Luas Wilayah</p>
                      <p className="text-2xl font-bold text-foreground">1.111.690 m²</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Ketinggian</p>
                      <p className="text-2xl font-bold text-foreground">7 mdpl</p>
                    </div>
                  </div>
                  
                  <hr className="border-border my-8" />
                  
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Map className="w-5 h-5 text-primary" />
                    Batas Desa
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col p-4 bg-muted/50 rounded-xl">
                      <span className="text-sm text-muted-foreground mb-1">Sebelah Utara</span>
                      <span className="font-medium text-foreground">Desa Kasiyan Timur & Desa Kasiyan</span>
                    </div>
                    <div className="flex flex-col p-4 bg-muted/50 rounded-xl">
                      <span className="text-sm text-muted-foreground mb-1">Sebelah Selatan</span>
                      <span className="font-medium text-foreground">Desa Puger Kulon & Desa Mojosari</span>
                    </div>
                    <div className="flex flex-col p-4 bg-muted/50 rounded-xl">
                      <span className="text-sm text-muted-foreground mb-1">Sebelah Timur</span>
                      <span className="font-medium text-foreground">Desa Wonosari & Desa Puger Wetan</span>
                    </div>
                    <div className="flex flex-col p-4 bg-muted/50 rounded-xl">
                      <span className="text-sm text-muted-foreground mb-1">Sebelah Barat</span>
                      <span className="font-medium text-foreground">Desa Karangrejo, Kec. Gumukmas</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-4">
              <FadeIn delay={0.3}>
                <div className="sticky top-32 space-y-8">
                  <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-lg">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                      <Info className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-6 font-serif">Informasi Desa</h3>
                    <ul className="space-y-4 text-primary-foreground/90">
                      <li className="flex flex-col">
                        <span className="text-sm text-primary-foreground/60">Nama Desa</span>
                        <span className="font-medium text-lg">Grenden</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-sm text-primary-foreground/60">Kecamatan</span>
                        <span className="font-medium text-lg">Puger</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-sm text-primary-foreground/60">Kabupaten</span>
                        <span className="font-medium text-lg">Jember</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-sm text-primary-foreground/60">Kode Pos</span>
                        <span className="font-medium text-lg">68164</span>
                      </li>
                      <li className="flex flex-col">
                        <span className="text-sm text-primary-foreground/60">Jumlah Penduduk</span>
                        <span className="font-medium text-lg">15.105 jiwa</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-card border rounded-2xl p-8 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Aparatur Desa Saat Ini
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl">
                        <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">Kepala Desa</p>
                        <p className="font-bold text-lg">SUYONO</p>
                      </div>
                      <div className="p-4 border rounded-xl">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Sekretaris Desa</p>
                        <p className="font-bold">EDI IMAM MUNAJAT</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Tabel Kepala Desa */}
      <section className="py-20 bg-muted/30 border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-serif mb-4">Sejarah Kepemimpinan</h2>
            <p className="text-muted-foreground text-lg">Daftar Kepala Desa Grenden dari masa ke masa sejak tahun 1917.</p>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-primary/5 border-b">
                      <th className="py-4 px-6 font-bold text-sm text-muted-foreground w-16">No</th>
                      <th className="py-4 px-6 font-bold text-sm text-foreground">Nama Kepala Desa</th>
                      <th className="py-4 px-6 font-bold text-sm text-foreground text-right">Masa Jabatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kadesHistory.map((kades, index) => (
                      <tr 
                        key={kades.id} 
                        className={`border-b last:border-0 hover:bg-muted/50 transition-colors ${
                          index === kadesHistory.length - 1 ? 'bg-primary/5 hover:bg-primary/10' : ''
                        }`}
                      >
                        <td className="py-4 px-6 text-muted-foreground">{kades.id}</td>
                        <td className={`py-4 px-6 font-medium ${index === kadesHistory.length - 1 ? 'text-primary font-bold' : 'text-foreground'}`}>
                          {kades.nama}
                          {index === kadesHistory.length - 1 && (
                            <span className="ml-3 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">Petahana</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right font-medium text-muted-foreground">
                          {kades.periode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

const BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token
    ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as { message?: string }).message ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

/* ── Types ─────────────────────────────────────────────────── */
export interface Pengalaman {
  institusi: string;
  posisi: string;
  durasi: string;
  deskripsi: string;
}

export interface AnggotaKkn {
  id: number;
  nama: string;
  jabatan: string;
  divisi: string;
  nim: string | null;
  programStudi: string | null;
  fotoUrl: string | null;
  bio: string | null;
  bidangKeahlian: string[];
  pengalaman: Pengalaman[];
  urutan: number;
  createdAt: string;
  updatedAt: string;
}

export interface Berita {
  id: number;
  judul: string;
  slug: string;
  ringkasan: string | null;
  isi: string | null;
  gambarUrl: string | null;
  kategori: string | null;
  diterbitkan: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface Galeri {
  id: number;
  judul: string;
  deskripsi: string | null;
  gambarUrl: string;
  kategori: string | null;
  urutan: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface KontenSosmed {
  id: number;
  judul: string;
  platform: string;
  url: string;
  deskripsi: string | null;
  tanggal: string | null;
  urutan: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface BukuTamu {
  id: number;
  nama: string;
  jabatanInstansi: string | null;
  noTelepon: string | null;
  keperluan: string | null;
  tanggalKunjungan: string;
  createdAt: string;
  updatedAt: string;
}

export type AnggotaPayload = Omit<AnggotaKkn, "id" | "createdAt" | "updatedAt">;
export type BeritaPayload = Omit<Berita, "id" | "createdAt" | "updatedAt">;
export type GaleriPayload = Omit<Galeri, "id" | "createdAt" | "updatedAt">;
export type KontenSosmedPayload = Omit<KontenSosmed, "id" | "createdAt" | "updatedAt">;
export type BukuTamuPayload = Omit<BukuTamu, "id" | "createdAt" | "updatedAt">;

/* ── API client ─────────────────────────────────────────────── */
export const api = {
  anggota: {
    list: () => fetch(`${BASE}/anggota`).then((r) => handleResponse<AnggotaKkn[]>(r)),
    get: (id: number) => fetch(`${BASE}/anggota/${id}`).then((r) => handleResponse<AnggotaKkn>(r)),
    create: (data: AnggotaPayload) =>
      fetch(`${BASE}/anggota`, { method: "POST", headers: authHeaders(), body: JSON.stringify(data) }).then((r) => handleResponse<AnggotaKkn>(r)),
    update: (id: number, data: Partial<AnggotaPayload>) =>
      fetch(`${BASE}/anggota/${id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(data) }).then((r) => handleResponse<AnggotaKkn>(r)),
    delete: (id: number) =>
      fetch(`${BASE}/anggota/${id}`, { method: "DELETE", headers: authHeaders() }).then((r) => handleResponse<{ message: string }>(r)),
  },

  berita: {
    list: (asAdmin = false) =>
      fetch(`${BASE}/berita`, { headers: asAdmin ? authHeaders() : {} }).then((r) => handleResponse<Berita[]>(r)),
    get: (id: number) => fetch(`${BASE}/berita/${id}`).then((r) => handleResponse<Berita>(r)),
    create: (data: BeritaPayload) =>
      fetch(`${BASE}/berita`, { method: "POST", headers: authHeaders(), body: JSON.stringify(data) }).then((r) => handleResponse<Berita>(r)),
    update: (id: number, data: Partial<BeritaPayload>) =>
      fetch(`${BASE}/berita/${id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(data) }).then((r) => handleResponse<Berita>(r)),
    delete: (id: number) =>
      fetch(`${BASE}/berita/${id}`, { method: "DELETE", headers: authHeaders() }).then((r) => handleResponse<{ message: string }>(r)),
  },

  galeri: {
    list: () => fetch(`${BASE}/galeri`).then((r) => handleResponse<Galeri[]>(r)),
    get: (id: number) => fetch(`${BASE}/galeri/${id}`).then((r) => handleResponse<Galeri>(r)),
    create: (data: GaleriPayload) =>
      fetch(`${BASE}/galeri`, { method: "POST", headers: authHeaders(), body: JSON.stringify(data) }).then((r) => handleResponse<Galeri>(r)),
    update: (id: number, data: Partial<GaleriPayload>) =>
      fetch(`${BASE}/galeri/${id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(data) }).then((r) => handleResponse<Galeri>(r)),
    delete: (id: number) =>
      fetch(`${BASE}/galeri/${id}`, { method: "DELETE", headers: authHeaders() }).then((r) => handleResponse<{ message: string }>(r)),
  },

  kontenSosmed: {
    list: () => fetch(`${BASE}/konten-sosmed`).then((r) => handleResponse<KontenSosmed[]>(r)),
    get: (id: number) => fetch(`${BASE}/konten-sosmed/${id}`).then((r) => handleResponse<KontenSosmed>(r)),
    create: (data: KontenSosmedPayload) =>
      fetch(`${BASE}/konten-sosmed`, { method: "POST", headers: authHeaders(), body: JSON.stringify(data) }).then((r) => handleResponse<KontenSosmed>(r)),
    update: (id: number, data: Partial<KontenSosmedPayload>) =>
      fetch(`${BASE}/konten-sosmed/${id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(data) }).then((r) => handleResponse<KontenSosmed>(r)),
    delete: (id: number) =>
      fetch(`${BASE}/konten-sosmed/${id}`, { method: "DELETE", headers: authHeaders() }).then((r) => handleResponse<{ message: string }>(r)),
  },

  auth: {
    login: (password: string) =>
      fetch(`${BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }).then((r) =>
        handleResponse<{ token: string }>(r)
      ),
    me: () => fetch(`${BASE}/auth/me`, { headers: authHeaders() }).then((r) => handleResponse<{ loggedIn: boolean; role: string }>(r)),
    logout: () => { localStorage.removeItem("admin_token"); },
    isLoggedIn: () => !!getToken(),
    saveToken: (token: string) => localStorage.setItem("admin_token", token),
  },

  bukuTamu: {
    list: () =>
      fetch(`${BASE}/buku-tamu`).then((r) => handleResponse<BukuTamu[]>(r)),
    get: (id: number) =>
      fetch(`${BASE}/buku-tamu/${id}`).then((r) => handleResponse<BukuTamu>(r)),
    create: (data: BukuTamuPayload, pin: string) =>
      fetch(`${BASE}/buku-tamu`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-humas-pin": pin },
        body: JSON.stringify(data),
      }).then((r) => handleResponse<BukuTamu>(r)),
    update: (id: number, data: Partial<BukuTamuPayload>, pin: string) =>
      fetch(`${BASE}/buku-tamu/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "x-humas-pin": pin },
        body: JSON.stringify(data),
      }).then((r) => handleResponse<BukuTamu>(r)),
    delete: (id: number, pin: string) =>
      fetch(`${BASE}/buku-tamu/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", "x-humas-pin": pin },
      }).then((r) => handleResponse<{ message: string }>(r)),
  },
};

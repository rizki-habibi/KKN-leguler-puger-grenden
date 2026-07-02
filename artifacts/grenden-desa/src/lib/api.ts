const BASE = "/api";

function getToken(): string | null {
  return localStorage.getItem("admin_token");
}

function authHeaders(): HeadersInit {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error((err as { message?: string }).message ?? res.statusText);
  }
  return res.json() as Promise<T>;
}

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
  fotoUrl: string | null;
  bio: string | null;
  bidangKeahlian: string[];
  pengalaman: Pengalaman[];
  urutan: number;
  createdAt: string;
  updatedAt: string;
}

export type AnggotaPayload = Omit<AnggotaKkn, "id" | "createdAt" | "updatedAt">;

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
  auth: {
    login: (password: string) =>
      fetch(`${BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) }).then((r) =>
        handleResponse<{ token: string }>(r)
      ),
    me: () =>
      fetch(`${BASE}/auth/me`, { headers: authHeaders() }).then((r) => handleResponse<{ loggedIn: boolean; role: string }>(r)),
    logout: () => { localStorage.removeItem("admin_token"); },
    isLoggedIn: () => !!getToken(),
    saveToken: (token: string) => localStorage.setItem("admin_token", token),
  },
};

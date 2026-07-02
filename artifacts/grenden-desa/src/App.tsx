import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/layout";
import Beranda from "@/pages/beranda";
import Profil from "@/pages/profil";
import VisiMisi from "@/pages/visi-misi";
import Berita from "@/pages/berita";
import Galeri from "@/pages/galeri";
import Ppid from "@/pages/ppid";
import AnggotaKkn from "@/pages/anggota-kkn";
import KontenSosmed from "@/pages/konten-sosmed";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Beranda} />
      <Route path="/profil" component={Profil} />
      <Route path="/visi-misi" component={VisiMisi} />
      <Route path="/berita" component={Berita} />
      <Route path="/galeri" component={Galeri} />
      <Route path="/ppid" component={Ppid} />
      <Route path="/anggota-kkn" component={AnggotaKkn} />
      <Route path="/konten-sosmed" component={KontenSosmed} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

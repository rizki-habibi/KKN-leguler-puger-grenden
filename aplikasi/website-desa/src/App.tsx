import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Layout } from "@/components/layout";
import { AsistenAI } from "@/components/asisten-ai";
import Beranda from "@/pages/beranda";
import Profil from "@/pages/profil";
import VisiMisi from "@/pages/visi-misi";
import Berita from "@/pages/berita";
import Galeri from "@/pages/galeri";
import Ppid from "@/pages/ppid";
import AnggotaKkn from "@/pages/anggota-kkn";
import KontenSosmed from "@/pages/konten-sosmed";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/index";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function PublicPage({ component: Comp }: { component: React.ComponentType }) {
  return (
    <Layout>
      <Comp />
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/" component={() => <PublicPage component={Beranda} />} />
      <Route path="/profil" component={() => <PublicPage component={Profil} />} />
      <Route path="/visi-misi" component={() => <PublicPage component={VisiMisi} />} />
      <Route path="/berita" component={() => <PublicPage component={Berita} />} />
      <Route path="/galeri" component={() => <PublicPage component={Galeri} />} />
      <Route path="/ppid" component={() => <PublicPage component={Ppid} />} />
      <Route path="/anggota-kkn" component={() => <PublicPage component={AnggotaKkn} />} />
      <Route path="/konten-sosmed" component={() => <PublicPage component={KontenSosmed} />} />
      <Route component={() => <PublicPage component={NotFound} />} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
        <AsistenAI />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

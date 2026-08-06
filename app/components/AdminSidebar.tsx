"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {

  const router = useRouter();


  async function cerrarSesion() {

    await supabase.auth.signOut();

    router.push("/login");

  }


  return (

    <aside className="admin-sidebar">


      <div className="admin-logo">

        <div className="logo-circle">
          ❤️
        </div>

        <div>
          <h2>
            Corazón Valiente
          </h2>

          <span>
            Administración
          </span>

        </div>

      </div>



      <nav>

        <Link href="/admin">
          Dashboard
        </Link>

        <Link href="/admin/voluntarios">
          Gestión de Voluntarios
        </Link>

        <Link href="/admin/donaciones">
          Donaciones
        </Link>

        <Link href="/admin/eventos">
          Eventos
        </Link>

      </nav>



      <button onClick={cerrarSesion}>
        Cerrar sesión
      </button>


    </aside>

  );
}
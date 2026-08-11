"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

export default function AdminSidebar() {

  const router = useRouter();


async function cerrarSesion() {
  await fetch("/api/logout", {
    method: "POST",
  });

  router.push("/login");
  router.refresh();
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
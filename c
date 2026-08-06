[33mcommit e14b215928bbaaf01da31016cc82176ae8b401f2[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmejoras-dashboard[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/HEAD[m[33m, [m[1;32mmain[m[33m)[m
Author: JuanSandovalB <juansandovalbello29@gmail.com>
Date:   Tue Aug 4 11:41:05 2026 -0500

    Version estable panel administrador login eventos donaciones voluntarios

 app/admin/AdminDashboard.tsx               |  223 [32m++[m
 app/admin/donaciones/DonacionesPanel.tsx   |  831 [32m+++++++[m
 app/admin/donaciones/page.tsx              |   62 [32m+[m
 app/admin/eventos/page.tsx                 |   46 [32m+[m
 app/admin/layout.tsx                       |   48 [32m+[m
 app/admin/page.tsx                         |   52 [32m+[m
 app/admin/voluntarios/VoluntariosPanel.tsx |  968 [32m++++++++[m
 app/admin/voluntarios/page.tsx             |   62 [32m+[m
 app/api/donaciones/route.ts                |  399 [32m++++[m
 app/api/eventos/route.ts                   |  266 [32m+++[m
 app/api/login/login.tsx                    |  238 [32m++[m
 app/api/login/route.ts                     |  191 [32m++[m
 app/api/upload/route.ts                    |  138 [32m++[m
 app/api/voluntarios/route.ts               |  269 [32m+++[m
 app/components/AdminHeader.tsx             |    0
 app/components/AdminSidebar.tsx            |   87 [32m+[m
 app/components/DonationForm.tsx            |  217 [32m++[m
 app/components/EventosPanel.tsx            |  341 [32m+++[m
 app/components/Footer.tsx                  |   71 [32m+[m
 app/components/Navbar.tsx                  |   59 [32m+[m
 app/components/VolunteerForm.tsx           |  162 [32m++[m
 app/dona/page.tsx                          |   84 [32m+[m
 app/eventos/page.tsx                       |  211 [32m++[m
 app/favicon.ico                            |  Bin [31m25931[m -> [32m0[m bytes
 app/globals.css                            | 3436 [32m+++++++++++++++++++++++++++[m[31m-[m
 app/icon.png                               |  Bin [31m0[m -> [32m2144283[m bytes
 app/layout.tsx                             |    7 [32m+[m[31m-[m
 app/login/page.tsx                         |  238 [32m++[m
 app/page.tsx                               |  627 [32m++++[m[31m-[m
 generar-password.js                        |   12 [32m+[m
 lib/auth.ts                                |   68 [32m+[m
 lib/supabase.ts                            |   25 [32m+[m
 lib/supabaseAdmin.ts                       |   10 [32m+[m
 lib/supabaseBrowser.ts                     |   14 [32m+[m
 lib/supabasePublic.ts                      |   16 [32m+[m
 lib/supabaseServer.ts                      |   55 [32m+[m
 lib/uploadImage.ts                         |   64 [32m+[m
 next.config.ts                             |    4 [32m+[m[31m-[m
 package-lock.json                          |  400 [32m+++[m[31m-[m
 package.json                               |    7 [32m+[m[31m-[m
 proxy.ts                                   |   79 [32m+[m
 public/images/amelia.png                   |  Bin [31m0[m -> [32m1270974[m bytes
 public/images/club.jpg                     |    0
 public/images/donaciones.jpg               |    0
 public/images/hero-familia.jpg             |    0
 public/images/logo.png                     |  Bin [31m0[m -> [32m229647[m bytes
 public/images/quienes-somos.jpg            |    0
 public/images/valentin.png                 |  Bin [31m0[m -> [32m1318459[m bytes
 public/images/voluntarios.jpg              |    0
 49 files changed, 9933 insertions(+), 154 deletions(-)

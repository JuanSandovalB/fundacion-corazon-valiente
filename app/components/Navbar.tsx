"use client";

import Link from "next/link";
import Image from "next/image";


export default function Navbar(){

return(

<header className="public-navbar">


<div className="navbar-logo">

<Link href="/">

<Image

src="/images/logo.png"

alt="Fundación Corazón Valiente"

width={130}

height={70}

/>

</Link>

</div>








<Link

href="/dona"

className="nav-donate"

>

❤️ Quiero ayudar

</Link>



</header>

)

}
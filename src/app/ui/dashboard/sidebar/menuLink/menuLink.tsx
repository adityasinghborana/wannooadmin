'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FC } from "react"
interface Props{
    items:{
        title:String,
        path: any,
        icon: any
    }
}

const MenuLink: FC <Props> = ({items}) => {
  const pathname = usePathname()
    return (
    <Link className={`flex items-center p-[20px] hover:bg-[#2e374a] ${pathname === items.path && 'bg-[#2e374a]'}`} href={items.path}>{items.icon}{items.title}</Link>
  )
}

export default MenuLink
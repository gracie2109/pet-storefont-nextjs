import {MainNavItem} from "@/types";

export type SiteConfig = typeof siteConfig

const links = {
    twitter: "https://twitter.com/gracie2109",
    github: "https://github.com/gracie",
    githubAccount: "https://github.com/gracie",
    discord: "https://discord.com/users/gracie2109",
    facebook: "https://www.facebook.com/phuongthao.trinh.sue/"
}


export const siteConfig = {
    name: "Bongcun",
    description:
        "An open source e-commerce pet-shop build with everything new in Next.js.",
    url: "http://localhost:3000/",
    ogImage: "",
    links,
    adminNavigation: [
        {
            title: "Pets",
            href: "/admin/pets",
            description: "All the customers we have to offer.",
            items: [],
        },
        {
            title: "Role & Permissions",
            href: "/admin/roles",
            description: "All the customers we have to offer.",
            items: [],
        },
        {
            title: "News",
            href: "/admin/news",
            description: "All the customers we have to offer.",
            items: [],
        },
        {
            title: "Services",
            href: "/admin/services",
            description: "All the customers we have to offer.",
            items: [],
        },
        {
            title: "Customers",
            href: "/admin/customers",
            description: "All the customers we have to offer.",
            items: [],
        },
        {
            title: "Products",
            href: "/admin/products",
            description: "All the products we have to offer.",
            items: [],
        },
        {
            title: "Roles",
            href: "/admin/roles",
            description: "All the roles we have",
            items: [],
        },
        {
            title: "Orders",
            href: "/admin/orders",
            description: "All the roles we have",
            items: [],
        },
        {
            title: "Vouchers",
            href: "/admin/vouchers",
            description: "All the roles we have",
            items: [],
        },
        {
            title: "Brands",
            href: "/admin/brands",
            description: "All the brands we have",
            items: [],
        },
        {
            title: "Collections",
            href: "/admin/collections",
            description: "All the roles we have",
            items: [],
        }
    ] satisfies MainNavItem[]

}
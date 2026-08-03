import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sripalee College Digital Platform",
    short_name: "Sripalee College",
    description:
      "The official digital platform for Sripalee College, providing school information, notices, events, resources and digital services.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f1e4",
    theme_color: "#4e111b",
    categories: ["education", "productivity"],
    icons: [
      {
        src: "/pwa-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/pwa-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "News and Notices",
        short_name: "Notices",
        description: "Open school news and important announcements.",
        url: "/news",
        icons: [
          {
            src: "/pwa-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "School Events",
        short_name: "Events",
        description: "View upcoming school events and calendar information.",
        url: "/events",
        icons: [
          {
            src: "/pwa-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Digital Noticeboard",
        short_name: "Noticeboard",
        description: "Open the school digital noticeboard.",
        url: "/noticeboard",
        icons: [
          {
            src: "/pwa-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Resources",
        short_name: "Resources",
        description: "Browse approved school documents and resources.",
        url: "/resources",
        icons: [
          {
            src: "/pwa-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
  };
}
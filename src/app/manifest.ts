import type {MetadataRoute} from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Potion',
    short_name: 'Potion',
    description: 'Tools for Japanese poker players',
    start_url: '/',
    display: 'standalone',
    background_color: "#ffffff",
    theme_color: "#0070f3",
    "icons": [
      {
        "src": "/favicons/icon-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/favicons/icon-256x256.png",
        "sizes": "256x256",
        "type": "image/png"
      },
      {
        "src": "/favicons/icon-384x384.png",
        "sizes": "384x384",
        "type": "image/png"
      },
      {
        "src": "/favicons/icon-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ]
  }
}

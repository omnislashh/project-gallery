import {
  Twitter,
  Instagram,
  Facebook,
//   Palette,
//   Music,
//   Brush,
//   Video,
  Youtube,
//   Camera,
  Github,
} from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, url: "https://twitter.com/elk_animation", color: "hover:text-sky-400" },
    { icon: Instagram, url: "https://instagram.com/elk_animation_studio", color: "hover:text-pink-500" },
    { icon: Facebook, url: "https://facebook.com/catch.twentytwo.923", color: "hover:text-blue-600" },
    // { icon: Palette, url: "https://www.artstation.com/tonprofil", color: "hover:text-blue-400" },
    // { icon: Music, url: "https://www.tiktok.com/@tonprofil", color: "hover:text-gray-300" },
    // { icon: Brush, url: "https://www.behance.net/tonprofil", color: "hover:text-blue-500" },
    // { icon: Video, url: "https://vimeo.com/tonprofil", color: "hover:text-cyan-400" },
    { icon: Youtube, url: "https://youtube.com/@eliely-kok9260", color: "hover:text-red-500" },
    // { icon: Camera, url: "https://www.deviantart.com/tonprofil", color: "hover:text-green-400" },
    { icon: Github, url: "https://github.com/omnislashh", color: "hover:text-gray-400" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-8 mt-16 border-t border-gray-800">
      <div className="flex justify-center space-x-6 mb-4">
        {socialLinks.map(({ icon: Icon, url, color }, idx) => (
          <a
            key={idx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-transform duration-300 hover:scale-110 ${color}`}
          >
            <Icon size={24} />
          </a>
        ))}
      </div>
      <p className="text-center text-sm text-gray-600">
        © {new Date().getFullYear()} — Built with ❤️ using React & TailwindCSS
      </p>
    </footer>
  );
}

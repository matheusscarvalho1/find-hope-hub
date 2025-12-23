import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-10 text-gray-300">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row md:px-4">
        <p className="text-sm md:text-base">
          &copy; Todos os direitos reservados
        </p>
        <p className="text-center">Desenvolvido por Matheus Carvalho, 2025</p>

        <div className="mt-4 flex space-x-6 md:mt-0">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="transform transition-transform hover:scale-125 hover:text-white"
          >
            <GitHubLogoIcon className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="transform transition-transform hover:scale-125 hover:text-pink-500"
          >
            <InstagramLogoIcon className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="transform transition-transform hover:scale-125 hover:text-blue-500"
          >
            <LinkedInLogoIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

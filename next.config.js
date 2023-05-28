/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
    },
  },
};

module.exports = nextConfig;

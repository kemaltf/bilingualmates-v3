import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  experimental: {
    mcpServer: true,
  },
};
 
export default withNextIntl(nextConfig);

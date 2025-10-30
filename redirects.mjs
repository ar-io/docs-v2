// Comprehensive redirects from old URL structure (main branch) to new structure (fumadocs branch)
const redirects = [
  // Main documentation sections
  {
    source: '/introduction',
    destination: '/learn',
    permanent: true,
  },
  {
    source: '/getting-started',
    destination: '/build/introduction',
    permanent: true,
  },

  // AR.IO SDK pages
  {
    source: '/ar-io-sdk',
    destination: '/sdks/ar-io-sdk',
    permanent: true,
  },
  {
    source: '/ar-io-sdk/getting-started',
    destination: '/sdks/ar-io-sdk',
    permanent: true,
  },
  {
    source: '/ar-io-sdk/ants/:path*',
    destination: '/sdks/ar-io-sdk/:path*',
    permanent: true,
  },
  {
    source: '/ar-io-sdk/ant-registry/:path*',
    destination: '/sdks/ar-io-sdk/:path*',
    permanent: true,
  },
  {
    source: '/ar-io-sdk/ant-versions/:path*',
    destination: '/sdks/ar-io-sdk/versions',
    permanent: true,
  },
  {
    source: '/ar-io-sdk/ario/:path*',
    destination: '/sdks/ar-io-sdk/:path*',
    permanent: true,
  },
  {
    source: '/ar-io-sdk/release-notes',
    destination: '/sdks/ar-io-sdk',
    permanent: true,
  },
  {
    source: '/ar-io-sdk/upgrade-guides',
    destination: '/sdks/ar-io-sdk',
    permanent: true,
  },
  {
    source: '/ar-io-sdk/faucet/:path*',
    destination: '/learn/token/get-the-token',
    permanent: true,
  },

  // Gateway pages
  {
    source: '/gateways',
    destination: '/build/run-a-gateway',
    permanent: true,
  },
  {
    source: '/gateways/setup-and-operation',
    destination: '/build/run-a-gateway/quick-start',
    permanent: true,
  },
  {
    source: '/gateways/join-network',
    destination: '/build/run-a-gateway/join-the-network',
    permanent: true,
  },
  {
    source: '/gateways/linux-setup',
    destination: '/build/run-a-gateway/quick-start',
    permanent: true,
  },
  {
    source: '/gateways/windows-setup',
    destination: '/build/run-a-gateway/quick-start',
    permanent: true,
  },
  {
    source: '/gateways/env',
    destination: '/build/run-a-gateway/manage/environment-variables',
    permanent: true,
  },
  {
    source: '/gateways/upgrading',
    destination: '/build/run-a-gateway/manage/upgrading-a-gateway',
    permanent: true,
  },
  {
    source: '/gateways/troubleshooting',
    destination: '/build/run-a-gateway/manage/troubleshooting',
    permanent: true,
  },
  {
    source: '/gateways/troubleshooting-archive',
    destination: '/build/run-a-gateway/manage/troubleshooting',
    permanent: true,
  },
  {
    source: '/gateways/moderation',
    destination: '/build/run-a-gateway/manage/content-moderation',
    permanent: true,
  },
  {
    source: '/gateways/filters',
    destination: '/build/run-a-gateway/manage/filters',
    permanent: true,
  },
  {
    source: '/gateways/apex',
    destination: '/build/run-a-gateway/manage/setting-apex-domain',
    permanent: true,
  },
  {
    source: '/gateways/networking',
    destination: '/build/run-a-gateway/manage/ssl-certs',
    permanent: true,
  },
  {
    source: '/gateways/networking/certbot/cloudflare',
    destination: '/build/run-a-gateway/manage/ssl-certs',
    permanent: true,
  },
  {
    source: '/gateways/networking/certbot/namecheap',
    destination: '/build/run-a-gateway/manage/ssl-certs',
    permanent: true,
  },
  {
    source: '/gateways/snapshots',
    destination: '/build/run-a-gateway/manage/index-snapshots',
    permanent: true,
  },
  {
    source: '/gateways/bundler',
    destination: '/build/extensions/bundler',
    permanent: true,
  },
  {
    source: '/gateways/grafana',
    destination: '/build/extensions/grafana',
    permanent: true,
  },
  {
    source: '/gateways/cu',
    destination: '/build/extensions/compute-unit',
    permanent: true,
  },
  {
    source: '/gateways/parquet',
    destination: '/build/extensions/clickhouse',
    permanent: true,
  },
  {
    source: '/gateways/optimize-data',
    destination: '/build/extensions/clickhouse',
    permanent: true,
  },
  {
    source: '/gateways/gateway-network',
    destination: '/learn/gateways',
    permanent: true,
  },
  {
    source: '/gateways/delegated-staking',
    destination: '/learn/token/staking',
    permanent: true,
  },
  {
    source: '/gateways/observer',
    destination: '/learn/oip',
    permanent: true,
  },
  {
    source: '/gateways/observer/troubleshooting',
    destination: '/learn/oip',
    permanent: true,
  },
  {
    source: '/gateways/arns-resolution',
    destination: '/learn/arns',
    permanent: true,
  },
  {
    source: '/gateways/failed-epoch',
    destination: '/learn/oip/performance-evaluation',
    permanent: true,
  },
  {
    source: '/gateways/advanced',
    destination: '/build/run-a-gateway/manage',
    permanent: true,
  },
  {
    source: '/gateways/admin',
    destination: '/build/run-a-gateway/manage',
    permanent: true,
  },
  {
    source: '/gateways/release-notes',
    destination: '/build/run-a-gateway',
    permanent: true,
  },
  {
    source: '/gateways/faq',
    destination: '/build/run-a-gateway',
    permanent: true,
  },

  // ArNS pages
  {
    source: '/arns',
    destination: '/learn/arns',
    permanent: true,
  },

  // Wayfinder pages
  {
    source: '/wayfinder',
    destination: '/sdks/wayfinder',
    permanent: true,
  },
  {
    source: '/wayfinder/getting-started',
    destination: '/sdks/wayfinder',
    permanent: true,
  },
  {
    source: '/wayfinder/core',
    destination: '/sdks/wayfinder/wayfinder-core',
    permanent: true,
  },
  {
    source: '/wayfinder/core/:path*',
    destination: '/sdks/wayfinder/wayfinder-core/:path*',
    permanent: true,
  },
  {
    source: '/wayfinder/react',
    destination: '/sdks/wayfinder/wayfinder-react',
    permanent: true,
  },
  {
    source: '/wayfinder/react/:path*',
    destination: '/sdks/wayfinder/wayfinder-react/:path*',
    permanent: true,
  },
  {
    source: '/wayfinder/release-notes/:path*',
    destination: '/sdks/wayfinder',
    permanent: true,
  },

  // Token pages
  {
    source: '/token',
    destination: '/learn/token',
    permanent: true,
  },
  {
    source: '/staking',
    destination: '/learn/token/staking',
    permanent: true,
  },
  {
    source: '/foundation',
    destination: '/learn/token',
    permanent: true,
  },

  // Concepts pages
  {
    source: '/concepts/manifests',
    destination: '/build/upload/manifests',
    permanent: true,
  },
  {
    source: '/concepts/normalized-addresses',
    destination: '/build/advanced/normalized-addresses',
    permanent: true,
  },
  {
    source: '/concepts/sandboxing',
    destination: '/build/advanced/sandboxing',
    permanent: true,
  },
  {
    source: '/concepts/wayfinder',
    destination: '/learn/wayfinder',
    permanent: true,
  },

  // Guides pages
  {
    source: '/guides',
    destination: '/build/guides',
    permanent: true,
  },
  {
    source: '/guides/ardrive-web',
    destination: '/build/guides/hosting-unstoppable-apps/hosting-with-ardrive',
    permanent: true,
  },
  {
    source: '/guides/uploading-to-arweave',
    destination: '/build/guides/uploading-to-arweave',
    permanent: true,
  },
  {
    source: '/guides/permaweb-deploy',
    destination: '/build/guides/hosting-unstoppable-apps',
    permanent: true,
  },
  {
    source: '/guides/primary-names',
    destination: '/build/guides/arns-primary-names',
    permanent: true,
  },
  {
    source: '/guides/managing-undernames',
    destination: '/build/guides/hosting-unstoppable-apps/using-undernames-for-versioning',
    permanent: true,
  },
  {
    source: '/guides/ants-on-bazar',
    destination: '/build/guides/arns-marketplace',
    permanent: true,
  },
  {
    source: '/guides/ants',
    destination: '/sdks/ar-io-sdk',
    permanent: true,
  },
  {
    source: '/guides/ants/registering',
    destination: '/sdks/ar-io-sdk/spawn',
    permanent: true,
  },
  {
    source: '/guides/ants/managing',
    destination: '/sdks/ar-io-sdk/records',
    permanent: true,
  },
  {
    source: '/guides/example-apps/crossmint-app',
    destination: '/build/guides/crossmint-nft-minting-app',
    permanent: true,
  },
  {
    source: '/guides/gql',
    destination: '/build/access/find-data',
    permanent: true,
  },
  {
    source: '/guides/arns-viewer',
    destination: '/build/access/arns',
    permanent: true,
  },
  {
    source: '/guides/testnet',
    destination: '/learn/token/get-the-token',
    permanent: true,
  },
  {
    source: '/guides/story',
    destination: '/build/guides',
    permanent: true,
  },
  {
    source: '/guides/arlink',
    destination: '/build/guides',
    permanent: true,
  },
  // New hosting unstoppable apps redirects
  {
    source: '/build/guides/hosting-decentralized-websites',
    destination: '/build/guides/hosting-unstoppable-apps',
    permanent: true,
  },
  {
    source: '/build/guides/arns-undernames-versioning',
    destination: '/build/guides/hosting-unstoppable-apps/using-undernames-for-versioning',
    permanent: true,
  },
  {
    source: '/build/guides/working-with-arns/arns-undernames-versioning',
    destination: '/build/guides/hosting-unstoppable-apps/using-undernames-for-versioning',
    permanent: true,
  },
  {
    source: '/build/guides/deploy-dapp-with-ardrive-web',
    destination: '/build/guides/hosting-unstoppable-apps/hosting-with-ardrive',
    permanent: true,
  },

  // Contract pages
  {
    source: '/ario-contract',
    destination: '/learn/token/architecture',
    permanent: true,
  },

  // Community and other pages
  {
    source: '/glossary',
    destination: '/glossary',
    permanent: true,
  },
  {
    source: '/community-resources',
    destination: '/',
    permanent: true,
  },
  {
    source: '/mainnet-launch',
    destination: '/',
    permanent: true,
  },
  {
    source: '/network-composition',
    destination: '/learn/gateways/gateway-registry',
    permanent: true,
  },
  {
    source: '/labs',
    destination: '/',
    permanent: true,
  },
  {
    source: '/ai/sdk/antregistry',
    destination: '/sdks/ar-io-sdk',
    permanent: true,
  },
];

export default redirects;

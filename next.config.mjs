import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const baseConfig = {
  output: 'standalone',
}

const withNextIntl = createNextIntlPlugin()

const combinedConfig = withNextIntl(withPayload(baseConfig, { devBundleServerPackages: false }))

export default combinedConfig

import { HttpsProxyAgent } from 'https-proxy-agent'

export const extend = Object.assign

export const createProxyAgent = (url: string) => {
  const proxyUrl = url
  return new HttpsProxyAgent(proxyUrl)
}

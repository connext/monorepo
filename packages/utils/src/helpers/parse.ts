/// For anything related to regex parsing.
/**
 * Returns domain name from url string
 * @param url The http or https string
 * @returns https://api.thegraph.com/subgraphs/name... => api.thegraph.com
 */
export const parseHostname = (url: string) => {
  const matches = /^https?:\/\/([^/?#]+)(?:[/?#]|$)/i.exec(url);
  return matches && matches[1];
};

export const formatUrl = (_url: string, endpoint: string, identifier?: string): string => {
  let url = `${_url}/${endpoint}`;
  if (identifier) {
    url += `/${identifier}`;
  }
  return url;
};

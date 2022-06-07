export type Endpoint = ['get' | 'post' | 'put' | 'patch' | 'delete', string]

export const NEWS_GET: Endpoint = ['get', 'v1/news']
export const NEWS_POST: Endpoint = ['post', 'v1/news']
export const NEWS_COMMENT_GET: Endpoint = ['get', 'v1/news/:newsId/comments']
export const NEWS_COMMENT_POST: Endpoint = ['post', 'v1/news/:newsId/comments']
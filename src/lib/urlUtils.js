const EXTERNAL_HREF_PATTERN = /^(https?:|mailto:|tel:)/i;

const isHashHref = href => typeof href === 'string' && href.trim().startsWith('#');

const stripHtmlExtension = value => value.replace(/\.html$/i, '');

const trimSlashes = value => value.replace(/^\/+/g, '').replace(/\/+$/g, '');

const normalizeSegment = value => {
  if (!value) return '';
  const withoutExt = stripHtmlExtension(value).trim();
  const trimmed = trimSlashes(withoutExt);
  if (trimmed === '' || trimmed.toLowerCase() === 'index') {
    return '';
  }
  return trimmed;
};

export const isExternalHref = href => EXTERNAL_HREF_PATTERN.test(href || '');

export const normalizeContentPath = href => {
  if (!href) return '/';
  if (isHashHref(href) || isExternalHref(href)) {
    return href;
  }
  const [rawPath] = href.split('#');
  const segment = normalizeSegment(rawPath);
  return segment ? `/${segment}` : '/';
};

export const resolveContentHref = href => {
  if (!href) return '/';
  if (isHashHref(href) || isExternalHref(href)) {
    return href;
  }
  const [rawPath, hash = ''] = href.split('#');
  const segment = normalizeSegment(rawPath);
  const basePath = segment ? `/${segment}` : '/';
  return hash ? `${basePath}#${hash}` : basePath;
};

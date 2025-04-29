export function isActivePath(currentPath, href) {
  if (currentPath === href) {
    return true;
  }
  if (currentPath === "/" && (href === "/" || href === "/index.html")) {
    return true;
  }
  if (currentPath.includes(href)) {
    return true;
  }
  return false;
}

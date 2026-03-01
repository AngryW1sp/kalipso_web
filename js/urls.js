/**
 * Чистые URL для сайта KALIPSO.
 * При открытии через сервер (run.py) используются пути без .html
 */
window.SITE_URLS = {
  home: "/",
  catalog: "/catalog",
  equipment: "/equipment",
  equipmentCatalog: "/equipment/catalog",
  equipmentProduct: "/equipment/product",
  pool36: "/pool/3x6",
  poolProduct: "/pool/product",
  services: "/services",
  about: "/about",
  contacts: "/contacts"
};

function catalogUrl(cat) {
  return "/equipment/catalog" + (cat ? "?cat=" + encodeURIComponent(cat) : "");
}
function poolProductUrl(id) {
  return "/pool/product" + (id ? "?id=" + encodeURIComponent(id) : "");
}
function equipmentProductUrl(id) {
  return "/equipment/product" + (id ? "?id=" + encodeURIComponent(id) : "");
}

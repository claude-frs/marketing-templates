/*
  Hash routes, so the site runs on GitHub Pages with no server rules:

    #/                                  every product
    #/<product>                         a product's designs
    #/flyer/<type>                      flyers of one type
    #/flyer/<type>/<template-id>        the order screen
*/

const app = document.getElementById("app");
let current = { view: null, templateId: null };

function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const [productId, second, third] = parts;
  if (!productId || !productById(productId)) return { view: "home" };
  if (productId === "flyer" && third) {
    const t = templateById(third);
    if (t && unmetRequirements(t).length === 0) return { view: "order", template: t };
    return { view: "product", productId, typeId: second };
  }
  return { view: "product", productId, typeId: second };
}

function render(route, focusId) {
  unmountOrder();
  if (route.view === "order") app.innerHTML = renderOrder(route.template);
  document.body.classList.toggle("is-order", route.view === "order");
  document.body.classList.remove("no-scroll");
  if (route.view === "home") app.innerHTML = renderHome();
  if (route.view === "product") app.innerHTML = renderProduct(route.productId, route.typeId, focusId);
  if (route.view === "order") mountOrder(route.template);
  const t = route.template;
  document.title = route.view === "order"
    ? `${t.name} · Open House flyer · CENTURY 21 Masters`
    : route.view === "product"
      ? `${productById(route.productId).name} · Marketing Materials · CENTURY 21 Masters`
      : "Marketing Materials · CENTURY 21 Masters";
}

function go() {
  const route = parseRoute();
  const from = current;
  current = { view: route.view, templateId: route.template ? route.template.id : null };

  // Opening a design: the card's preview grows into the left panel.
  // Leaving one: the panel shrinks back into its card.
  const intoOrder = route.view === "order" && from.view === "product";
  const outOfOrder = from.view === "order" && route.view === "product";

  if (intoOrder) {
    const thumb = app.querySelector(`.tile[data-id="${route.template.id}"] .tile__thumb`);
    if (thumb) thumb.style.viewTransitionName = "sheet";
    withTransition(() => { render(route); window.scrollTo(0, 0); });
  } else if (outOfOrder) {
    withTransition(() => {
      render(route, from.templateId);
      const card = app.querySelector(`.tile[data-id="${from.templateId}"]`);
      if (card) card.scrollIntoView({ block: "center" });
    });
  } else {
    const sameProduct = from.view === "product" && route.view === "product";
    render(route);
    if (from.view && !sameProduct) window.scrollTo(0, 0);
    const tab = app.querySelector(".type.is-on");
    if (tab) tab.scrollIntoView({ block: "nearest", inline: "center" });
  }
  if (!intoOrder && !outOfOrder) app.focus({ preventScroll: true });
}

window.addEventListener("hashchange", go);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.getElementById("order")?.classList.contains("is-peek")) setPeek(false);
});

go();

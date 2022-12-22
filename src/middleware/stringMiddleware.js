// next - dispatchni funksiyasini bajaradi
const stringMiddleware = (store) => (next) => (action) => {
  return typeof action === "string" ? next({ type: action }) : next(action);
};

export default stringMiddleware;

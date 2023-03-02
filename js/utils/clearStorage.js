export function clearStorage() {
  document.getElementById("btn-clear").onclick = function clearLocalStorage() {
    window.localStorage.clear();
    window.location.reload();
  };
}

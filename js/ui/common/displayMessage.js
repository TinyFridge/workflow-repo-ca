export function displayMessage(container, messageType, message) {
  const parent =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  const baseClasses = "p-4 mb-4 rounded-lg border";
  let typeClasses = "";

  switch (messageType) {
    case "error":
      typeClasses = "bg-red-100 border-red-400 text-red-700";
      break;
    case "success":
      typeClasses = "bg-green-100 border-green-400 text-green-700";
      break;
    case "warning":
      typeClasses = "bg-yellow-100 border-yellow-400 text-yellow-700";
      break;
    default:
      typeClasses = "bg-gray-100 border-gray-400 text-gray-700";
  }

  parent.innerHTML = `
    <div class="${baseClasses} ${typeClasses}" role="alert">
      ${message}
    </div>
  `;
}

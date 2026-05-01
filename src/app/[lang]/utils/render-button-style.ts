export function renderButtonStyle(type: string) {
  switch (type) {
    case "primary":
      return "btn-primary";
    case "secondary":
      return "btn-secondary";
    default:
      return "btn-secondary";
  }
}

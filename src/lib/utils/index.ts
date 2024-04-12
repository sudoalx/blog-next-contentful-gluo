interface FormatDateOptions {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
}


export function formatDate(
  dateString: string,
  options: FormatDateOptions
): string {
  const { format } = new Intl.DateTimeFormat("en-US", options);
  return format(new Date(dateString));
}

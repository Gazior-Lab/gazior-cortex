export const getStrength = (
  pw: string,
): { score: number; label: string; color: string } => {
  if (!pw) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map: Record<number, { label: string; color: string }> = {
    1: { label: "Weak", color: "bg-destructive" },
    2: { label: "Fair", color: "bg-warning" },
    3: { label: "Good", color: "bg-accent" },
    4: { label: "Strong", color: "bg-success" },
  };
  return { score, ...map[score] };
};

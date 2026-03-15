import { getStrength } from "../../utils/passwordStrength";

const PasswordStrength = ({ password }: { password: string }) => {
  const { score, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= score ? color : "bg-border"}`}
          />
        ))}
      </div>
      <span className="text-[0.72rem] text-muted font-medium">{label}</span>
    </div>
  );
};

export default PasswordStrength
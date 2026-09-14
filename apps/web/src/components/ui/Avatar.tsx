import { initials } from '@/lib/format';

export function Avatar({ name, hue, size = 22 }: { name: string; hue: number; size?: number }) {
  return (
    <span
      className="avatar"
      title={name}
      style={{
        width: size,
        height: size,
        fontSize: size < 20 ? 9 : 10,
        background: `hsl(${hue} 70% 68%)`,
      }}
    >
      {initials(name)}
    </span>
  );
}

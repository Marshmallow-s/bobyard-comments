const COLORS = ["#4f6d7a", "#c0895e", "#7a6d4f", "#5e8c61", "#8c5e7a", "#6d4f7a"];

interface AvatarProps {
  name: string;
}

function Avatar({ name }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const color = COLORS[name.length % COLORS.length];

  return (
    <div className="avatar" style={{ backgroundColor: color }}>
      {initial}
    </div>
  );
}

export default Avatar;
interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export default function FilterButton({ label, active, onClick, icon }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 flex items-center gap-2 transition-colors duration-300 ${
        active
          ? 'bg-accent-primary text-text-primary'
          : 'bg-background-card text-text-secondary hover:bg-background-section'
      }`}
    >
      {icon && icon}
      {label}
    </button>
  );
}
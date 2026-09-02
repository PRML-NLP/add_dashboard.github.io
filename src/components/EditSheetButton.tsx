interface EditSheetButtonProps {
  href?: string;
  label: string;
}

export function EditSheetButton({ href, label }: EditSheetButtonProps) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-md border border-violet-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-violet-600 transition hover:border-violet-300 hover:bg-violet-50 sm:text-sm"
    >
      {label}
    </a>
  );
}

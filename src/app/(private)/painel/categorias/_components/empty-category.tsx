interface EmptyStateProps {
  isSearchActive: boolean;
  searchTerm?: string;
}

export function EmptyCategory({ isSearchActive, searchTerm }: EmptyStateProps) {
  const title = isSearchActive
    ? `Nenhuma categoria encontrada`
    : `Nenhuma categoria cadastrada`;

  const description = isSearchActive
    ? `🔍 Não encontramos nada para '${searchTerm}'`
    : `Organize seu cardápio! Adicione sua primeira categoria para começar.`;

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-lg font-semibold text-foreground mb-2 text-center">
        {title}
      </span>
      <span className="text-sm text-foreground/70 text-center">
        {description}
      </span>
    </div>
  );
}

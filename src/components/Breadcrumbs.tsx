import React from 'react';
import { PageView } from '../types';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  page?: PageView;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate: (page: PageView) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs text-[#8c91a3]" aria-label="Breadcrumb">
      <button
        onClick={() => onNavigate({ name: 'HOME' })}
        className="flex items-center space-x-1 hover:text-[#c5a059] transition-colors"
      >
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="h-3 w-3 text-[#4c5163]" />
          {item.page ? (
            <button
              onClick={() => item.page && onNavigate(item.page)}
              className="hover:text-[#c5a059] transition-colors uppercase tracking-wider"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[#f2f3f7] font-medium uppercase tracking-wider truncate max-w-[200px] sm:max-w-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

import { Image } from "react-grid-gallery";

export interface SearchBarProps {
  searchValue: string;
  onChange: (e: any) => void;
  onSearchButton: () => void;
  onClearButton: () => void;
}

export interface TagType {
  value: string;
  title: string;
}

export interface ImageGridProps {
  images: Image[];
}

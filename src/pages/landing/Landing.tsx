import { useState } from "react";
import { Container } from "react-bootstrap";
import { Image } from "react-grid-gallery";
import { ImageGrid, SearchBar } from "../../components";

const images: Image[] = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 320,
    height: 174,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    alt: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
  },
];

export default function Landing() {
  const [searchValue, setSearchValue] = useState("");

  const searchImages = async () => {};

  return (
    <Container fluid="lg">
      <SearchBar
        searchValue={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClearButton={() => setSearchValue("")}
        onSearchButton={searchImages}
      />
      <ImageGrid images={images} />
    </Container>
  );
}

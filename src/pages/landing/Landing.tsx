import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { ImageGrid, SearchBar } from "../../components";
import useInitialImages from "../../custom-hooks/useInitialImages";

export default function Landing() {
  const [searchValue, setSearchValue] = useState("");
  const [currentImages, setCurrentImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { initialImages, isLoading } = useInitialImages();

  const searchImages = async () => {
    const headers = {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_CLIENT_ID}`,
    };
    const options = {
      headers: headers,
    };
    const imagesRes = await axios.get(
      `${
        process.env.REACT_APP_UNSPLASH_BASE_URL
      }/search/photos?page=${currentPage}&per_page=${pageSize}&query=${searchValue.trim()}`,
      options
    );
    const images = imagesRes.data.results.map((img: any) => {
      return {
        key: img.id,
        src: img.urls.small,
        width: img.width,
        height: img.height,
      };
    });
    setCurrentImages(images);
    setSearchValue((prevVal) => prevVal.trim());
  };

  return (
    <Container fluid="lg" className="mb-5">
      <SearchBar
        searchValue={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onClearButton={() => setSearchValue("")}
        onSearchButton={searchImages}
      />
      {isLoading ? (
        <Card className="mt-3">
          <Card.Body>... Loading ...</Card.Body>
        </Card>
      ) : (
        <ImageGrid
          images={currentImages.length ? currentImages : initialImages}
        />
      )}
    </Container>
  );
}

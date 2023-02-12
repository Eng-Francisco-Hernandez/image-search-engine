import { useState } from "react";
import { Container } from "react-bootstrap";
import { SearchBar } from "../../components";

export default function Landing() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Container fluid="lg">
      <SearchBar
        searchValue={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </Container>
  );
}

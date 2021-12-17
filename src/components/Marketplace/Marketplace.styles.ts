import styled from "styled-components";
import { Button } from "../Button";

export const Wrapper = styled.div`
  background: #f8f8f8;
  padding: 80px 0;
`;

export const Title = styled.h2`
  font-size: 34px;
`;

export const CardsGrid = styled.h2`
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

export const LoadMoreButton = styled(Button)`
  margin: 0 auto;
`;
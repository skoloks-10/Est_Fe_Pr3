import React from "react";
import styled from "styled-components";

const ProductContainer = styled.section`
  margin-top: 6px;
  padding: 20px 16px;
  background-color: white;
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const ProductItem = styled.div`
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductName = styled.p`
  font-size: 14px;
  margin: 6px 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: #f26e22;
`;

const ProductList = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <ProductContainer>
      <SectionTitle>판매 중인 상품</SectionTitle>
      <ProductGrid>
        {products.map((product) => (
          <ProductItem key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price.toLocaleString()}원</ProductPrice>
          </ProductItem>
        ))}
      </ProductGrid>
    </ProductContainer>
  );
};

export default ProductList;

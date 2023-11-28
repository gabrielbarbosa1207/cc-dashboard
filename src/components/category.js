import { useState, useEffect } from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { getIcons } from "../services/icons";

// Styled Components
const CategoryContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 16px;
  font-size: 1em;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  appearance: none;
  background-color: #fff;
  transition: border-color 0.2s;
  outline: none;

  &:focus {
    border-color: #007BFF;
  }
`;

const CategoryArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  pointer-events: none;
  transform: translateY(-50%);
  svg {
    width: 12px;
    height: 12px;
    fill: #007BFF;
  }
`;

const CategoryType = ({ control, fieldName, defaultValue }) => {
    const [categories, setCategories] = useState([])

    useEffect(() =>{
        fetchCategories()
    }, [])

    async function fetchCategories(){
        const response = await getIcons()
        setCategories(response)
    }

    return (
        <CategoryContainer>
            <Controller
                control={control}
                name={fieldName}
                defaultValue={defaultValue}
                render={({ field }) =>(
                    <StyledSelect {...field} defaultValue={defaultValue}>
                         <option value="">Selecione uma Categoria</option>
                        { categories.map((category) =>(
                            <option key={category._id} value={category._id}>
                                { category.name }
                            </option>
                        ))}
                    </StyledSelect>
                )}
            />
            <CategoryArrow>
                <svg viewBox="0 0 24 24">
                    <path d="M6.29 8.77L12 14.48l5.71-5.71A.996.996 0 1016.3 6.3L12 10.59 7.7 6.3A.996.996 0 106.29 8.77z"/>
                </svg>
            </CategoryArrow>
        </CategoryContainer>
    )
}

export default CategoryType;

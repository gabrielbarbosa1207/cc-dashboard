import { useState, useEffect } from "react";
import styled from "styled-components";
import { Controller } from "react-hook-form";
import { getAuthors } from "../services/authors";

// Styled components
const AuthorContainer = styled.div`
  flex: 1;
  margin: 0 10px;
  text-align: center;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007BFF;  // A shade of blue
  }
`;




const Authors = ({ control, fieldName, defaultValue, label }) => {
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        fetchAuthors()
    }, [])

    async function fetchAuthors(){
        const response = await getAuthors()
        setAuthors(response)
    }

    return (
        <AuthorContainer>
            <StyledLabel>{label}</StyledLabel>
            <Controller 
                control={control}
                name={fieldName}
                defaultValue={defaultValue}
                render={({ field }) =>(
                    <StyledSelect {...field} defaultValue={defaultValue}>
                         <option value="">Selecione um Autor</option>
                        { authors.map((author) =>(
                            <option key={author._id} value={author._id}>
                                { author.name }
                            </option>
                        )) }
                    </StyledSelect>
                )}
            />
        </AuthorContainer>
    )
}

export default Authors;

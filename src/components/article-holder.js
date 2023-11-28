import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { getArticles } from "../services/products";
import EditorQuill from "./EditorQuill";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const CardContainer = styled.div`
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
`;

const StyledSelect = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 100%;
`;

const Cards = ({ control, fieldName, defaultValue }) => {

    const [articles, setArticles] = useState([]);
    const [numberOfCards, setNumberOfCards] = useState(defaultValue ? defaultValue.length : 3);


    useEffect(() => {
        fetchCards();
    }, []);

    async function fetchCards() {
        try {
            const response = await getArticles();
            setArticles(response);
        } catch (error) {
            console.log("Unexpected response: ");
        }
    }

    useEffect(() => {
        // Update numberOfCards when defaultValue changes
        if (defaultValue) {
            setNumberOfCards(defaultValue.length);
        }
    }, [defaultValue]);


    return (
        <Container>
            {Array.from({ length: numberOfCards }).map((_, i) => (
                <CardContainer key={i}>
                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].[title]`}
                            defaultValue={defaultValue ? defaultValue[i].title._id : ""}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_title`}>CARTÃO</StyledLabel>
                                    <StyledSelect {...field} id={`article${i}_title`}>
                                        {articles.map(card => (
                                            <option key={card._id} value={card._id} selected={defaultValue && defaultValue[i]?.title?._id === card._id}>
                                                {card.title}
                                            </option>
                                        ))}
                                    </StyledSelect>
                                </>
                            )}
                        />
                    </InputContainer>
                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].rating`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_rating`}>AVALIAÇÃO</StyledLabel>
                                    <StyledInput {...field} type="number" step="0.1" min="0" max="5" id={`article${i}_rating`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].points`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_points`}>PONTOS *opcional</StyledLabel>
                                    <StyledInput {...field} type="text" id={`article${i}_points`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].anuity`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_anuity`}>ANUIDADE *opcional</StyledLabel>
                                    <StyledInput {...field} type="text" id={`article${i}_anuity`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].minimumIncome`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_minimumIncome`}>RENDA MÍNIMA *opcional</StyledLabel>
                                    <StyledInput {...field} type="text" id={`article${i}_minimumIncome`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].pros`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_pros`}>PROS *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_pros`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    
                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].cons`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_cons`}>CONS *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_cons`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].initialOffer`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_initialOffer`}>OFERTA INICIAL *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_cons`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].compensationTax`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_initialOffer`}>TAXA DE RECOMPENSA *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_cons`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].initialLimit`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_initialLimit`}>LIMITE INICIAL *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_cons`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].approvalTime`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_approvalTime`}>TEMPO DE APROVAÇÃO *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_cons`} />
                                </>
                            )}
                        />
                    </InputContainer>

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].creditLimit`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_creditLimit`}>LIMITE DE CRÉDITO *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_cons`} />
                                </>
                            )}
                        />
                    </InputContainer>

                                        
                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].details`}
                            defaultValue=""
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_details`}>DETALHES *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_details`} />
                                </>
                            )}
                        />
                    </InputContainer>
                </CardContainer>
            ))}

            <button type="button" onClick={() => setNumberOfCards(prevCount => prevCount + 1)}>Adicionar Novo Cartão</button>
        </Container>
    );
}

export default Cards;

// Add these styled components to maintain your structure:
const StyledLabel = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
`;

const StyledInput = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    width: 100%;
`;

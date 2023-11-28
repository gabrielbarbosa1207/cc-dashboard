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

const RemoveButton = styled.button`
    margin-top: 10px;
    color: red;
    cursor: pointer;
`;


const AddButton = styled.button`
    margin-top: 10px;
    color: blue;
    cursor: pointer;
    max-width:250px
`;


const Cards = ({ control, fieldName, defaultValue }) => {
    const [articles, setArticles] = useState([]);
    const [cardsData, setCardsData] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await getArticles();
                setArticles(response);
            } catch (error) {
                console.log("Unexpected response: ", error);
            }
        };

        fetchCards();
    }, []);

    useEffect(() => {
        if (defaultValue && defaultValue.length > 0) {
            setCardsData(defaultValue);
        } else {
            setCardsData(Array(3).fill().map(() => ({
                title: {_id: '', title: ''},
                rating: '',
                points: '',
                anuity: '',
                minimumIncome: '',
                pros: '',
                cons: '',
                initialOffer: '',
                compensationTax: '',
                initialLimit: '',
                approvalTime: '',
                creditLimit: '',
                details: ''
            })));
        }
    }, [defaultValue]);

    const addNewCard = () => {
        const newCard = {
            title: {_id: '', title: ''},
            rating: '',
            points: '',
            anuity: '',
            minimumIncome: '',
            pros: '',
            cons: '',
            initialOffer: '',
            compensationTax: '',
            initialLimit: '',
            approvalTime: '',
            creditLimit: '',
            details: ''
        };
        setCardsData([...cardsData, newCard]);
    };

    const removeCard = (index) => {
        const updatedCardsData = [...cardsData];
        updatedCardsData.splice(index, 1);
        setCardsData(updatedCardsData);
    };

    return (
        <Container>
            {cardsData.map((card, i) => (
                <CardContainer key={i}>
                    <InputContainer>
                        <Controller
                            control={control}
                            name={`${fieldName}[${i}].title`}
                            defaultValue={card.title?._id || ""}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_title`}>CARTÃO {i + 1}</StyledLabel>
                                    <StyledSelect {...field} id={`article${i}_title`}>
                                        <option value="">Selecione um Cartão</option>
                                        {articles.map(article => (
                                            <option key={article._id} value={article._id}>
                                                {article.title}
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

                    {/* <InputContainer>
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
                    </InputContainer> */}

                    <InputContainer>
                        <Controller
                            control={control}
                            name={`cards[${i}].initialOffer`}
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_initialOffer`}>OFERTA INICIAL *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_initialOffer`} />
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
                                    <StyledLabel htmlFor={`article${i}_compensationTax`}>TAXA DE RECOMPENSA *opcional</StyledLabel>
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
                            name={`cards[${i}].recomend`}
                            defaultValue=""
                            render={({ field }) => (
                                <>
                                    <StyledLabel htmlFor={`article${i}_recomend`}>Porque Recomendamos *opcional</StyledLabel>
                                    <EditorQuill {...field} type="text" id={`article${i}_recomend`} />
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
                    <RemoveButton type="button" onClick={() => removeCard(i)}>
                        Remover Cartão
                    </RemoveButton>

                </CardContainer>
            ))}
            <AddButton type="button" onClick={addNewCard}>
                Adicionar Novo Cartão
            </AddButton>
        </Container>
    );
};

export default Cards;

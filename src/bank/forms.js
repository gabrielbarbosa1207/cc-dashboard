import axios from "axios"
import { useForm } from "react-hook-form"
import styled from "styled-components";
import Authors from "../components/authors";
import QuillEditor from "../components/Quill";
import { useEffect, useState } from "react";
import BankCard from "../components/cards";


const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: #333;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const StyledForm = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;


const StyledButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;


const AuthorsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const AuthorLabel = styled.label`
  flex: 1;
  text-align: center;
  margin: 0 10px;
`;




function Bank(){

    const { register, handleSubmit, setValue, control } = useForm()

    const [content, setContent] = useState("");
    const [contentBottom, setContentBottom] = useState("");


    useEffect(() =>{
        register('content')
        register('contentBottom')
    },[register])

    useEffect(() =>{
        setValue('content', content)
        setValue('contentBottom', contentBottom)
    }, [content, contentBottom, setValue])


    const onSubmit = async (data) => {
        console.log("Data pusblished: ", data)

        if (!data.writers || !data.checkers || !data.reviewers) {
          alert("Falha ao selecionar autores");
        }
        
      
        data.cards.forEach((card, i) => {
          if(!card.title[i]){
            alert(`Titulo do cartão ${i +1} não foi selecionado corretamente`)
          }
        });
          

        try{
            const response = await axios.post("https://compararcartoes.com.br/cartoes", data)
            console.log(response.data)
            alert("Bank page successfully published")
        } catch(error){
            alert("Bank page publication failed")
            console.log(error)
            throw new Error ("Error to submit new bank page")
        }
    }


    return(
        <AppContainer>
            <Title>Bank Forms</Title>
            <p>Note: this is an experimental build of Comparar Cartões</p>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>

                <p>Slug</p>
                <StyledInput {...register('slug')} placeholder="Santander"/>

                <p>Título</p>
                <StyledInput {...register('title')} placeholder="Melhores Cartões Banco Santander"/>
                
                <AuthorsRow>
                    <AuthorLabel>AUTOR</AuthorLabel>
                    <AuthorLabel>REVISOR</AuthorLabel>
                    <AuthorLabel>CHECADOR</AuthorLabel>
                </AuthorsRow>

                <AuthorsRow>
                    <Authors control={control} fieldName="writers" defaultValue="" />
                    <Authors control={control} fieldName="reviewers" defaultValue="" />
                    <Authors control={control} fieldName="checkers" defaultValue="" />
                </AuthorsRow>

                <p>Conteúdo do Artigo</p>
                <QuillEditor value={content} onChange={setContent} />

                <BankCard control={control} fieldName='cards'  />

                <p>Conteúdo do Artigo</p>
                <QuillEditor value={contentBottom} onChange={setContentBottom} />
                
                <StyledButton type="submit">Submit</StyledButton>
            </StyledForm>
        </AppContainer>
    
    )
}

export default Bank

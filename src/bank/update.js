import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom";
import { getBankContent } from "../services/bankContent";
import axios from "axios";
import styled from "styled-components";
import Authors from "../components/authors";
import QuillEditor from "../components/Quill";
import Cards from "../components/articles";
import BankCard from "../components/cards";


// Styled components
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


function UpdateBank(){

    const { register, handleSubmit, setValue, control } = useForm()

    const [content, setContent] = useState('');
    const [contentBottom, setContentBottom ] = useState("");

    const [bankData, setBankData] = useState([])
    const { slug } = useParams()

    useEffect(() =>{
        fetchContent()
    }, [slug, setValue])

    async function fetchContent(){
        try{
            const response = await getBankContent(slug)
            setBankData(response)
            setContent(response.content)
            setContentBottom(response.contentBottom)
            setValue("title", response.title)

            console.log(response)


                    // If you're fetching cards from the API
        if (response.cards && Array.isArray(response.cards)) {
            // Set default values for each card
            response.cards.forEach((card, index) => {
                setValue(`cards[${index}].title`, card.title._id);
                setValue(`cards[${index}].rating`, card.rating);
                setValue(`cards[${index}].points`, card.points);
                setValue(`cards[${index}].anuity`, card.anuity);
                setValue(`cards[${index}].pros`, card.pros);
                setValue(`cards[${index}].cons`, card.cons);
            });
        }
            console.log(response)
        } catch(error){
            return "Error to fetch bank data"
        }
    }

    useEffect(() =>{
        register('content');
        register('contentBottom');
    }, [register])

    useEffect(() =>{
        setValue('slug', slug)
        setValue('content', content)
        setValue('contentBottom', contentBottom)
    })


    const onSubmit = async(data) =>{

          data.cards.forEach((card, i) => {
            if(!card.title[i]){
              alert(`Titulo do cartão ${i +1} não foi selecionado corretamente`)
            }
          });
            
        try{
            const response = await axios.put(`https://compararcartoes.com.br/cartoes-de-credito/banco/${slug}`, data)
            console.log(response.data)
            alert("Bank page successfully updated")
        } catch(error){
            console.error(error)
            alert("Bank page failed")
        }
    }

    return(
    
    <div>
        <AppContainer>
            <Title>Bank Forms
            </Title>
            <p>
                Note: this is an experimental build of Comparar Cartões
            </p>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledInput {...register('slug')} placeholder="visa-infinity-bradesco" defaultValue={bankData.slug}/>

                <StyledInput {...register('title')} placeholder="visa-infinity-bradesco" defaultValue={bankData.title}/>

                <AuthorsRow>
                <AuthorLabel>AUTOR</AuthorLabel>
                <AuthorLabel>REVISOR</AuthorLabel>
                <AuthorLabel>CHECADOR</AuthorLabel>
            </AuthorsRow>

            <AuthorsRow>
                <Authors key={bankData.writers?._id} control={control} fieldName="writers" defaultValue={bankData.writers?._id} />
                <Authors key={bankData.reviewers?._id} control={control} fieldName="reviewers" defaultValue={bankData.reviewers?._id}  />
                <Authors key={bankData.checkers?._id} control={control} fieldName="checkers" defaultValue={bankData.checkers?._id}  />
            </AuthorsRow>

            <QuillEditor value={content} onChange={setContent} />


            <BankCard control={control} fieldName='cards' defaultValue={bankData.cards}/>

            <QuillEditor value={contentBottom} onChange={setContentBottom} />

            <StyledButton type="submit">Submit</StyledButton>
            </StyledForm>
        </AppContainer>
    </div>)

}

export default UpdateBank
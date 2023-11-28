import "../styles.css"
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../components/articles";
import CategoryType from "../components/category";
import Authors from "../components/authors";
import styled from "styled-components";
import QuillEditor from "../components/Quill";
import { getCatContent } from "../services/categoryContent";
import { useParams } from "react-router-dom";
import * as XLSX from 'xlsx';


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

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
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

export default function UpdateCategory() {

  const { register, handleSubmit, setValue, errors, control, defaultValue } = useForm();
 
  const [content, setContent] = useState('');
  const [cardList, setCardList] = useState('');
  const [articleDescription, setArticleDescription] = useState('')
  const [initialTableData, setInitialTableData] = useState('');
  const [uploadedTableData, setUploadedTableData] = useState('');

  const [catContent, setCatContent] = useState([])
  const { slug } = useParams();


  useEffect(() =>{
    fetchContent()
  },[slug, setValue])

  async function fetchContent(){
    try{
        const response = await getCatContent(slug)
        setCatContent(response)
        setContent(response.content)
        setCardList(response.cardList)
        setArticleDescription(response.articleDescription)
        setValue("title", response.title);
        setInitialTableData(response.tableData);

        // If you're fetching cards from the API
        if (response.cards && Array.isArray(response.cards)) {
            // Set default values for each card
            response.cards.forEach((card, index) => {
                setValue(`cards[${index}].title`, card.title._id);
                setValue(`cards[${index}].rating`, card.rating);
                setValue(`cards[${index}].points`, card.points);
                setValue(`cards[${index}].anuity`, card.anuity);
                setValue(`cards[${index}].minimumIncome`, card.minimumIncome)
                setValue(`cards[${index}].pros`, card.pros);
                setValue(`cards[${index}].cons`, card.cons);
                setValue(`cards[${index}].compensationTax`, card.compensationTax);
                setValue(`cards[${index}].initialLimit`, card.initialLimit);
                setValue(`cards[${index}].approvalTime`, card.approvalTime);
                setValue(`cards[${index}].creditLimit`, card.creditLimit);
                setValue(`cards[${index}].recomend`, card.recomend);
                setValue(`cards[${index}].details`, card.details);
                // ... set other fields as needed
            });
        }

        console.log(response)
    } catch(error){
        console.error("Error fatching content:", error)
    }
  }


  // const editorRef = React.useRef();

  useEffect(() => {
    register('content');
    register('cardList');
    register('articleDescription');
  }, [register]);


  useEffect(() => {
    setValue('slug', slug);
    setValue('content', content);
    setValue('cardList', cardList);
    setValue('articleDescription', articleDescription);
    setValue('tableData', initialTableData);  // Update tableData
}, [content, cardList, articleDescription, initialTableData, setValue]);

const excelToStructuredData = async (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      const workbook = XLSX.read(fileContent, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const htmlTable = XLSX.utils.sheet_to_html(sheet);

      resolve(htmlTable);
    };

    reader.readAsBinaryString(file);
  });
};

const handleFileChange = async (e) => {
  const file = e.target.files[0];

  if (file) {
    const htmlTable = await excelToStructuredData(file);
    setValue('tableData', htmlTable); // Set HTML string for preview
    setUploadedTableData(htmlTable); // Save HTML string for submission
  }
};


  const onSubmit = async (data) => {

    const submittedData = {
      ...data,
      tableData: uploadedTableData || initialTableData,
    };

    
  console.log("Published data: ", submittedData);

  submittedData.cards.forEach((card, i) => {
    if(!card.title[i]){
      alert(`Titulo do cartão ${i +1} não foi selecionado corretamente`)
    }
  });
    
  // Submit the main form datas
  try {
    const response = await axios.put(`https://compararcartoes.com.br/cartoes-de-credito/${slug}`, submittedData)
    alert("Página de categorias atualizada com sucesso");
    console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Falha ao atualizar página de categorias");
    }
  };


  return (
    <AppContainer>
      <Title>Category Forms</Title>
      <p>Note: this is an experimental build of Comparar Cartões</p>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>

      <p>Nome da Categoria</p>

      <CategoryType key={catContent.categoryName?._id} control={control} fieldName="categoryName" defaultValue={catContent.categoryName?._id} />
        <p>Slug</p>
        <StyledInput {...register('slug')} placeholder="visa-infinity-bradesco" defaultValue={catContent.slug}/>
        
        <p>Título</p>
        <StyledInput {...register('title')} placeholder="Bradesco Visa Infinite" defaultValue={catContent.title}/>

          <AuthorsRow>
            <AuthorLabel>AUTOR</AuthorLabel>
            <AuthorLabel>REVISOR</AuthorLabel>
            <AuthorLabel>CHECADOR</AuthorLabel>
          </AuthorsRow>

          <AuthorsRow>
            <Authors key={catContent.writers?._id} control={control} fieldName="writers" defaultValue={catContent.writers?._id} />
            <Authors key={catContent.reviewers?._id} control={control} fieldName="reviewers" defaultValue={catContent.reviewers?._id}  />
            <Authors key={catContent.checkers?._id} control={control} fieldName="checkers" defaultValue={catContent.checkers?._id}  />
        </AuthorsRow>


        {/* <Editor ref={editorRef} /> */}
        <p>Conteúdo do Artigo</p>
        <QuillEditor value={content} onChange={setContent}/>
        <br />

        <p>Lista de Cartões</p>
        <QuillEditor value={cardList} onChange={setCardList} />

        <br />

        <p>Tabela de Cartões</p>
        <p>Upload Excel Table</p>
        <StyledInput
          type="file"
          onChange={handleFileChange}
          accept=".xlsx, .xls"
        />  
      
        <br />

        <Cards control={control} fieldName='cards' defaultValue={catContent.cards}/>


        {/* <StyledTextarea rows={10} {...register('articleDescription')} /> */}
        
        <p>Conteúdo do Artigo</p>
        {/* <div>
          { catContent.tableData }
        </div> */}
        <QuillEditor value={articleDescription} onChange={setArticleDescription} />

        <br />

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </AppContainer>
  );
} 

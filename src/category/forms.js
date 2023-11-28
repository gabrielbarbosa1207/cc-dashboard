import "../styles.css"
import Editor from "../Editor";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {$generateHtmlFromNodes} from "@lexical/html"
import axios from "axios";
import Cards from "../components/articles";
import CategoryType from "../components/category";
import Authors from "../components/authors";
import styled from "styled-components";
import QuillEditorWithTables from "../components/Quill";
import QuillEditor from "../components/Quill";
import EditableTable from "../components/table";
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


// Function to convert Excel file to HTML string
const excelToHtmlString = (file, setTableData) => {
  const reader = new FileReader();

  reader.onload = (e) => {
    const fileContent = e.target.result;
    const workbook = XLSX.read(fileContent, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const htmlTable = XLSX.utils.sheet_to_html(sheet);

    setTableData(htmlTable);
  };

  reader.readAsBinaryString(file);
};

export default function Category() {

  const { register, handleSubmit, setValue, errors, control } = useForm();
 
  const [content, setContent] = useState('');
  const [cardList, setCardList] = useState('');
  const [articleDescription, setArticleDescription] = useState('')
  const [tableData, setTableData] = useState([]);


  // const editorRef = React.useRef();

  useEffect(() => {
    register('content');
    register('cardList');
    register('articleDescription');
    register('tableData');  // Register tableData
  }, [register]);


  useEffect(() => {
    setValue('content', content);
    setValue('cardList', cardList);
    setValue('articleDescription', articleDescription);
    setValue('tableData', tableData);  // Update tableData
}, [content, cardList, articleDescription, tableData, setValue]);


  const onSubmit = async (data) => {
  

  console.log("Data published: ", data);

  
  if(!data.categoryName){
    alert("Categoria não selecionada")
  }

  if(!data.tableData){
    alert("Tabela não selecionada")
    
  }
  if (!data.writers || !data.checkers || !data.reviewers) {
    alert("Falha ao selecionar autores");
  }
  

  data.cards.forEach((card, i) => {
    if(!card.title[i]){
      alert(`Titulo do cartão ${i +1} não foi selecionado corretamente`)
    }
  });
    
  // Submit the main form datas
  try {
    const response = await axios.post('https://compararcartoes.com.br/cartoes-de-credito/', data)
    alert("Página de categorias publicada com sucesso");
    console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Falha ao publicar categoria");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Convert the Excel file to HTML string
      excelToHtmlString(file, setTableData);
    }
  };

  return (
    <AppContainer>
      <Title>Category Forms</Title>
      <p>Note: this is an experimental build of Comparar Cartões</p>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>

      <p>Nome da Categoria</p>

      <CategoryType control={control} fieldName="categoryName" defaultValue="" />
        <p>Slug</p>
        <StyledInput {...register('slug')} placeholder="visa-infinity-bradesco" />
        
        <p>Título</p>
        <StyledInput {...register('title')} placeholder="Bradesco Visa Infinite" />

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

        {/* <Editor ref={editorRef} /> */}
        <p>Conteúdo do Artigo</p>
        <QuillEditor value={content} onChange={setContent} />
        <br />

        <p>Lista de Cartões</p>
        <QuillEditor value={cardList} onChange={setCardList} />

        <br />
        
        <p>Tabela de Cartões</p>
        <p>Upload Excel File</p>
        <input type="file" onChange={handleFileChange} accept=".xlsx, .xls" />

      <br />
        
        
        {/* <EditableTable value={tableData} onTableChange={setTableData} /> */}


        <br />

        <Cards control={control} fieldName='cards'  />


        {/* <StyledTextarea rows={10} {...register('articleDescription')} /> */}

        <p>Conteúdo do Artigo</p>
        <QuillEditor value={articleDescription} onChange={setArticleDescription} />

        <br />

        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
    </AppContainer>
  );
} 

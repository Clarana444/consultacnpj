import { useState } from "react"; 
import { FiSearch } from "react-icons/fi"; 
import './style.css';
import api from "./services/api" 

//Criado duas variáveis para declarar e indicar 
 function App() {
  
  const [input, setInput] = useState('');
  const [cnpj, setCNPJ] = useState(''); 
 //uma função assicrona

  async function handleSearch(){
 //verifica se o usuario preencheu o campo do cep se não preencheu ele avisa o que está em "" 
 if(input === ''){ alert("Preencha algum CNPJ!")
   return; 
  } 
  // try executa o que quer que aconteça para dar certo, se der errado ele se dirige para o catch
   try{ const response = await api.get(`${input}`) 
   setCNPJ(response.data)
  setInput("") 
  }catch{ 
  alert("Erro ao buscar CNPJ!") 
  setInput("") 
}
 } 
 //retorna o comando, input: mostra a informação que deve inserir ; onclick possibilita a chamda de uma equisição
  return (
     <div className="container"> 
          <h1 className="title">Consultar CNPJ</h1>
        <div className="containerInput"> 
          <input type="text" placeholder="Digite o cnpj..."
              value={input} onChange={(e) => setInput(e.target.value)} />
            <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color="#FFF"/>
            </button> 
        </div> 
            {Object.keys(cnpj).length > 0 && 
      ( <main className="main">
       <h2>Razão Social: {cnpj.razao_social}</h2> 
       <span>Fundação: {cnpj.data_inicio_atividade}</span>
        <span>Situação Cadastral: {cnpj.descricao_situacao_cadastral}</span>     
        <span>Contato: {cnpj.ddd_fax}</span>  
         </main>
          )} 
          </div> 
          ); 
        }


export default App;

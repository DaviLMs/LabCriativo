'use client'; // para funcionar e preciso ter isso para aparecer para o client
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState(""); // guarda um valor que possa ser alterado
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  async function login() { // assincrono
    setLoading(true); // carregando
    setError(null); // erro
    setSuccessMessage(""); // mensagem de sucesso

    const body = { //conteudo dos inputs
      username, // nome
      password, // senha
      expiresInMins: 30, // tempo
    };

    try { // tentar
      const response = await fetch('https://dummyjson.com/user/login', { // url
        method: 'POST', // metodo
        headers: { // cabecalho que faz a requisição de login
          'Content-Type': 'application/json', //aqui passa o formato que e content-type
        },
        body: JSON.stringify(body), // aqui passa o conteudo que e o username e password
      });

      if (!response.ok) { // se o status for diferente de 200
        throw new Error(`Erro no servidor: ${response.status}`); // mostre a mensagem de erro
      }

      const contentType = response.headers.get('Content-Type'); // pega o conteudo de resposta 

      if (contentType && contentType.includes('application/json')) { // se o conteudo for json
        const result = await response.json(); // pega o json
        console.log(result); // mostra o json
        setSuccessMessage(`Login realizado com sucesso: ${response.status}`); // mostra mensagem de sucesso

      } else { // se o conteudo nao for json
        const text = await response.text(); // pega o texto
        throw new Error(`Formato de resposta inesperado: ${text}`); // mostra o erro
      }
    } catch (err) { // se der erro
      setError(err.message); // mostra o erro
    }

    setLoading(false); // carregando
  }

  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ gap: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1 }} >
        <h1 style={{ width: '100%', textAlign: 'center' }}>Login</h1>
        <input style={{ marginBottom: '20px' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button style={{ padding: '10px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }} onClick={login} disabled={loading}>
          {loading ? <span>Loading...</span> : <h1>Login</h1>}
        </button>
        {successMessage && <p >{successMessage}</p>}
        {error && <p >{error}</p>}
      </div>
      <p>
        nome: emilys
        <br />
        senha: 'emilyspass'
      </p>
    </div>
  );
}

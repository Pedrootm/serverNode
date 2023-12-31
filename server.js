const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors'); // Importe o pacote CORS

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors()); // Habilite o CORS para todas as rotas



app.get('/search', async (req, res) => {
   try {
    
 const keyword = req.query.s; // Obtém o valor do parâmetro "s" da URL

    // Verifica se o parâmetro "s" foi fornecido
    if (!keyword) {
      return res.status(400).send('Parâmetro "s" ausente na URL');
    }

    // Faz a solicitação para a página web com base no URL fornecido
    const response2 = await axios.get(`https://www.anitube.vip/busca.php?s=${keyword}&submit=Buscar`)
.catch(function (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
  });

      
  
      
    // Carrega o conteúdo HTML da página
    const $ = cheerio.load(response.data);

    // Encontra a div com a classe "list_itens" e obtém seu conteúdo
    const listItensContent = $('.lista_de_animes').html();
   
 // Envia o conteúdo da div como resposta
    res.send(listItensContent);
  } catch (error) {
    res.status(500).send('Erro ao buscar a página web do anime.');
  }
});



app.get('/scrape', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).send('URL não fornecido.');
  }

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const divWithClassLeft = $('.left').html();

    res.send(divWithClassLeft);
  } catch (error) {
    res.status(500).send('Erro ao buscar e analisar o conteúdo da página.');
  }
});


app.get('/video', async (req, res) => {
  try {
    const animeUrl = req.query.url; // Obtém o valor do parâmetro "url" da URL

    // Verifica se o parâmetro "url" foi fornecido
    if (!animeUrl) {
      return res.status(400).send('Parâmetro "url" ausente na URL');
    }

    // Faz a solicitação para a página web com base no URL fornecido
    const response = await axios.get(animeUrl);

    // Carrega o conteúdo HTML da página
    const $ = cheerio.load(response.data);

    // Encontra a div com a classe "ani-info" e obtém seu conteúdo
    const aniInfoContent = $('.vp_vc').html();

    // Envia o conteúdo da div como resposta
    res.send(aniInfoContent);
  } catch (error) {
    res.status(500).send('Erro ao buscar a página web do anime.');
  }
});










app.get('/search2', async (req, res) => {
  try {
    
 const keyword = req.query.s; // Obtém o valor do parâmetro "s" da URL

    // Verifica se o parâmetro "s" foi fornecido
    if (!keyword) {
      return res.status(400).send('Parâmetro "s" ausente na URL');
    }

    // Faz a solicitação para a página web com base no nome fornecido
    const response = await axios.get(`https://www.anitube.vip/busca.php?s=${keyword}&submit=Buscar`);



    // Carrega o conteúdo HTML da página
    const $ = cheerio.load(response.data);

    // Encontra a div com a classe "list_itens" e obtém seu conteúdo
    const listItensContent = $('.lista_de_animes').html();

    // Envia o conteúdo da div como resposta
    res.send(listItensContent);
  } catch (error) {
    res.status(500).send('Erro ao buscar a página web.');
  }
});


app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução em http://localhost:${PORT}`);
});

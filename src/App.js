import React, {useState, useEffect} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

let quoteDBUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const [quote, setQuote] = useState("It does not matter how slowly you go as long as you do not stop.")
  const [author, setAuthor] = useState("Confucius")
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setquotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setquotesArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(102*Math.random())
    setQuote(quotesArray[randomInteger].quote)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setAuthor(quotesArray[randomInteger].author)
    setRandomNumber(randomInteger)
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <p id="text">
            "{quote}"
          </p>
          <p id="author">- {author}</p>
          <div className="button">
            <a id="tweet-quote" style={{backgroundColor: accentColor}}  href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} ><FontAwesomeIcon icon={faTwitter} /></a>
          </div>

          <button id="new-quote" style={{backgroundColor: accentColor}} onClick={() => getRandomQuote()}>Generate a Random Quote
          </button>
        </div>
        
      </header>
    </div>
  );
}

export default App;

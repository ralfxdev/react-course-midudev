import { useEffect, useState } from "react";
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

export function App() {
    const [fact, setFact] = useState('lorem ipsum cat fact whatever')
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data
                setFact(fact)
                const firstWord = fact.split(' ', 3).join(' ')

                fetch(`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`)
                    .then(res => res.json())
                    .then(data => {
                        const { url } = data
                        setImageUrl(url)
                    })
            })
    }, [])

    return (
        <main>
            <h1>App de Gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt='cat' />}
        </main>
    )
}

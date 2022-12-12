import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await fetch(
          "https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json"
        );

        setPokemon(await res.json());
      } catch (error) {
        console.log(error);
      }
    };

    getPokemon();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>

      <main className={styles.main}>
        <h1>Pokemon List</h1>
        <div className={styles.grid}>
          {pokemon.map((pokemon) => (
            <div className={styles.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <img
                  src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

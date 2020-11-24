import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-unfetch'
function Home({data}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          PSP page
        </h1>

    
        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <img src={data.images.url} alt="my image" />
            <h3>{data.name}</h3>
            <p>Now £{data.price[0].gbp}</p>
            <p>Sizes <select>
                {data.sizes.map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </select>
            </p>
          </a>

         
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/lingerie')
  const json = await res.json()
  return { data: json }
}

export default Home
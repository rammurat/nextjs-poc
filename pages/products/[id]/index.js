import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

function PSP({data}) {
  return (
    <div >
      <main >
        <h1 >
          Products
        </h1>
    
        <div >
          <a href="#" >
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

          <Link href="/post/[id]/[comment]" as={`/post/${data.id}/first-comment`}>
            <a>First comment</a>
          </Link>
         
        </div>
      </main>
    </div>
  )
}

PSP.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/lingerie')
  const json = await res.json()
  return { data: json }
}

export default PSP
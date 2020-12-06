import Layout from '../components/layout'
import {getNavMenuData} from '../services/apis'

function Error({ statusCode, nav }) {
    return (
      <Layout {...nav}>
        <div className="card text-center m-5">
          <h5 className="card-header">Error!</h5>
          <div className="card-body">
            <h5 className="card-title">{statusCode
            ? <p>An error {statusCode} occurred on server</p>
            : 'An error occurred on client'}</h5>
          </div>
        </div>
      </Layout>
    )
  }
  
Error.getInitialProps = async ({ res, err }) => {
  // Fetch data from external API
  const nav = await getNavMenuData()
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404

  return { statusCode, nav }
}
  
export default Error
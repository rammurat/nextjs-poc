import Layout from '../components/layout'

function Error({ statusCode }) {
    return (
      <Layout>
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
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error
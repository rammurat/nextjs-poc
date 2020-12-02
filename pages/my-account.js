import { useSession } from 'next-auth/client'
import AccessDenied from '../components/access-denied'

function MyAccount() {
    const [ session, loading ] = useSession()

    // If no session exists, display access denied message
    if (!session) { return  <AccessDenied/> }

    return <div>
    <div className="jumbotron">
        <div className="container">
            <h1 className="display-3">{session.user.name}</h1>
            <h2>{session.user.email}</h2>
        </div>
    </div>

    <div className="container">
        <div className="row">
        <div className="col-md-4">
            <h2>Heading</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div className="col-md-4">
            <h2>Heading</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div className="col-md-4">
            <h2>Heading</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a className="btn btn-secondary" href="#" role="button">View details &raquo;</a></p>
        </div>
        </div>
        <hr/>
    </div>
  </div>
}
  
export default MyAccount
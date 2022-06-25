import NavBar from './NavBar'
import { Card, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import profile from '../images/profile.jpg'
import ItemContainer from './ItemContainer'

function ProfilePage () {
  return (
    <>
      <NavBar />
      <Card.Header className="text-center" as='h4'>My Profile</Card.Header>
      <>
        <Card className="text-center" style={{ width: '' }}>
          <Row className="card-example d-flex flex-row flex-nowrap overflow-auto">
            <div className="col-md-4">
              <Card.Img variant="top" rounded src={profile} />
              <Card.Body>
                <Card.Title>Jane Doe</Card.Title>
                <Card.Text>I'm new to the neighbourhood and I enjoy baking! Looking forward to borrow many kitchen related items.</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>janedoe@email.com</ListGroupItem>
                <ListGroupItem>(7XX)-XXX-XXXX</ListGroupItem>
                <ListGroupItem>UBC Vancouver</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href="#">Edit Profile</Card.Link>
                <Card.Link href="#">Sign Out</Card.Link>
              </Card.Body>
            </div>
            <div className="col-md-8">
              <ItemContainer/>
            </div>
          </Row>
        </Card>
      </>
    </>
  )
}

export default ProfilePage

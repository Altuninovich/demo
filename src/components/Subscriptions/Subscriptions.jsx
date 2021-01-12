import React from "react";
import {Card, Container, ListGroup, ListGroupItem} from "react-bootstrap";

const renderCard = (user) => {
    return (
        <Card style={{ width: '18rem', marginTop: "20px" }}>
            <Card.Img variant="top" src={user.photos.large} />
            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                    {user.status}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
            </ListGroup>
        </Card>
    )
}

const Subscriptions = (props) => {
    const {usersInSubscription} = props;
    debugger;
    return (
       <Container>
           {usersInSubscription.map((user) => renderCard(user))}
       </Container>
    )

}

export default Subscriptions;
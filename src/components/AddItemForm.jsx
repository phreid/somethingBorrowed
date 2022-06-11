import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const ITEM_TYPES = [
    {id: 0, name: 'Kitchen'},
    {id: 1, name: 'Tools'},
    {id: 2, name: 'Outdoors'},
];

const LOCATIONS = [
    {id: 0, name: 'UBC Campus'},
];

export default function AddItemForm(props) {
    const itemTypeDropdowns = ITEM_TYPES.map((type) => {
        return <option key={type.id}>{type.name}</option>
    });

    const locationDropdowns = LOCATIONS.map((location) => {
        return <option key={location.id}>{location.name}</option>
    });

    const [switchIsAvailable, setSwitchIsAvailable] = useState(true);

    return (
        <>
            <h2>Lend a New Item</h2>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Item Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the name of your item"></Form.Control>
                </Form.Group>
                <Row>
                    <Form.Group as={Col} sm className="mb-3">
                        <Form.Label>Type</Form.Label>
                        <Form.Select>
                            <option>Select an item type...</option>
                            {itemTypeDropdowns}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} sm className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Select disabled>
                            {locationDropdowns}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} xs={8} controlId="formFileDisabled" className="mb-3">
                        <Form.Label>Upload an image</Form.Label>
                        <Form.Control type="file" disabled />
                    </Form.Group>
                    <Form.Group as={Col} sm className="d-flex align-items-end mb-3">
                        <Form.Switch
                            checked={switchIsAvailable}
                            onChange={() => setSwitchIsAvailable(!switchIsAvailable)}
                            label={"Make item available"}
                            className={switchIsAvailable ? "" : "text-muted"} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter a description of your item"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" className="me-1">Submit</Button>
                <Button variant="danger" type="reset">Reset</Button>
            </Form>
        </>
    );
}
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import logo from "../assets/Hotdog.svg";
import "../style/CreateRecipe.css";
import AddIngredientApp from "../components/AddIngredientApp";

export default function CreateRecipe() {
    return (
        <div>
            <Container>
                <div className={"topContainer"}>
                    <h1>MY RECIPE</h1>
                </div>
            </Container>
            <Container>
                <div className={"formContainer"}>
                    <Row>
                        <Col>
                        <AddIngredientApp></AddIngredientApp>
                        </Col>
                        <Col>
                            <img src={logo} alt={"logo"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <textarea></textarea>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from "react";

interface IngredientInputIF{
    addIngredient: (value:string) => void;
}
export default function IngredientInput(addFunction : IngredientInputIF){

    const [newIngredient, setNewIngredient] = useState<string>("");

    function addNewIngredient(){
        addFunction.addIngredient(newIngredient);
        setNewIngredient("");
    }
    return(
        <div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Add ingredient"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={newIngredient}
                    onChange={e => (setNewIngredient(e.target.value))}
                    onKeyDown={e =>
                        {
                            if(e.key === "Enter") {
                                addNewIngredient();
                            }
                        }
                    }
                />
                <Button id="button-addon2" onClick={addNewIngredient}>
                    Add
                </Button>
            </InputGroup>
        </div>
    )
}
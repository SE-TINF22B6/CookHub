import React from "react";
import Button from 'react-bootstrap/Button';

interface Ingredient{
    id:number;
    value: string;
    onDelete : (id:number) => void;
}

export default function Ingredient(ingredient: Ingredient){


    return(
        <li>
            {ingredient.value}
            <Button style={{margin:"5px"}} onClick={() => ingredient.onDelete(ingredient.id)}>X</Button>
        </li>

    )
}
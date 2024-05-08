import {styled} from "@mui/material/styles";
import React, {useRef, useState} from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from "@mui/material/Button";
import "../style/ImageUploader.css";
import asset from "../assets/recipes/uploader.png";

export default function ImageUploader() {

    const [url, setUrl] = useState(asset);
    const [error, setError] = useState("");
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const fileUploadRef: any = useRef();

    function uploadImageDisplay() {
        const file = fileUploadRef.current.files[0];
        if (file && /^image\//.test(file.type)) { // Check if the file is an image
            getBase64(file);
            setError("");
        } else {
            setError('File is not an image.');
        }
    }

    function getBase64(file: File) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            // @ts-ignore
            setUrl(reader.result);
            console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            setError('Error reading file');
        };
    }

    function triggerFileUpload() {
        fileUploadRef.current.click(); // Simulate a click on the file input
    }

    return (
        <>
            <div className={"ImageInput"}>
                <img src={url} onClick={triggerFileUpload} alt={"Recipe"}/>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<AddAPhotoIcon/>}
            >
                Upload Image
                <VisuallyHiddenInput type="file" ref={fileUploadRef} onChange={uploadImageDisplay} accept={"image/*"}/>
            </Button>
        </>
    );

}
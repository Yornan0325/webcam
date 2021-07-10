import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import getFirebase from "./FirebaseConfig";

const WebCam = () => {
    const user = "jhornan";
    const refs = useRef(null);
    const firebase = getFirebase();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imageB64, setImageB64] = useState(null)

    console.log(uploadedImage)


    const b64toFile = (b64Data) => {
        const byteArrays = dataURItoBlob(b64Data);
        // const file = new File(byteArrays);
        return byteArrays;
    }


    const capture = () => {
        const imageSrc = refs.current.getScreenshot();
        // b64toFile( imageSrc, 'image/jpeg')
        setImageB64(imageSrc)
        b64toFile(imageSrc, 'image/jpeg')
    };


    const dataURItoBlob = (uploadedImage) => {
        // convertir base64 en datos binarios sin procesar contenidos en una cadena
        const byteString = atob(uploadedImage.split(',')[1]);

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        setUploadedImage(new Blob([ab], { type: 'image/jpeg' }))
    }


    //  console.log(uploadedImage)

    //Boton envia foto a storage
    const sendImageToFirebse = (e) => {
        e.preventDefault();
        const storageRef = firebase.storage().ref("Image");
        const connectedRef = firebase.database().ref(".info/connected");

        connectedRef.on("value", (snap) => {
            if (snap.val() === true) {
                console.log("Conectado");
                const thisRef = storageRef.child(`/${user}`);
                thisRef
                    .put(uploadedImage)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((e) => {
                        console.log("Error" + e);
                    });
            } else {
                console.log("Sin conexion");
            }
        });
    };
    const videoConstraints = {
        facingMode: "user",

        width: {
            min: 200,
            max: 240
        },
        height: {
            min: 200,
            max: 720

        }
        // width: 320,
        // height: 180,
        // facingMode: "user"
    };
    return (
        <>
            <h1 className="title ">WebCam</h1>
            <div className="box">
                <Webcam
                    audio={false}
                    height={350}
                    ref={refs}
                    screenshotQuality={0.8}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                    forceScreenshotSourceSize="true"
                />
                <div className="box">
                    <button className="button is-info" onClick={capture}>
                       <p className="title is-4">Tomar foto</p>  
                    </button>
                </div>
            </div>
            <div className="box ">
                {[imageB64].map((image) => {
                    return (
                        <div key={image} className="image">
                            <div
                                className="card rounded-right"
                                style={{
                                    width: "1024",
                                    height: "150",
                                    display: "inline-block"
                                }}
                            >
                                <figure className="avatar">
                                    <img alt="Sin imagen" src={image} />
                                </figure>
                            </div>
                            <div className="box mt-4 pt-6">
                                {uploadedImage ? (
                                    <button
                                        className="button is-info"
                                        onClick={sendImageToFirebse}
                                    >
                                        <p className="title is-4">Enviar </p> 
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default WebCam;

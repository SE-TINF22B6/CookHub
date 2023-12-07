import React from 'react';

function InfoCardContent() {
    const cardContent = `
        <div>
            <h2>Zutaten:</h2>
            <ul>
                <li>120 g Pilze</li>
                <li>2,0 cm Ingwer</li>
                <li>2 Knoblauchzehen</li>
                <li>2 Pak Choi</li>
                <li>1 Frühlingszwiebel</li>
                <li>4 Eier</li>
                <li>2 EL Sesamöl</li>
                <li>50 g Misopaste</li>
                <li>2 EL Sojasauce</li>
                <li>1 EL Apfelessig</li>
                <li>1,5 l Gemüsebrühe</li>
                <li>250 g Ramen-Nudeln</li>
                <li>1 EL Sesamsamen</li>
            </ul>
            <h2>Anleitung:</h2>
            <ol>
                <li><strong>Gemüse vorbereiten:</strong> Pilze vierteln; Ingwer und Knoblauch fein hacken. Pak Choi in Streifen und Frühlingszwiebel in Ringe schneiden.</li>
                <li><strong>Eier kochen:</strong> Eier 6 Minuten kochen, dann pellen und halbieren.</li>
                <li><strong>Anbraten:</strong> Sesamöl in einem Topf erhitzen. Ingwer und Knoblauch anbraten.</li>
                <li><strong>Brühe zubereiten:</strong> Pilze, Misopaste, Sojasauce, Apfelessig und Gemüsebrühe in den Topf geben. Zum Kochen bringen und 5 Minuten köcheln lassen.</li>
                <li><strong>Nudeln hinzufügen:</strong> Ramen-Nudeln und Pak Choi hinzufügen, 2 Minuten kochen.</li>
                <li><strong>Servieren:</strong> Suppe in Schüsseln verteilen. Je eine halbe Ei hinzufügen, mit Frühlingszwiebelringen und Sesamsamen garnieren.</li>
            </ol>
        </div>
    `;

    return <div dangerouslySetInnerHTML={{ __html: cardContent }} />;
}

export default InfoCardContent;





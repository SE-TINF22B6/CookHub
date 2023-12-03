import logo from "./assets/Logo_no_background.svg";
import React from "react";

export default function ImpressumPage(){
    return(

        <div className="ImpressumPage">
            <header className="header">
                <title>Impressum</title>
            </header>
            <div className="body">
                <h1>Impressum</h1>

                <h2>Angaben gemäß § 5 TMG:</h2>
                <p>
                    Male Stick<br />
                    Musterstraße 123<br />
                    76222 Karlsruhe</p>

                <h2>Kontakt:</h2>
                <p>Telefon: 01234 56789<br />
                    E-Mail: <a href="mailto:male.stick@softwareengineering.com">male.stick@softwareengineering</a></p>

                <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
                <p>
                    Marc Siegfarth<br/>
                    Nick Hörner<br/>
                    Stefan Mergl<br/>
                    Len Vesjada
                </p>

                <h2>Haftungsausschluss (Disclaimer):</h2>
                <h3>Haftung für Inhalte</h3>
                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. ...</p>

                <h3>Haftung für Links</h3>
                <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. ...</p>

                <h3>Urheberrecht</h3>
                <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. ...</p>

                <img src={logo} className="App-logo" alt="logo" width="500" height="500"/>

                <ul>
                    <li><a className='LandingPage' target="_self" href='/'>Welcome</a></li>
                    <li><a href='/login'>Login</a></li>
                    <li><a href='/faqs'>FAQ's</a></li>
                    <li><a href='/about'>About us</a></li>
                </ul>


            </div>

        </div>
    );
}
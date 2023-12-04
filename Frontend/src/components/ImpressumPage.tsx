import logo from "../assets/Logo_no_background.svg";
import * as React from 'react';
import "../design/ImpressumPage.css"

export default function ImpressumPage(){

    return(

        <div className="ImpressumPage">

            <header className="App-header">
                <a className='Home-link' target="_self" href='/'>
                    <img src={logo} className="App-logo" alt="logo"/>
                </a>
                <ul>
                    <a className='FAQs-link' target="_self" href='/faqs'>FAQ's</a>
                    <a className='About-link' target="_self" href='/about'>About us</a>
                    <a className='Impressum-link' target="_self" href='/impressum'>Impressum</a>
                </ul>
            </header>

            <div className="body">

                    <div className="content">

                        <h1>Impressum</h1>
                        <br/><br/>

                        <h2>Angaben gemäß § 5 TMG:</h2>
                        <br/>
                        <p>
                            Male Stick<br />
                            Musterstraße 123<br />
                            76222 Karlsruhe</p>
                        <br/><br/>

                        <h2>Kontakt:</h2>
                        <br/>
                        <p>Telefon: 01234 56789<br />
                            E-Mail: <a href="mailto:male.stick@softwareengineering.com">male.stick@softwareengineering</a></p>
                        <br/>

                        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
                        <p>
                            Marc Siegfarth<br/>
                            Nick Hörner<br/>
                            Stefan Mergl<br/>
                            Len Vesjada
                        </p>
                        <br/><br/>

                        <h2>Haftungsausschluss (Disclaimer):</h2>
                        <br/><br/>

                        <h3>Haftung für Inhalte</h3>
                        <br/>
                        <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. ...</p>
                        <br/><br/>

                        <h3>Haftung für Links</h3>
                        <br/>
                        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. ...</p>
                        <br/><br/>

                        <h3>Urheberrecht</h3>
                        <br/>
                        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. ...</p>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                    </div>

            </div>


        </div>
    );
}
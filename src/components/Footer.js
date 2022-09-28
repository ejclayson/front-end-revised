import React from "react";
import { Image } from 'react-bootstrap';
import "./Footer.css";


const Footer = () => {
    return (

        <div className="basic-navbar-nav main-footer mb-0">
            <div className="container justify-content-around">

                <div className="row">

                    {/* Column1 */}

                    <div className="col">
                        <h5>PRETTYFULL COLLECTIONS</h5>
                        <ui className="list-unstyled">
                            <li>Lot 12 Bock 136 Kasaganahan St.</li>
                            <li>Gate 5 Karangalan Village </li>
                            <li>Brgy Manggahan</li>
                            <li>Pasig City, Metro Manila</li>
                        </ui>
                    </div>

                    {/* Column2 */}

                    <div className="col">
                        <h5>E-COMMERCE APPS/LINKS</h5>
                        <ui className="list-unstyled">
                            <a href="https://shopee.ph/prettyfullcollections" target="_blank">
                                <li><Image src="/images/sh.png" />
                                    prettyfullcollections
                                </li>
                            </a>
                            <a href="https://www.lazada.com.ph/shop/prettyfullcollections" target="_blank">
                                <li><Image src="/images/lz.png" />
                                    prettyfullcollections
                                </li>
                            </a>
                        </ui>
                    </div>

                    {/* Column3 */}

                    <div className="col">
                        <h5>SOCIAL MEDIA LINKS</h5>
                        <ui className="list-unstyled">
                            <a href="https://www.facebook.com/Prettyfull-Collections-108663461868654" target="_blank">
                                <li>
                                    <Image src="/images/fb.png" />
                                    PrettyfullCollections
                                </li>
                            </a>
                            <a href="https://www.instagram.com/prettyfullcollections/" target="_blank">
                                <li><Image src="/images/ig.png" />
                                    prettyfullcollections
                                </li>
                            </a>
                        </ui>
                    </div>


                    {/* Column3 */}


                    <div className="col">
                        <h5>EMAIL & CONTACT NUMBERS</h5>
                        <ui className="list-unstyled">
                            <li><Image src="/images/em.png" />prettyfullcollections@gmail.com</li>
                            <li><Image src="/images/cp.png" />09052894847 / 09192769064</li>
                        </ui>
                    </div>

                </div>

            </div>


            <hr />
            <div className="container justify-content-center">
                <div className="row">
                    <p className="col-sm text-center mt-3">
                        COPYRIGHT&copy;{new Date().getFullYear()} PRETTYFULL COLLECTIONS Inc |
                        <a href="https://ejclayson.github.io/my-portfolio/" target="_blank">
                            Erick "EJ" John Layson
                        </a>
                        | All rights reserved

                    </p>
                </div>
            </div>



        </div>

    );
}

export default Footer;
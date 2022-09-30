import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import "./Banner.css";

export default function Banner() {
    return (
        <>
            <Carousel style={{ width: '100%' }}>
                <Carousel.Item>
                    <img
                        className="d-block responsive"
                        src="/images/rl.png"

                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block responsive"
                        src="/images/li.png"

                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block responsive"
                        src="/images/pn.png"

                    />


                </Carousel.Item>


            </Carousel>

            {/* <div className="mt-0 mb-0 p-0">
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
			  <div class="carousel-inner">
			    <div class="carousel-item active">
                            <img
                                src="/images/rl.png"
                                class="responsive"
                            />
			    </div>
			    <div class="carousel-item">
                            <img
                                src="/images/li.png"
                                class="responsive"
                            />
			    </div>
			    <div class="carousel-item">
                            <img
                                src="/images/pn.png"
                                class="responsive"
                            />
			    </div>
			   
			  </div>
			</div> */}

            {/* <Carousel>
               
                    <Carousel.Item>
                        <img
                            src="/images/testing.png"
                            alt="..."
                        />

                        <Carousel.Caption>
                           
                        </Carousel.Caption>
                    </Carousel.Item>

            </Carousel>
            </div> */}




        </>


    );
}

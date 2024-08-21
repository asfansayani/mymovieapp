import Banner from "./components/Banner"
import MediaCard from "./components/MediaCard"
import TrailerCard from "./components/TrailerCard"
import CardPlaceholder from "./components/Placeholder"
import SecHd from './components/SecHd'
import bgimg from './assets/images/trailerbg.webp'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Scrollbar } from 'swiper/modules'
import 'swiper/css/scrollbar'
import 'swiper/css'
import { useState, useEffect } from "react"
const apiUrl = import.meta.env.VITE_API_URL;
const apitoken = import.meta.env.VITE_API_TOKEN;
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const imageBaseUrl2 = 'https://image.tmdb.org/t/p/w355_and_h200_multi_faces';


const Home = () => {
  const placeholderArray = Array.from({ length: 7 }, (index) => index)
  const [trendingData, setTrendingData] = useState([]);
  const [trailerData, setTrailerData] = useState([]);
  const [eventKey, setEventKey] = useState('day');
  const [eventKey2, setEventKey2] = useState('all');

  useEffect(() => {
    fetch(`${apiUrl}trending/all/${eventKey}`, {
      headers: {
        'Authorization': `Bearer ${apitoken}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setTrendingData(data);
      })
  }, [eventKey]);
  useEffect(() => {
    fetch(`${apiUrl}trending/${eventKey2}/day`, {
      headers: {
        'Authorization': `Bearer ${apitoken}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setTrailerData(data);
        console.log(data);
      })
  }, [eventKey2]);
  const [backgroundImage, setBackgroundImage] = useState(bgimg);
  const handleMouseEnter = (imgUrl) => {
    setBackgroundImage(imgUrl);
  };
  return (
    <>
      <Banner />
      <section className="slider-sec slider-sec1 sec-pad">
        <Container>
          <Row>
            <Col>
              <div className="d-flex gap-4 flex-wrap align-items-center">
                <SecHd sechd="Trending" />
                <Tabs id="uncontrolled-tab-example"  activeKey={eventKey} onSelect={(key) => setEventKey(key)}>
                  <Tab eventKey="day" title="Today" className="fade">
                    <Container>
                      <Swiper spaceBetween={10} scrollbar={{
                        hide: false,
                        draggable: true
                      }}
                        breakpoints={{
                          340: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1200: {
                            slidesPerView: 7,
                          },
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper">
                        {trendingData.results && trendingData.results.length > 0 ? (
                          trendingData.results.map((data) => (
                            <SwiperSlide key={data.id}>
                              <MediaCard
                                img={`${imageBaseUrl}${data.poster_path}`}
                                name={data.title || data.name}
                                date={data.release_date || data.first_air_date}
                                percent={Math.round(data.vote_average * 10)}
                                link={data.id}
                                media={data.media_type}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          placeholderArray.map((index) => (
                            <SwiperSlide key={index}>
                              <CardPlaceholder/>
                            </SwiperSlide>
                          ))
                        )}
                      </Swiper>
                    </Container>
                  </Tab>
                  <Tab eventKey="week" title="Week">
                    <Container>
                      <Swiper spaceBetween={20} scrollbar={{
                        hide: false,
                        draggable: true
                      }}
                        breakpoints={{
                          340: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1200: {
                            slidesPerView: 7,
                          },
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper">
                        {trendingData.results && trendingData.results.length > 0 ? (
                          trendingData.results.map((data) => (
                            <SwiperSlide key={data.id}>
                              <MediaCard
                                img={`${imageBaseUrl}${data.poster_path}`}
                                name={data.title || data.name}
                                date={data.release_date || data.first_air_date}
                                percent={Math.round(data.vote_average * 10)}
                                media={data.media_type}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          placeholderArray.map((index) => (
                            <SwiperSlide key={index}>
                              <CardPlaceholder/>
                            </SwiperSlide>
                          ))
                        )}
                      </Swiper>
                    </Container>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="slidersec2 text-white">
        <Container className="sec-pad pt-4 pb-0 px-4" style={{backgroundImage: `url(${backgroundImage})`}}>
          <Row>
            <Col>
            <div className="d-flex gap-4 flex-wrap align-items-center">
                <SecHd sechd="Latest Trailers" />
                <Tabs id="uncontrolled-tab-example"  activeKey={eventKey2} onSelect={(key) => setEventKey2(key)}>
                  <Tab eventKey="all" title="All" className="fade">
                    <Container>
                      <Swiper spaceBetween={10} scrollbar={{
                        hide: false,
                        draggable: true
                      }}
                        breakpoints={{
                          340: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1200: {
                            slidesPerView: 4,
                          },
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper">
                        {trailerData.results && trailerData.results.length > 0 ? (
                          trailerData.results.map((data) => (
                            <SwiperSlide key={data.id}>
                              <TrailerCard
                                img={`${imageBaseUrl2}${data.poster_path}`}
                                name={data.title || data.name}
                                date={data.release_date || data.first_air_date}
                                percent={Math.round(data.vote_average * 10)}
                                onhover={() => handleMouseEnter(`${imageBaseUrl2}${data.poster_path}`)}
                                id={data.id}
                                media={data.media_type}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          placeholderArray.map((index) => (
                            <SwiperSlide key={index}>
                              <CardPlaceholder/>
                            </SwiperSlide>
                          ))
                        )}
                      </Swiper>
                    </Container>
                  </Tab>
                  <Tab eventKey="tv" title="Tv">
                    <Container>
                      <Swiper spaceBetween={20} scrollbar={{
                        hide: false,
                        draggable: true
                      }}
                        breakpoints={{
                          340: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1200: {
                            slidesPerView: 4,
                          },
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper">
                        {trailerData.results && trailerData.results.length > 0 ? (
                          trailerData.results.map((data) => (
                            <SwiperSlide key={data.id}>
                              <TrailerCard
                                img={`${imageBaseUrl2}${data.poster_path}`}
                                name={data.title || data.name}
                                date={data.release_date || data.first_air_date}
                                percent={Math.round(data.vote_average * 10)}
                                onhover={() => handleMouseEnter(`${imageBaseUrl2}${data.poster_path}`)}
                                id={data.id}
                                link={data.id}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          placeholderArray.map((index) => (
                            <SwiperSlide key={index}>
                              <CardPlaceholder/>
                            </SwiperSlide>
                          ))
                        )}
                      </Swiper>
                    </Container>
                  </Tab>
                  <Tab eventKey="movie" title="Movies">
                    <Container>
                      <Swiper spaceBetween={20} scrollbar={{
                        hide: false,
                        draggable: true
                      }}
                        breakpoints={{
                          340: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1200: {
                            slidesPerView: 4,
                          },
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper">
                        {trailerData.results && trailerData.results.length > 0 ? (
                          trailerData.results.map((data) => (
                            <SwiperSlide key={data.id}>
                              <TrailerCard
                                img={`${imageBaseUrl2}${data.poster_path}`}
                                name={data.title || data.name}
                                date={data.release_date || data.first_air_date}
                                percent={Math.round(data.vote_average * 10)}
                                onhover={() => handleMouseEnter(`${imageBaseUrl2}${data.poster_path}`)}
                                id={data.id}
                                link={data.id}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          placeholderArray.map((index) => (
                            <SwiperSlide key={index}>
                              <CardPlaceholder/>
                            </SwiperSlide>
                          ))
                        )}
                      </Swiper>
                    </Container>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="slider-sec slider-sec2 sec-pad">
        <Container>
          <Row>
            <Col>
              <div className="d-flex gap-4 flex-wrap align-items-center">
                <SecHd sechd="What's Popular" />
                <Tabs id="uncontrolled-tab-example"  activeKey={eventKey} onSelect={(key) => setEventKey(key)}>
                  <Tab eventKey="day" title="Today" className="fade">
                    <Container>
                      <Swiper spaceBetween={10} scrollbar={{
                        hide: false,
                        draggable: true
                      }}
                        breakpoints={{
                          340: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1200: {
                            slidesPerView: 7,
                          },
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper">
                        {trendingData.results && trendingData.results.length > 0 ? (
                          trendingData.results.map((data) => (
                            <SwiperSlide key={data.id}>
                              <MediaCard
                                img={`${imageBaseUrl}${data.poster_path}`}
                                name={data.title || data.name}
                                date={data.release_date || data.first_air_date}
                                percent={Math.round(data.vote_average * 10)}
                                link={data.id}
                                media={data.media_type}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          placeholderArray.map((index) => (
                            <SwiperSlide key={index}>
                              <CardPlaceholder/>
                            </SwiperSlide>
                          ))
                        )}
                      </Swiper>
                    </Container>
                  </Tab>
                  <Tab eventKey="week" title="Week">
                    <Container>
                      <Swiper spaceBetween={20} scrollbar={{
                        hide: false,
                        draggable: true
                      }}
                        breakpoints={{
                          340: {
                            slidesPerView: 2,
                          },
                          768: {
                            slidesPerView: 4,
                          },
                          1200: {
                            slidesPerView: 7,
                          },
                        }}
                        modules={[Scrollbar]}
                        className="mySwiper">
                        {trendingData.results && trendingData.results.length > 0 ? (
                          trendingData.results.map((data) => (
                            <SwiperSlide key={data.id}>
                              <MediaCard
                                img={`${imageBaseUrl}${data.poster_path}`}
                                name={data.title || data.name}
                                date={data.release_date || data.first_air_date}
                                percent={Math.round(data.vote_average * 10)}
                                link={data.id}
                                media={data.media_type}
                              />
                            </SwiperSlide>
                          ))
                        ) : (
                          placeholderArray.map((index) => (
                            <SwiperSlide key={index}>
                              <CardPlaceholder/>
                            </SwiperSlide>
                          ))
                        )}
                      </Swiper>
                    </Container>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;